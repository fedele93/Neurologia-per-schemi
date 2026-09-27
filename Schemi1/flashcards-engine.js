/*
 * NeuroCards – motore condiviso per le pagine flashcard.
 *
 * Una sola implementazione usata da tutte le pagine (III anno, IV anno,
 * completo, canovacci). Ogni pagina fornisce solo i dati delle carte e una
 * piccola configurazione:
 *
 *     NeuroCards.init({
 *         storageKey: 'neuroCards:4anno',        // chiave localStorage (distinta per pagina)
 *         legacyKeys: ['neuroCards4AnnoProgress'], // vecchie chiavi da migrare
 *         exportPrefix: 'neurocards-4anno',        // nome del file di backup
 *         cards: flashcardsData                    // le carte definite nell'HTML
 *     });
 *
 * Principi:
 *  1. Il CONTENUTO delle carte vive nell'HTML. In localStorage vengono
 *     salvati solo il progresso, le modifiche puntuali (per id) e le carte
 *     aggiunte dall'utente. Così una correzione nel repository arriva a tutti.
 *  2. Ogni carta ha una vera data di scadenza (`due`). All'apertura si studia
 *     la coda "di oggi": carte scadute + un numero limitato di carte nuove.
 *  3. La sessione (ordine della coda, posizione, statistiche) viene salvata
 *     e ripresa se si riapre la pagina lo stesso giorno.
 *  4. Algoritmo SM-2 classico (1 giorno, 6 giorni, poi × ease) con ease
 *     limitato tra 1.3 e 3.0 e due ritocchi in stile Anki: prima risposta
 *     "Facile" = 4 giorni, bonus ×1.3 per "Facile" nelle revisioni
 *     successive, penalità di ease -0.2 per "Difficile".
 */
(function (global) {
    'use strict';

    const SCHEMA_VERSION = 2;

    const DEFAULTS = {
        newPerDay: 20,       // carte nuove introdotte al giorno
        learnGap: 5,         // dopo quante carte ricompare una carta "Difficile" nella stessa sessione
        maxInterval: 365,    // giorni
        easeStart: 2.5,
        easeMin: 1.3,
        easeMax: 3.0,
        advanceDelay: 800    // ms prima di passare alla carta successiva
    };

    // ------------------------------------------------------------------
    // Date (giorni locali in formato YYYY-MM-DD)
    // ------------------------------------------------------------------
    function pad2(n) { return n < 10 ? '0' + n : String(n); }

    function toDateStr(d) {
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    function todayStr() { return toDateStr(new Date()); }

    function parseDateStr(s) {
        const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ''));
        if (!m) return null;
        return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }

    function addDays(dateStr, n) {
        const d = parseDateStr(dateStr) || new Date();
        d.setDate(d.getDate() + n);
        return toDateStr(d);
    }

    function daysBetween(fromStr, toStr) {
        const a = parseDateStr(fromStr), b = parseDateStr(toStr);
        if (!a || !b) return 0;
        return Math.round((b - a) / 86400000);
    }

    function isoToDateStr(iso) {
        if (!iso) return null;
        const d = new Date(iso);
        return isNaN(d.getTime()) ? null : toDateStr(d);
    }

    function formatDateIt(dateStr) {
        const d = parseDateStr(dateStr);
        if (!d) return '';
        return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    }

    // ------------------------------------------------------------------
    // Scheduler SM-2 (funzioni pure, senza stato)
    // ------------------------------------------------------------------
    function newHistory(opts) {
        return {
            reps: 0,          // ripetizioni corrette consecutive (si azzera con "Difficile")
            lapses: 0,        // quante volte è stata segnata "Difficile"
            interval: 0,      // giorni
            ease: opts.easeStart,
            due: null,        // YYYY-MM-DD
            lastStudied: null,   // ISO completo
            firstStudied: null,  // YYYY-MM-DD
            lastRating: null,    // 'easy' | 'medium' | 'hard'
            studied: 0,       // totale revisioni
            correct: 0        // revisioni "Facile"
        };
    }

    function clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }

    /**
     * Calcola il nuovo stato di una carta dopo una valutazione.
     * Restituisce un NUOVO oggetto, non modifica quello passato.
     */
    function schedule(history, rating, today, opts) {
        const o = Object.assign({}, DEFAULTS, opts || {});
        const h = Object.assign(newHistory(o), history || {});
        today = today || todayStr();

        h.studied += 1;
        h.lastRating = rating;
        h.lastStudied = new Date().toISOString();
        if (!h.firstStudied) h.firstStudied = today;

        if (rating === 'hard') {
            // Fallimento: si riparte dai passi iniziali, domani.
            h.lapses += 1;
            h.reps = 0;
            h.interval = 1;
            h.ease = clamp(h.ease - 0.2, o.easeMin, o.easeMax);
        } else {
            const isEasy = rating === 'easy';
            if (isEasy) h.correct += 1;
            h.reps += 1;
            // SM-2: q=5 -> ease +0.10 ; q=3 -> ease -0.14
            h.ease = clamp(h.ease + (isEasy ? 0.10 : -0.14), o.easeMin, o.easeMax);

            let next;
            if (h.reps === 1) {
                next = isEasy ? 4 : 1;
            } else if (h.reps === 2) {
                next = isEasy ? Math.max(6, Math.round(h.interval * h.ease)) : 6;
            } else {
                next = Math.round(h.interval * h.ease * (isEasy ? 1.3 : 1));
            }
            h.interval = clamp(next, 1, o.maxInterval);
        }
        h.due = addDays(today, h.interval);
        return h;
    }

    /** Intervallo (in giorni) che una valutazione produrrebbe, senza salvarla. */
    function previewInterval(history, rating, opts) {
        return schedule(history, rating, todayStr(), opts).interval;
    }

    function formatInterval(days) {
        if (days <= 0) return 'oggi';
        if (days === 1) return 'domani';
        if (days < 14) return days + ' g';
        if (days < 60) return Math.round(days / 7) + ' sett';
        if (days < 365) return Math.round(days / 30) + ' mesi';
        return '1 anno';
    }

    // ------------------------------------------------------------------
    // Utilità testo
    // ------------------------------------------------------------------
    function escapeHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    /** Testo -> HTML: escape + **grassetto**. Gli "a capo" li gestisce il CSS (pre-line). */
    function formatText(s) {
        return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }

    // ------------------------------------------------------------------
    // Archivio (localStorage) e migrazione dal vecchio formato
    // ------------------------------------------------------------------
    function emptyStore() {
        return {
            version: SCHEMA_VERSION,
            history: {},          // id -> stato scheduler
            overrides: {},        // id -> {category, question, answer} (modifiche a carte dell'HTML)
            userCards: [],        // carte aggiunte dall'utente
            selectedCategories: null, // null = tutte
            session: null,        // {date, mode, queue:[id], index, stats}
            days: {},             // YYYY-MM-DD -> {reviews, correct}
            migratedFrom: [],
            migrationNotified: false,
            savedDate: null
        };
    }

    function migrateLegacy(raw, baseCards, opts) {
        const out = emptyStore();
        if (!raw || typeof raw !== 'object') return out;

        const byId = new Map(baseCards.map(c => [String(c.id), c]));
        const legacyCards = Array.isArray(raw.flashcardsData) ? raw.flashcardsData : null;

        // La vecchia chiave "neuroCardsProgress" era condivisa da due pagine
        // con id sovrapposti: capiamo se il salvataggio appartiene a QUESTO
        // mazzo confrontando i testi delle domande.
        if (legacyCards) {
            let compared = 0, matches = 0;
            legacyCards.forEach(lc => {
                const b = byId.get(String(lc.id));
                if (b) { compared++; if (norm(b.question) === norm(lc.question)) matches++; }
            });
            if (compared > 0 && matches / compared < 0.5) return out; // era dell'altro mazzo
        }

        const today = todayStr();
        const hist = raw.studyHistory || {};
        const legacyIds = new Set(legacyCards ? legacyCards.map(c => String(c.id)) : []);
        Object.keys(hist).forEach(id => {
            if (!byId.has(String(id)) && !legacyIds.has(String(id))) return;
            const old = hist[id] || {};
            const h = newHistory(opts);
            h.studied = old.studied || 0;
            h.correct = old.correct || 0;
            h.lastRating = old.difficulty || null;
            h.reps = old.difficulty === 'hard' ? 0 : Math.max(0, old.studied || 0);
            h.lapses = old.difficulty === 'hard' ? 1 : 0;
            h.ease = clamp(Number(old.easeFactor) || opts.easeStart, opts.easeMin, opts.easeMax);
            h.interval = clamp(Math.round(Number(old.interval) || 1), 1, opts.maxInterval);
            h.lastStudied = old.lastStudied || null;
            const last = isoToDateStr(old.lastStudied);
            h.firstStudied = last || today;
            h.due = last ? addDays(last, h.interval) : today;
            out.history[String(id)] = h;
        });

        if (legacyCards) {
            legacyCards.forEach(lc => {
                const id = String(lc.id);
                const b = byId.get(id);
                if (b) {
                    if (norm(b.question) !== norm(lc.question) ||
                        norm(b.answer) !== norm(lc.answer) ||
                        norm(b.category) !== norm(lc.category)) {
                        out.overrides[id] = { category: lc.category, question: lc.question, answer: lc.answer };
                    }
                } else if (lc.question && lc.answer) {
                    out.userCards.push({ id: 'u' + id, category: lc.category || 'Personali', question: lc.question, answer: lc.answer });
                    if (out.history[id]) { out.history['u' + id] = out.history[id]; delete out.history[id]; }
                }
            });
        }

        if (Array.isArray(raw.selectedCategories) && raw.selectedCategories.length) {
            const allCats = new Set(baseCards.map(c => c.category));
            const sel = raw.selectedCategories.filter(c => allCats.has(c));
            if (sel.length && sel.length < allCats.size) out.selectedCategories = sel;
        }
        return out;
    }

    // ------------------------------------------------------------------
    // Motore
    // ------------------------------------------------------------------
    function init(config) {
        const opts = Object.assign({}, DEFAULTS, config.options || {});
        const baseCards = (config.cards || []).map(c => Object.assign({}, c, { id: String(c.id) }));
        const storageKey = config.storageKey;
        const legacyKeys = config.legacyKeys || [];
        const exportPrefix = config.exportPrefix || 'neurocards';

        let store = emptyStore();
        let storageOk = true;
        let cards = [];          // carte effettive (HTML + override + utente)
        let cardById = new Map();
        let isFlipped = false;
        let advancing = false;
        let editingId = null;

        // ---------- persistenza ----------
        function readJSON(key) {
            try {
                const s = localStorage.getItem(key);
                return s ? JSON.parse(s) : null;
            } catch (e) { return null; }
        }

        function save() {
            store.savedDate = new Date().toISOString();
            try {
                localStorage.setItem(storageKey, JSON.stringify(store));
            } catch (e) {
                if (storageOk) {
                    storageOk = false;
                    showToast('Attenzione: impossibile salvare il progresso su questo dispositivo', 'error');
                }
            }
        }

        function loadStore() {
            const saved = readJSON(storageKey);
            if (saved && saved.version === SCHEMA_VERSION) {
                store = Object.assign(emptyStore(), saved);
                return;
            }
            // Prima apertura con il nuovo formato: migra il vecchio salvataggio se c'è.
            store = emptyStore();
            for (const key of legacyKeys) {
                const raw = readJSON(key);
                if (!raw) continue;
                const migrated = migrateLegacy(raw, baseCards, opts);
                if (Object.keys(migrated.history).length || migrated.userCards.length || Object.keys(migrated.overrides).length) {
                    store = migrated;
                    store.migratedFrom = [key];
                    break;
                }
            }
            save();
        }

        // ---------- carte ----------
        function rebuildCards() {
            cards = baseCards.map(c => Object.assign({}, c, store.overrides[c.id] || {}, { id: c.id }));
            store.userCards.forEach(u => cards.push(Object.assign({}, u, { id: String(u.id), user: true })));
            cardById = new Map(cards.map(c => [c.id, c]));
        }

        function categories() {
            return [...new Set(cards.map(c => c.category))];
        }

        function selectedSet() {
            return store.selectedCategories ? new Set(store.selectedCategories) : null;
        }

        function inScope(card) {
            const sel = selectedSet();
            return !sel || sel.has(card.category);
        }

        function scopedCards() { return cards.filter(inScope); }

        function historyOf(id) { return store.history[id] || null; }

        // ---------- code ----------
        function newIntroducedToday(today) {
            let n = 0;
            Object.keys(store.history).forEach(id => { if (store.history[id].firstStudied === today) n++; });
            return n;
        }

        function dueCards(today) {
            return scopedCards()
                .filter(c => { const h = historyOf(c.id); return h && h.due && h.due <= today; })
                .sort((a, b) => (historyOf(a.id).due < historyOf(b.id).due ? -1 : 1));
        }

        function newCards() {
            return scopedCards().filter(c => !historyOf(c.id));
        }

        function newAllowance(today) {
            return Math.max(0, opts.newPerDay - newIntroducedToday(today));
        }

        function buildQueue(mode, extraNew) {
            const today = todayStr();
            let ids;
            if (mode === 'all') {
                ids = scopedCards().map(c => c.id);
            } else if (mode === 'difficult') {
                ids = scopedCards().filter(c => {
                    const h = historyOf(c.id);
                    return h && (h.lapses > 0 || h.lastRating === 'hard');
                }).map(c => c.id);
            } else {
                const allowance = extraNew != null ? extraNew : newAllowance(today);
                ids = dueCards(today).map(c => c.id)
                    .concat(newCards().slice(0, allowance).map(c => c.id));
            }
            return {
                date: today,
                mode: mode || 'due',
                queue: ids,
                index: 0,
                stats: { reviews: 0, correct: 0, easy: 0, medium: 0, hard: 0, streak: 0, bestStreak: 0 }
            };
        }

        function startSession(mode, extraNew) {
            store.session = buildQueue(mode, extraNew);
            save();
            refresh();
        }

        function ensureSession() {
            const s = store.session;
            const today = todayStr();
            if (s && s.date === today && Array.isArray(s.queue)) {
                // Sessione di oggi: scarta gli id di carte non più esistenti.
                s.queue = s.queue.filter(id => cardById.has(id));
                if (s.index > s.queue.length) s.index = s.queue.length;
                if (s.index < s.queue.length) {
                    showToast('Sessione ripresa: carta ' + (s.index + 1) + ' di ' + s.queue.length, 'info');
                    return;
                }
                if (s.mode !== 'due') return; // era finita: mostra il riepilogo
            }
            store.session = buildQueue('due');
            save();
        }

        // ---------- interfaccia ----------
        function $(id) { return document.getElementById(id); }

        function showToast(message, type) {
            const toast = $('toast');
            if (!toast) return;
            toast.textContent = message;
            toast.className = 'toast ' + (type || 'info') + ' show';
            clearTimeout(toast._t);
            toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
        }

        function modeLabel(mode) {
            return mode === 'all' ? 'Tutte le carte' : mode === 'difficult' ? 'Solo difficili' : 'Ripasso di oggi';
        }

        function nextDueInfo(today) {
            let best = null, count = 0;
            scopedCards().forEach(c => {
                const h = historyOf(c.id);
                if (!h || !h.due || h.due <= today) return;
                if (!best || h.due < best) { best = h.due; count = 1; }
                else if (h.due === best) count++;
            });
            return best ? { date: best, days: daysBetween(today, best), count: count } : null;
        }

        function updateStatus() {
            const el = $('studyStatus');
            if (!el) return;
            const today = todayStr();
            const s = store.session;
            const due = dueCards(today).length;
            const nuove = Math.min(newCards().length, newAllowance(today));
            const learned = scopedCards().filter(c => historyOf(c.id)).length;
            const total = scopedCards().length;
            const sel = selectedSet();
            let line1 = '📅 Oggi: <b>' + due + '</b> in scadenza · <b>' + nuove + '</b> nuove disponibili · ' +
                learned + '/' + total + ' carte già viste';
            if (sel) line1 += ' · filtro: ' + sel.size + ' argomenti';
            let line2 = '';
            if (s && s.queue.length) {
                line2 = modeLabel(s.mode) + ': ' + Math.min(s.index + 1, s.queue.length) + ' di ' + s.queue.length;
                const rest = s.queue.length - s.index;
                if (rest > 0) line2 += ' · ' + rest + ' rimaste';
            } else if (s) {
                line2 = modeLabel(s.mode) + ': nessuna carta in coda';
            }
            el.innerHTML = '<div>' + line1 + '</div>' + (line2 ? '<div class="study-status-session">' + line2 + '</div>' : '');
        }

        function updateStats() {
            const today = todayStr();
            const d = store.days[today] || { reviews: 0, correct: 0 };
            const s = store.session;
            const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
            set('cardsStudied', d.reviews);
            set('correctAnswers', d.correct);
            set('streak', s ? s.stats.streak : 0);
            const total = cards.length;
            const learned = cards.filter(c => historyOf(c.id)).length;
            set('totalProgress', total ? Math.round(learned / total * 100) + '%' : '0%');
        }

        function updateProgress() {
            const bar = $('progressBar');
            const s = store.session;
            if (bar) bar.style.width = (s && s.queue.length ? (s.index / s.queue.length) * 100 : 0) + '%';
            const s1 = $('currentCard'), s2 = $('totalCards');
            if (s1) s1.textContent = s ? Math.min(s.index + 1, s.queue.length) : 0;
            if (s2) s2.textContent = s ? s.queue.length : 0;
        }

        function showCurrentCard() {
            const container = $('flashcardContainer');
            const done = $('sessionComplete');
            const empty = $('emptyState');
            const s = store.session;
            if (empty) empty.style.display = 'none';

            if (cards.length === 0) {
                container.style.display = 'none';
                if (done) done.style.display = 'none';
                if (empty) empty.style.display = 'block';
                return;
            }
            if (!s || s.index >= s.queue.length) {
                showSessionComplete();
                return;
            }
            if (done) done.style.display = 'none';
            container.style.display = 'block';

            const card = cardById.get(s.queue[s.index]);
            const h = historyOf(card.id);
            const pv = r => formatInterval(previewInterval(h, r, opts));
            const info = h
                ? 'Vista ' + h.studied + (h.studied === 1 ? ' volta' : ' volte') + ' · intervallo ' + formatInterval(h.interval) + ' · scadenza ' + formatDateIt(h.due)
                : 'Carta nuova';

            container.innerHTML =
                '<div class="flashcard" id="currentFlashcard" onclick="flipCard(event)">' +
                    '<button class="edit-btn" onclick="openEditModal(event)">✏️ Modifica</button>' +
                    '<div class="category-badge">' + escapeHtml(card.category) + '</div>' +
                    '<div class="flashcard-front">' +
                        '<h2 style="color: #a5b4fc; margin-bottom: 15px;">❓ Domanda</h2>' +
                        '<p>' + formatText(card.question) + '</p>' +
                        '<div class="card-meta">' + escapeHtml(info) + '</div>' +
                    '</div>' +
                    '<div class="flashcard-back">' +
                        '<h2 style="color: #a5b4fc; margin-bottom: 15px;">✅ Risposta</h2>' +
                        '<p>' + formatText(card.answer) + '</p>' +
                        '<div class="difficulty-buttons">' +
                            '<button class="difficulty-btn easy" onclick="markDifficulty(\'easy\', event)">😊 Facile<small>' + pv('easy') + '</small></button>' +
                            '<button class="difficulty-btn medium" onclick="markDifficulty(\'medium\', event)">🤔 Medio<small>' + pv('medium') + '</small></button>' +
                            '<button class="difficulty-btn hard" onclick="markDifficulty(\'hard\', event)">😰 Difficile<small>ripeti · ' + pv('hard') + '</small></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            isFlipped = false;
        }

        function showSessionComplete() {
            const container = $('flashcardContainer');
            const done = $('sessionComplete');
            container.style.display = 'none';
            if (!done) return;
            done.style.display = 'block';

            const s = store.session;
            const today = todayStr();
            const st = s ? s.stats : { reviews: 0, correct: 0, easy: 0, medium: 0, hard: 0, bestStreak: 0 };
            const accuracy = st.reviews ? Math.round(((st.easy + st.medium) / st.reviews) * 100) : 0;
            const remainingNew = newCards().length;
            const allowance = newAllowance(today);
            const next = nextDueInfo(today);
            const dueNow = dueCards(today).length;

            let title, msg;
            if (st.reviews === 0 && s && s.mode === 'due') {
                title = 'Nessuna carta in scadenza oggi';
                msg = '';
            } else {
                title = 'Sessione completata!';
                msg = '<div style="margin-bottom: 16px;"><strong>Carte ripassate:</strong> ' + st.reviews +
                    ' · <strong>Accuratezza:</strong> ' + accuracy + '% · <strong>Serie massima:</strong> ' + st.bestStreak + '<br>' +
                    '<span style="color: #10b981;">Facili: ' + st.easy + '</span> | ' +
                    '<span style="color: #f59e0b;">Medie: ' + st.medium + '</span> | ' +
                    '<span style="color: #ef4444;">Difficili: ' + st.hard + '</span></div>';
            }
            if (dueNow > 0) {
                msg += '<div>Hai ancora <strong>' + dueNow + '</strong> carte in scadenza oggi.</div>';
            } else if (next) {
                msg += '<div>Prossima revisione: <strong>' + (next.days === 1 ? 'domani' : 'tra ' + next.days + ' giorni') +
                    '</strong> (' + formatDateIt(next.date) + ', ' + next.count + (next.count === 1 ? ' carta' : ' carte') + ').</div>';
            } else if (remainingNew === 0) {
                msg += '<div>Hai visto tutte le carte di questo mazzo. Torna quando ricompariranno in scadenza.</div>';
            }
            if (remainingNew > 0) {
                msg += '<div>Carte mai viste: <strong>' + remainingNew + '</strong>' +
                    (allowance === 0 ? ' (limite giornaliero di ' + opts.newPerDay + ' nuove raggiunto)' : '') + '.</div>';
            }

            let buttons = '';
            if (dueNow > 0) buttons += '<button class="control-btn" onclick="studyDue()">📅 Continua il ripasso di oggi</button>';
            if (remainingNew > 0) buttons += '<button class="control-btn" onclick="studyMoreNew()">➕ Studia ' + Math.min(opts.newPerDay, remainingNew) + ' carte nuove</button>';
            buttons += '<button class="control-btn" onclick="studyAll()">🔁 Studia comunque tutte le carte</button>';
            if (s && s.mode !== 'due' && dueNow === 0) buttons += '<button class="control-btn" onclick="studyDue()">📅 Torna al ripasso di oggi</button>';

            done.innerHTML =
                '<div style="font-size: 4rem; margin-bottom: 20px;">' + (st.reviews === 0 ? '✅' : '🎉') + '</div>' +
                '<h2 style="margin-bottom: 20px;">' + title + '</h2>' +
                '<div id="sessionSummary" style="font-size: 1.1rem; margin-bottom: 30px;">' + msg + '</div>' +
                '<div class="session-actions">' + buttons + '</div>';
        }

        function refresh() {
            updateStats();
            updateProgress();
            updateStatus();
            showCurrentCard();
        }

        // ---------- azioni ----------
        function flipCard(event) {
            const t = event && event.target;
            if (t && t.closest && (t.closest('.edit-btn') || t.closest('.difficulty-buttons'))) return;
            const el = $('currentFlashcard');
            if (!el) return;
            el.classList.toggle('flipped');
            isFlipped = el.classList.contains('flipped');
        }

        function markDifficulty(rating, event) {
            if (event && event.stopPropagation) event.stopPropagation();
            const s = store.session;
            if (!s || s.index >= s.queue.length || advancing) return;
            advancing = true;

            const id = s.queue[s.index];
            const today = todayStr();
            const h = schedule(historyOf(id), rating, today, opts);
            store.history[id] = h;

            // statistiche di sessione e del giorno
            s.stats.reviews++;
            s.stats[rating]++;
            if (rating === 'easy') { s.stats.streak++; }
            else if (rating === 'medium') { s.stats.streak = Math.floor(s.stats.streak / 2); }
            else { s.stats.streak = 0; }
            s.stats.bestStreak = Math.max(s.stats.bestStreak || 0, s.stats.streak);
            const d = store.days[today] || (store.days[today] = { reviews: 0, correct: 0 });
            d.reviews++;
            if (rating !== 'hard') d.correct++;

            if (rating === 'hard') {
                // Ricompare nella stessa sessione dopo qualche carta (senza duplicati permanenti).
                const pos = Math.min(s.queue.length, s.index + 1 + opts.learnGap);
                s.queue.splice(pos, 0, id);
                showToast('💪 La rivedrai tra poco in questa sessione, poi domani', 'info');
            } else {
                showToast((rating === 'easy' ? '🎉 Ottimo! ' : '👍 Bene! ') + 'Prossima revisione ' +
                    (h.interval === 1 ? 'domani' : 'tra ' + h.interval + ' giorni') + ' (' + formatDateIt(h.due) + ')', 'success');
            }

            s.index++;
            save();
            updateStats();
            setTimeout(() => {
                advancing = false;
                updateProgress();
                updateStatus();
                showCurrentCard();
            }, opts.advanceDelay);
        }

        function shuffleCards() {
            const s = store.session;
            if (!s || s.queue.length - s.index < 2) { showToast('Niente da mescolare', 'info'); return; }
            const rest = s.queue.slice(s.index);
            for (let i = rest.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rest[i], rest[j]] = [rest[j], rest[i]];
            }
            s.queue = s.queue.slice(0, s.index).concat(rest);
            save();
            refresh();
            showToast('Carte rimanenti mescolate', 'success');
        }

        function studyDue() { startSession('due'); }
        function studyAll() { startSession('all'); showToast('Modalità libera: le valutazioni aggiornano comunque le scadenze', 'info'); }
        function studyMoreNew() {
            // Sblocca un altro blocco di carte nuove oltre il limite giornaliero.
            startSession('due', opts.newPerDay);
        }

        function showOnlyDifficult() {
            const sess = buildQueue('difficult');
            if (!sess.queue.length) { showToast('Nessuna carta segnata come difficile', 'info'); return; }
            store.session = sess;
            save();
            refresh();
            showToast(sess.queue.length + ' carte difficili caricate', 'success');
        }

        function resetSession() {
            if (!confirm('Ricominciare la sessione di oggi? Le scadenze delle carte non cambiano.')) return;
            startSession(store.session ? store.session.mode : 'due');
            showToast('Sessione ricominciata', 'success');
        }

        function restartSession() { studyDue(); }

        function resetProgress() {
            if (!confirm('Cancellare TUTTO il progresso di questo mazzo (scadenze, statistiche, carte aggiunte)? Operazione irreversibile.')) return;
            store = emptyStore();
                        rebuildCards();
            renderCategories();
            store.session = buildQueue('due');
            save();
            refresh();
            showToast('Progresso cancellato', 'success');
        }

        // ---------- categorie ----------
        function renderCategories() {
            const list = $('categoryList');
            if (!list) return;
            const cats = categories();
            if (!cats.length) {
                list.innerHTML = '<p style="text-align: center; color: #94a3b8;">Nessun argomento disponibile.</p>';
                return;
            }
            const sel = selectedSet();
            list.innerHTML = cats.map((cat, i) => {
                const n = cards.filter(c => c.category === cat).length;
                const checked = !sel || sel.has(cat) ? ' checked' : '';
                return '<div class="category-item">' +
                    '<input type="checkbox" id="cat-' + i + '" value="' + escapeHtml(cat) + '"' + checked + '>' +
                    '<label for="cat-' + i + '" style="cursor: pointer; flex: 1;">' + escapeHtml(cat) + ' (' + n + ' carte)</label>' +
                    '</div>';
            }).join('');
        }

        function openCategoryModal() { renderCategories(); const m = $('categoryModal'); if (m) m.style.display = 'block'; }
        function closeCategoryModal() { const m = $('categoryModal'); if (m) m.style.display = 'none'; }
        function selectAllCategories() { document.querySelectorAll('#categoryList input[type="checkbox"]').forEach(cb => cb.checked = true); }
        function deselectAllCategories() { document.querySelectorAll('#categoryList input[type="checkbox"]').forEach(cb => cb.checked = false); }

        function applyCategoryFilter() {
            const checked = [...document.querySelectorAll('#categoryList input[type="checkbox"]:checked')].map(cb => cb.value);
            if (!checked.length) { showToast('Seleziona almeno un argomento', 'error'); return; }
            store.selectedCategories = checked.length === categories().length ? null : checked;
            closeCategoryModal();
            startSession('due');
            showToast(scopedCards().length + ' carte negli argomenti scelti', 'success');
        }

        // ---------- modifica / aggiunta ----------
        function currentCard() {
            const s = store.session;
            return s && s.index < s.queue.length ? cardById.get(s.queue[s.index]) : null;
        }

        function openEditModal(event) {
            if (event && event.stopPropagation) event.stopPropagation();
            const card = currentCard();
            if (!card) return;
            editingId = card.id;
            $('editCategory').value = card.category;
            $('editQuestion').value = card.question;
            $('editAnswer').value = card.answer;
            $('editModal').style.display = 'block';
        }

        function closeEditModal() { $('editModal').style.display = 'none'; editingId = null; }

        function saveCardEdits() {
            if (editingId == null) return;
            const category = $('editCategory').value.trim();
            const question = $('editQuestion').value.trim();
            const answer = $('editAnswer').value.trim();
            if (!category || !question || !answer) { showToast('Tutti i campi sono obbligatori', 'error'); return; }

            const user = store.userCards.find(u => String(u.id) === editingId);
            if (user) {
                Object.assign(user, { category, question, answer });
            } else {
                const base = baseCards.find(c => c.id === editingId);
                if (base && base.category === category && base.question === question && base.answer === answer) {
                    delete store.overrides[editingId]; // tornata uguale all'originale
                } else {
                    store.overrides[editingId] = { category, question, answer };
                }
            }
            rebuildCards();
            save();
            closeEditModal();
            refresh();
            showToast('Carta modificata (salvata solo su questo dispositivo)', 'success');
        }

        function openAddCardModal() {
            $('addCardCategory').value = '';
            $('addCardQuestion').value = '';
            $('addCardAnswer').value = '';
            $('addCardModal').style.display = 'block';
        }

        function closeAddCardModal() { $('addCardModal').style.display = 'none'; }

        function addNewCard() {
            const category = $('addCardCategory').value.trim();
            const question = $('addCardQuestion').value.trim();
            const answer = $('addCardAnswer').value.trim();
            if (!category || !question || !answer) { showToast('Tutti i campi sono obbligatori', 'error'); return; }
            const card = { id: 'u' + Date.now(), category, question, answer };
            store.userCards.push(card);
            rebuildCards();
            if (store.selectedCategories && !store.selectedCategories.includes(category)) {
                store.selectedCategories.push(category);
            }
            if (store.session) store.session.queue.push(card.id); // la studi subito, in coda
            save();
            closeAddCardModal();
            refresh();
            showToast('Carta aggiunta', 'success');
        }

        // ---------- backup ----------
        function saveProgress() {
            const data = Object.assign({}, store, { deck: storageKey, exportedAt: new Date().toISOString() });
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = exportPrefix + '-backup-' + todayStr() + '.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 100);
            showToast('Backup esportato', 'success');
        }

        function loadProgress() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json,.json';
            input.onchange = function (e) {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function (ev) {
                    try {
                        const data = JSON.parse(ev.target.result);
                        let incoming;
                        if (data && data.version === SCHEMA_VERSION && data.history) {
                            if (data.deck && data.deck !== storageKey &&
                                !confirm('Questo backup sembra di un altro mazzo (' + data.deck + '). Importarlo comunque?')) return;
                            incoming = Object.assign(emptyStore(), data);
                            delete incoming.deck; delete incoming.exportedAt;
                        } else if (data && data.studyHistory) {
                            incoming = migrateLegacy(data, baseCards, opts);
                        } else {
                            throw new Error('formato non riconosciuto');
                        }
                        if (!confirm('Importare il backup? Il progresso attuale di questo mazzo verrà sostituito.')) return;
                        incoming.session = null;
                        store = incoming;
                        rebuildCards();
                        renderCategories();
                        store.session = buildQueue('due');
                        save();
                        refresh();
                        showToast('Backup importato', 'success');
                    } catch (err) {
                        showToast('File non valido', 'error');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        // ---------- tastiera / modali ----------
        function anyModalOpen() {
            return ['editModal', 'addCardModal', 'categoryModal'].some(id => { const m = $(id); return m && m.style.display === 'block'; });
        }

        document.addEventListener('keydown', function (event) {
            if (anyModalOpen()) return;
            if (!currentCard()) return;
            const tag = (event.target && event.target.tagName) || '';
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            switch (event.key.toLowerCase()) {
                case ' ': event.preventDefault(); flipCard({ target: $('currentFlashcard') }); break;
                case '1': if (isFlipped) markDifficulty('easy', event); break;
                case '2': if (isFlipped) markDifficulty('medium', event); break;
                case '3': if (isFlipped) markDifficulty('hard', event); break;
                case 'e': event.preventDefault(); openEditModal(event); break;
            }
        });

        window.addEventListener('click', function (event) {
            ['categoryModal', 'editModal', 'addCardModal'].forEach(id => {
                const m = $(id);
                if (m && event.target === m) m.style.display = 'none';
            });
        });

        // ---------- stile per gli elementi introdotti dal motore ----------
        function injectStyles() {
            if ($('neurocards-engine-style')) return;
            const st = document.createElement('style');
            st.id = 'neurocards-engine-style';
            st.textContent =
                '.study-status{text-align:center;margin:10px auto 0;padding:12px 16px;border-radius:12px;' +
                'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);font-size:0.95rem;line-height:1.6;max-width:900px}' +
                '.study-status-session{opacity:0.8;font-size:0.9rem}' +
                '.difficulty-btn small{display:block;font-size:0.72rem;font-weight:normal;opacity:0.85;margin-top:3px}' +
                '.card-meta{margin-top:14px;font-size:0.78rem;opacity:0.6}' +
                '.flashcard .edit-btn,.flashcard .category-badge{z-index:20}' +
                '.session-actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}';
            document.head.appendChild(st);
        }

        // ---------- esposizione delle funzioni usate dall'HTML ----------
        Object.assign(global, {
            flipCard, markDifficulty, shuffleCards, saveProgress, loadProgress, resetSession, restartSession,
            resetProgress, showOnlyDifficult, studyDue, studyAll, studyMoreNew,
            openCategoryModal, closeCategoryModal, selectAllCategories, deselectAllCategories, applyCategoryFilter,
            openEditModal, closeEditModal, saveCardEdits, openAddCardModal, closeAddCardModal, addNewCard
        });

        // ---------- avvio ----------
        function boot() {
            injectStyles();
            loadStore();
            rebuildCards();
            renderCategories();
            ensureSession();
            refresh();
            if (store.migratedFrom && store.migratedFrom.length && !store.migrationNotified) {
                store.migrationNotified = true;
                save();
                setTimeout(() => showToast('Progresso precedente recuperato: le scadenze sono state ricostruite', 'success'), 800);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', boot);
        } else {
            boot();
        }

        return {
            get store() { return store; },
            get cards() { return cards; }
        };
    }

    global.NeuroCards = {
        init,
        schedule,
        previewInterval,
        formatInterval,
        formatText,
        escapeHtml,
        migrateLegacy,
        todayStr,
        addDays,
        daysBetween,
        SCHEMA_VERSION,
        DEFAULTS
    };
})(window);

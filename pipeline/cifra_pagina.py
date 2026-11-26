#!/usr/bin/env python3
"""Cifra una pagina HTML con password, per pubblicarla sul sito senza esporne il contenuto.

Il repository è pubblico: un semplice controllo della password in JavaScript si
aggira leggendo il sorgente. Qui invece la pagina viene cifrata (AES-256-GCM,
chiave derivata dalla password con PBKDF2-SHA256, 600.000 iterazioni) e nel
repository finisce solo il testo cifrato dentro una pagina "lucchetto". Il
browser decifra con la Web Crypto API dopo l'inserimento della password.

Uso (la password viene chiesta a terminale e non viene salvata da nessuna parte):

    pip install cryptography
    python3 pipeline/cifra_pagina.py prontuario.chiaro.html strumenti/prontuario.html

La versione in chiaro NON va messa nel repository (vedi .gitignore: *.chiaro.html).
Per aggiornare il prontuario: modifica la versione in chiaro, rilancia lo script,
fai commit solo di strumenti/prontuario.html.
"""
import base64
import getpass
import hashlib
import html
import os
import sys

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ITERAZIONI = 600_000

PAGINA = """<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>__TITOLO__</title>
<style>
:root{color-scheme:light dark;--bg:light-dark(#fff,#0d0e18);--ink:light-dark(#14110f,#ecebf3);--mute:light-dark(#5d5a66,#a3a2b3);--line:light-dark(#d9d8e2,#2c2e40)}
:root[data-theme=light]{color-scheme:light}:root[data-theme=dark]{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1d2bd8;color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:16px}
form{background:var(--bg);border-radius:16px;padding:28px 24px;width:min(400px,100%);box-shadow:0 10px 40px rgba(0,0,30,.25)}
h1{font:600 30px/1.1 Georgia,serif;margin:0 0 6px;letter-spacing:-.02em}
p{margin:0 0 18px;color:var(--mute);font-size:15px}
label{display:block;font-size:14px;margin-bottom:4px}
input[type=password]{width:100%;font-size:16px;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);min-height:46px}
input[type=password]:focus{outline:3px solid #1d2bd8;outline-offset:1px}
.r{display:flex;align-items:center;gap:8px;margin:14px 0 18px;font-size:15px}
.r input{width:20px;height:20px}
button{width:100%;font:600 16px system-ui,sans-serif;border:0;border-radius:10px;background:#1d2bd8;color:#fff;min-height:48px;cursor:pointer}
button:disabled{opacity:.6}
#err{color:#c81e36;font-size:14px;min-height:1.5em;margin:10px 0 0}
a{color:inherit;font-size:14px}
</style>
</head>
<body>
<form id="f">
<h1>__TITOLO__</h1>
<p>Contenuto riservato. Inserisci la password per aprirlo.</p>
<label for="pw">Password</label>
<input id="pw" type="password" autocomplete="current-password" required autofocus>
<label class="r"><input id="rem" type="checkbox" checked> Ricorda su questo dispositivo</label>
<button id="go">Apri</button>
<div id="err" role="alert"></div>
<a href="../index.html">← Neurologia per schemi</a>
<noscript><p>Serve JavaScript attivo.</p></noscript>
</form>
<script>
{
const P="__PAYLOAD__",IT=__ITER__,K="__CHIAVE__";
const b=Uint8Array.from(atob(P),c=>c.charCodeAt(0));
const salt=b.slice(0,16),iv=b.slice(16,28),ct=b.slice(28);
const sid=btoa(String.fromCharCode(...salt));
const err=t=>{document.getElementById("err").textContent=t};
async function apri(key){
  const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv},key,ct);
  const h=new TextDecoder().decode(pt);
  document.open();document.write(h);document.close();
}
async function daPw(pw){
  const m=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
  return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:IT,hash:"SHA-256"},m,{name:"AES-GCM",length:256},true,["decrypt"]);
}
(async()=>{
  if(!window.crypto||!crypto.subtle){err("Il browser non supporta la decifratura (serve https).");return}
  try{
    const s=JSON.parse(localStorage.getItem(K)||"null");
    if(s&&s.salt===sid){
      const raw=Uint8Array.from(atob(s.k),c=>c.charCodeAt(0));
      await apri(await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["decrypt"]));
    }else if(s){localStorage.removeItem(K)}
  }catch(e){try{localStorage.removeItem(K)}catch(x){}}
})();
document.getElementById("f").addEventListener("submit",async e=>{
  e.preventDefault();
  const go=document.getElementById("go");go.disabled=true;err("");
  try{
    const key=await daPw(document.getElementById("pw").value);
    if(document.getElementById("rem").checked){
      try{
        const raw=new Uint8Array(await crypto.subtle.exportKey("raw",key));
        await crypto.subtle.decrypt({name:"AES-GCM",iv},key,ct);
        localStorage.setItem(K,JSON.stringify({salt:sid,k:btoa(String.fromCharCode(...raw))}));
      }catch(x){}
    }
    await apri(key);
  }catch(x){err("Password errata.");go.disabled=false;document.getElementById("pw").select()}
});
}
</script>
</body>
</html>
"""


def main():
    if len(sys.argv) < 3:
        sys.exit("uso: cifra_pagina.py PAGINA_IN_CHIARO.html USCITA.html [TITOLO] [CHIAVE_LOCALSTORAGE]")
    sorgente, uscita = sys.argv[1], sys.argv[2]
    titolo = sys.argv[3] if len(sys.argv) > 3 else "Prontuario neuro"
    chiave_ls = sys.argv[4] if len(sys.argv) > 4 else "pn-key-v1"

    password = os.environ.get("PAGINA_PASSWORD") or getpass.getpass("Password: ")
    if not os.environ.get("PAGINA_PASSWORD") and getpass.getpass("Ripeti la password: ") != password:
        sys.exit("Le password non coincidono.")
    if len(password) < 8:
        sys.exit("Password troppo corta (minimo 8 caratteri).")

    dati = open(sorgente, "rb").read()
    salt, iv = os.urandom(16), os.urandom(12)
    chiave = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, ITERAZIONI, 32)
    cifrato = AESGCM(chiave).encrypt(iv, dati, None)
    payload = base64.b64encode(salt + iv + cifrato).decode()

    pagina = (PAGINA.replace("__TITOLO__", html.escape(titolo))
              .replace("__PAYLOAD__", payload)
              .replace("__ITER__", str(ITERAZIONI))
              .replace("__CHIAVE__", chiave_ls))
    with open(uscita, "w", encoding="utf-8") as f:
        f.write(pagina)
    print(f"Scritto {uscita} ({len(pagina) // 1024} KB, {len(dati) // 1024} KB in chiaro cifrati).")


if __name__ == "__main__":
    main()

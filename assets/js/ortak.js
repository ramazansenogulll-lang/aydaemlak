/* Ortak yardımcılar, simgeler, üst menü ve alt bilgi */
(function () {
  const A = window.EMLAK_AYAR;

  const I = {
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    konum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    oda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/></svg>',
    m2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h6V3M21 15h-6v6"/></svg>',
    kat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
    ev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    villa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 11 12 4l10 7M4 10v10h16V10M9 20v-5h6v5M17 4v3"/></svg>',
    arsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 20h18M5 20 9 9l4 6 3-4 3 9M8 5h2M15 4v3"/></svg>',
    isyeri: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9h18l-1.5-5h-15zM4 9v11h16V9M9 20v-6h6v6M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3"/></svg>',
    tik: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
    kalkan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    anahtar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/></svg>',
    sohbet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    sol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m15 18-6-6 6-6"/></svg>',
    sag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m9 18 6-6-6-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    arti: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
    liste: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    cikis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    goz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    cop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    yildiz: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
    wp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function guvenliSrc(u) { u = String(u || ""); return /^(https:|data:image\/|blob:|assets\/)/.test(u) ? esc(u) : ""; }
  function para(n) { return n == null || n === "" ? "Fiyat sorunuz" : new Intl.NumberFormat("tr-TR").format(n) + " ₺"; }
  const TIP = { satilik: "Satılık", kiralik: "Kiralık" };
  const KAT = { daire: "Daire", villa: "Müstakil ev / Villa", arsa: "Arsa", tarla: "Tarla", isyeri: "İşyeri" };
  function bosGorsel(k) {
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#f3ece0"/><path d="M0 330 Q200 290 400 320 T800 300 V500 H0Z" fill="#d9c9a8"/><path d="M0 390 Q300 350 800 380 V500 H0Z" fill="#c9b48a"/><text x="400" y="230" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="700" fill="#9a6f22">${k === "tarla" ? "Tarla" : "Fotoğraf yakında"}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  }
  function konumYazi(x) { return [x.mahalle, x.ilce, x.il].filter(Boolean).join(", "); }

  function kart(x) {
    const foto = (x.fotograflar && x.fotograflar[0]) || bosGorsel(x.kategori);
    const ozet = [];
    if (x.oda) ozet.push(`<span>${I.oda}${esc(x.oda)}</span>`);
    if (x.net_m2 || x.brut_m2) ozet.push(`<span>${I.m2}${esc(x.net_m2 || x.brut_m2)} m²</span>`);
    if (x.kat) ozet.push(`<span>${I.kat}${esc(x.kat)}${/^\d+$/.test(x.kat) ? ". kat" : ""}</span>`);
    if (!ozet.length) ozet.push(`<span>${esc(KAT[x.kategori] || "")}</span>`);
    return `<a class="kart" href="ilan.html?id=${encodeURIComponent(x.id)}">
      <div class="kart-foto">${foto ? `<img src="${guvenliSrc(foto)}" alt="${esc(x.baslik)}" loading="lazy">` : ""}
        <span class="rozet ${esc(x.tip)}">${esc(TIP[x.tip] || "")}</span>${x.one_cikan ? `<span class="rozet-one">★ Öne çıkan</span>` : ""}</div>
      <div class="kart-ic">
        <div class="fiyat">${para(x.fiyat)}${x.tip === "kiralik" && x.fiyat ? " <small>/ ay</small>" : ""}</div>
        <h3>${esc(x.baslik)}</h3>
        <div class="konum">${I.konum}${esc(konumYazi(x))}</div>
        <div class="ozet">${ozet.join("")}</div>
      </div></a>`;
  }

  function makaleKart(m) {
    return `<a class="makale-kart" href="${esc(m.slug)}.html"><small>${esc(m.etiket)}</small><h3>${esc(m.baslik)}</h3><p>${esc(m.ozet)}</p><span>Okumaya devam et →</span></a>`;
  }
  function bildir(mesaj, hata) {
    const d = document.createElement("div");
    d.className = "bildirim" + (hata ? " hata" : "");
    d.textContent = mesaj; d.setAttribute("role", "status");
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 3200);
  }

  const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2c27a"/><stop offset="1" stop-color="#9a6f22"/></linearGradient></defs><path d="M30 4a20 20 0 1 0 14 30A17 17 0 1 1 30 4z" fill="url(#lg)"/><path d="M15 27 25 18l10 9v9H15z" fill="url(#lg)"/><rect x="23" y="29" width="4" height="7" fill="#fff"/><rect x="30" y="17" width="3" height="6" fill="url(#lg)"/></svg>`;

  function kabuk() {
    const sayfa = document.body.dataset.sayfa;
    const ust = document.createElement("header");
    ust.className = "ust";
    const link = (h, y, k) => `<a href="${h}"${sayfa === k ? ' class="aktif" aria-current="page"' : ""}>${y}</a>`;
    ust.innerHTML = `<div class="kap">
      <a class="logo" href="index.html">${LOGO}<span>${esc(A.firma)}</span></a>
      <nav class="menu" id="menu" aria-label="Ana menü">
        ${link("index.html", "Ana sayfa", "ana")}
        ${link("ilanlar.html?tip=satilik", "Satılık", "satilik")}
        ${link("ilanlar.html?tip=kiralik", "Kiralık", "kiralik")}
        ${link("makaleler.html", "Makaleler", "makale")}
        ${link("index.html#iletisim", "İletişim", "iletisim")}
        ${link("panel.html", "Ofis girişi", "panel")}
      </nav>
      <button class="menu-ac" aria-label="Menüyü aç" aria-controls="menu" aria-expanded="false">${I.menu}</button>
      <a class="tel" href="tel:${esc(A.telefonLink)}">${I.tel}<span>${esc(A.telefon)}</span></a></div>`;
    document.body.prepend(ust);
    if (Veri.mod === "demo" && !location.pathname.includes("/makale")) {
      const s = document.createElement("div");
      s.className = "demo-serit";
      s.textContent = "Demo modu: ilanlar yalnızca bu tarayıcıda saklanıyor. Gerçek kullanım için config.js'e Supabase bilgilerini girin.";
      document.body.prepend(s);
    }
    const btn = ust.querySelector(".menu-ac"), menu = ust.querySelector("#menu");
    btn.addEventListener("click", () => { const a = menu.classList.toggle("acik"); btn.setAttribute("aria-expanded", a); });

    if (document.body.dataset.altyok !== undefined) return;
    const alt = document.createElement("footer");
    alt.className = "alt-bilgi"; alt.id = "iletisim";
    alt.innerHTML = `<div class="kap">
      <div><b>${esc(A.firma)}</b><p>${esc(A.slogan)}</p><p>${esc(A.adres)}</p>${A.haritaLink ? `<a href="${esc(A.haritaLink)}" target="_blank" rel="noopener">Haritada gör →</a>` : ""}</div>
      <div><b>İlanlar</b><a href="ilanlar.html?tip=satilik">Satılık ilanlar</a><a href="ilanlar.html?tip=kiralik">Kiralık ilanlar</a>
        <a href="ilanlar.html?kategori=tarla">Tarlalar</a><a href="makaleler.html">Makaleler</a></div>
      <div><b>İletişim</b><a href="tel:${esc(A.telefonLink)}">${esc(A.telefon)}</a>${A.telefon2 ? `<a href="tel:${esc(A.telefon2Link)}">${esc(A.telefon2)}</a>` : ""}
        ${A.eposta ? `<a href="mailto:${esc(A.eposta)}">${esc(A.eposta)}</a>` : ""}<span>${esc(A.calismaSaatleri)}</span></div>
      <div class="telif"><span>© ${new Date().getFullYear()} ${esc(A.firma)}</span><a href="panel.html">Ofis girişi</a></div></div>`;
    document.body.appendChild(alt);
    if (A.whatsapp) {
      const w = document.createElement("a");
      w.className = "wp-yuzen"; w.href = "https://wa.me/" + encodeURIComponent(A.whatsapp);
      w.target = "_blank"; w.rel = "noopener"; w.setAttribute("aria-label", "WhatsApp ile yazın");
      w.innerHTML = I.wp; document.body.appendChild(w);
    }
  }

  window.E = { A, I, esc, guvenliSrc, para, TIP, KAT, konumYazi, kart, bildir, kabuk, bosGorsel, makaleKart };
  document.addEventListener("DOMContentLoaded", kabuk);
})();

/* Ziyaretçi sayfaları: ana sayfa, ilan listesi, ilan detayı */
(function () {
  const { I, esc, guvenliSrc, para, TIP, KAT, konumYazi, kart, A } = window.E;
  const $ = s => document.querySelector(s);

  function hataGoster(kutu, e) {
    kutu.innerHTML = `<div class="bos">İlanlar yüklenemedi: ${esc(e.message)}</div>`;
  }

  /* ---------- Ana sayfa ---------- */
  async function anaSayfa() {
    const form = $("#arama");
    form.querySelectorAll(".tip-sec button").forEach(b => b.addEventListener("click", () => {
      form.querySelectorAll(".tip-sec button").forEach(x => x.classList.toggle("aktif", x === b));
      form.tip.value = b.dataset.tip;
    }));
    const kutu = $("#one-cikanlar");
    try {
      let l = await Veri.liste({ one: true, limit: 6 });
      if (l.length < 3) l = await Veri.liste({ limit: 6 });
      kutu.innerHTML = l.length ? l.map(kart).join("") : `<div class="bos">Henüz ilan eklenmedi.</div>`;
      const say = await Veri.liste({});
      const s = k => { const [a, b] = k.includes("-") ? k.split("-") : [null, k]; return say.filter(x => x.kategori === b && (!a || x.tip === a)).length; };
      document.querySelectorAll("[data-say]").forEach(el => { el.textContent = s(el.dataset.say) + " ilan"; });
    } catch (e) { hataGoster(kutu, e); }
  }

  /* ---------- İlan listesi ---------- */
  async function ilanlar() {
    const form = $("#filtre");
    const p = new URLSearchParams(location.search);
    ["tip", "kategori", "oda", "il", "ilce", "min", "max", "q", "sira"].forEach(k => {
      if (p.get(k) && form[k]) form[k].value = p.get(k);
    });
    const bas = $("#baslik"), sayi = $("#sayi"), kutu = $("#sonuc");

    async function yukle() {
      const f = Object.fromEntries(new FormData(form).entries());
      Object.keys(f).forEach(k => { if (!f[k]) delete f[k]; });
      history.replaceState(null, "", "?" + new URLSearchParams(f).toString());
      const parca = [f.tip ? TIP[f.tip] : "", f.kategori ? KAT[f.kategori] : "İlanlar"].filter(Boolean).join(" ");
      bas.textContent = (f.ilce || "Çardak") + " " + parca;
      document.title = bas.textContent + " | " + A.firma;
      kutu.innerHTML = `<div class="bos">Yükleniyor…</div>`;
      try {
        const l = await Veri.liste(f);
        sayi.textContent = l.length + " ilan bulundu";
        kutu.innerHTML = l.length ? l.map(kart).join("") : `<div class="bos">Bu ölçütlere uygun ilan yok. Filtreleri genişletmeyi deneyin.</div>`;
      } catch (e) { hataGoster(kutu, e); }
    }
    let zaman;
    form.addEventListener("submit", e => { e.preventDefault(); yukle(); });
    form.addEventListener("change", yukle);
    form.addEventListener("input", e => { if (e.target.type === "text" || e.target.type === "number") { clearTimeout(zaman); zaman = setTimeout(yukle, 400); } });
    $("#temizle").addEventListener("click", () => { form.reset(); yukle(); });
    yukle();
  }

  /* ---------- İlan detayı ---------- */
  async function ilan() {
    const id = new URLSearchParams(location.search).get("id");
    const kok = $("#detay");
    let x = null;
    try { x = id ? await Veri.getir(id) : null; } catch (e) { kok.innerHTML = `<div class="bos">${esc(e.message)}</div>`; return; }
    if (!x || x.durum !== "yayinda") {
      kok.innerHTML = `<div class="bos" style="grid-column:1/-1">Bu ilan yayında değil veya kaldırılmış. <a href="ilanlar.html">Tüm ilanlara dönün</a>.</div>`;
      return;
    }
    document.title = x.baslik + " | " + A.firma;
    const can = document.createElement("link"); can.rel = "canonical"; can.href = "https://aydaemlak.com.tr/ilan.html?id=" + encodeURIComponent(x.id); document.head.appendChild(can);
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = `${TIP[x.tip] || ""} ${KAT[x.kategori] || ""}, ${konumYazi(x)} — ${para(x.fiyat)}`;

    const foto = (x.fotograflar || []).filter(guvenliSrc);
    const satir = (a, b) => b == null || b === "" ? "" : `<div><span>${a}</span><b>${esc(b)}</b></div>`;
    const evet = v => v ? "Evet" : "Hayır";
    const tablo = [
      satir("İlan no", x.id), satir("İlan tipi", TIP[x.tip]), satir("Emlak türü", KAT[x.kategori]),
      satir("Oda sayısı", x.oda), satir("Brüt m²", x.brut_m2), satir("Net m²", x.net_m2),
      satir("Bina yaşı", x.bina_yasi), satir("Bulunduğu kat", x.kat), satir("Kat sayısı", x.kat_sayisi),
      satir("Isıtma", x.isitma), satir("Banyo", x.banyo),
      x.kategori === "daire" || x.kategori === "villa" ? satir("Eşyalı", evet(x.esyali)) + satir("Site içinde", evet(x.site_icinde)) : ""
    ].join("");
    const mesaj = encodeURIComponent(`Merhaba, "${x.baslik}" ilanı (no: ${x.id}) hakkında bilgi almak istiyorum.`);

    kok.innerHTML = `<div>
      <div class="galeri-ana">${foto.length ? `<img id="g-img" src="${guvenliSrc(foto[0])}" alt="${esc(x.baslik)}">` : ""}
        ${foto.length > 1 ? `<button class="galeri-ok sol" aria-label="Önceki fotoğraf">${I.sol}</button><button class="galeri-ok sag" aria-label="Sonraki fotoğraf">${I.sag}</button><span class="galeri-say" id="g-say">1 / ${foto.length}</span>` : ""}
      </div>
      ${foto.length > 1 ? `<div class="kucukler">${foto.map((f, i) => `<button data-i="${i}" class="${i ? "" : "aktif"}" aria-label="Fotoğraf ${i + 1}"><img src="${guvenliSrc(f)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      <h1>${esc(x.baslik)}</h1>
      <div class="konum">${I.konum}${esc(konumYazi(x))}</div>
      <div class="tablo">${tablo}</div>
      ${x.ozellikler && x.ozellikler.length ? `<h2 style="font-size:1.2rem">Özellikler</h2><ul class="etiketler">${x.ozellikler.map(o => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
      <h2 style="font-size:1.2rem;margin-top:28px">Açıklama</h2>
      <div class="aciklama">${esc(x.aciklama)}</div>
    </div>
    <aside><div class="yan-kart">
      <span class="ilan-no">${esc(TIP[x.tip])} · ${esc(KAT[x.kategori])}</span>
      <div class="fiyat">${para(x.fiyat)}${x.tip === "kiralik" && x.fiyat ? " <small>/ ay</small>" : ""}</div>
      <a class="btn btn-vurgu" href="tel:${esc(A.telefonLink)}">${I.tel}${esc(A.telefon)}</a>
      ${A.whatsapp ? `<a class="btn btn-yesil" target="_blank" rel="noopener" href="https://wa.me/${encodeURIComponent(A.whatsapp)}?text=${mesaj}">${I.wp}WhatsApp ile sor</a>` : ""}
      <span class="ilan-no">İlan no: ${esc(x.id)} — ararken bu numarayı söyleyin.</span>
    </div></aside>`;

    if (foto.length > 1) {
      let i = 0;
      const img = $("#g-img"), say = $("#g-say"), kb = kok.querySelectorAll(".kucukler button");
      const git = n => { i = (n + foto.length) % foto.length; img.src = foto[i]; say.textContent = `${i + 1} / ${foto.length}`; kb.forEach((b, k) => b.classList.toggle("aktif", k === i)); };
      kok.querySelector(".galeri-ok.sol").onclick = () => git(i - 1);
      kok.querySelector(".galeri-ok.sag").onclick = () => git(i + 1);
      kb.forEach(b => b.onclick = () => git(Number(b.dataset.i)));
      document.addEventListener("keydown", e => { if (e.key === "ArrowLeft") git(i - 1); if (e.key === "ArrowRight") git(i + 1); });
    }

    try {
      const benzer = (await Veri.liste({ tip: x.tip, kategori: x.kategori, limit: 4 })).filter(b => b.id !== x.id).slice(0, 3);
      if (benzer.length) { $("#benzer").innerHTML = benzer.map(kart).join(""); $("#benzer-bolum").classList.remove("gizli"); }
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", () => {
    const s = document.body.dataset.sayfa;
    if (s === "ana") anaSayfa();
    else if (s === "satilik" || s === "kiralik" || s === "liste") ilanlar();
    else if (s === "ilan") ilan();
  });
})();

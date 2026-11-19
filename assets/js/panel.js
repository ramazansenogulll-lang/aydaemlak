/* Ofis paneli: giriş, ilan listesi, ilan ekle/düzenle */
(function () {
  const { I, esc, guvenliSrc, para, TIP, KAT, konumYazi, bildir, A } = window.E;
  const kok = () => document.getElementById("kok");
  const DURUM = { yayinda: "Yayında", taslak: "Taslak", pasif: "Satıldı / Pasif" };
  const OZELLIK = ["Asansör", "Otopark", "Kapalı otopark", "Balkon", "Teras", "Bahçe", "Havuz", "Güvenlik", "Site içinde",
    "Ankastre mutfak", "Doğalgaz", "Dış cephe yalıtımı", "Ebeveyn banyosu", "Giyinme odası", "Şömine", "Jeneratör", "Çocuk parkı", "Spor salonu",
    "Deniz manzarası", "Doğa manzarası", "Metroya yakın", "Okula yakın", "Krediye uygun", "Takasa uygun", "Kiracılı", "Depo", "Vitrin"];

  let kullanici = null;
  let gorunum = "liste";

  /* ---------- Giriş ---------- */
  function girisEkrani(mesaj) {
    kok().innerHTML = `<div class="giris-kap"><form class="giris-kutu" id="giris">
      <h1 style="font-size:1.5rem;margin:0">Ofis paneli</h1>
      <p style="margin:0;color:var(--soluk)">İlan eklemek ve düzenlemek için giriş yapın.</p>
      ${Veri.mod === "statik" ? `<div class="uyari">Panel henüz etkin değil. Supabase kurulumu tamamlanınca bu ekrandan giriş yapılacak.</div>` : ""}
      ${Veri.mod === "demo" ? `<div class="uyari">Demo modu: herhangi bir e-posta ve şifreyle girebilirsiniz. Gerçek kullanımda yalnızca Supabase'de tanımladığınız ofis hesapları girebilir.</div>` : ""}
      ${mesaj ? `<div class="uyari hata">${esc(mesaj)}</div>` : ""}
      <div><label for="g-e">E-posta</label><input id="g-e" name="email" type="email" autocomplete="username" required value="${Veri.mod === "demo" ? "ofis@ornek.com" : ""}"></div>
      <div><label for="g-s">Şifre</label><input id="g-s" name="sifre" type="password" autocomplete="current-password" required></div>
      <button class="btn btn-ana" type="submit">Giriş yap</button>
      <a href="index.html" style="text-align:center;font-size:.9rem">← Siteye dön</a>
    </form></div>`;
    const f = document.getElementById("giris");
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const b = f.querySelector("button"); b.disabled = true; b.textContent = "Giriş yapılıyor…";
      try { kullanici = await Veri.girisYap(f.email.value.trim(), f.sifre.value); paneliKur(); }
      catch (err) { girisEkrani(err.message); }
    });
  }

  /* ---------- Panel iskeleti ---------- */
  function paneliKur() {
    kok().innerHTML = `<div class="panel">
      <nav class="panel-yan" aria-label="Panel menüsü">
        <button data-git="liste">${I.liste}İlanlar</button>
        <button data-git="yeni">${I.arti}Yeni ilan</button>
        <a href="index.html" target="_blank" rel="noopener">${I.goz}Siteyi gör</a>
        <button id="cikis">${I.cikis}Çıkış</button>
        <div class="alt">${esc(kullanici && kullanici.email)}</div>
      </nav>
      <div class="panel-ic" id="ic"></div></div>`;
    kok().querySelectorAll("[data-git]").forEach(b => b.addEventListener("click", () => git(b.dataset.git)));
    document.getElementById("cikis").addEventListener("click", async () => { await Veri.cikisYap(); kullanici = null; girisEkrani(); });
    const p = new URLSearchParams(location.search);
    if (p.get("duzenle")) git("duzenle", p.get("duzenle")); else git(p.get("g") === "yeni" ? "yeni" : "liste");
  }

  function git(g, id) {
    gorunum = g;
    kok().querySelectorAll("[data-git]").forEach(b => b.classList.toggle("aktif", b.dataset.git === (g === "duzenle" ? "" : g)));
    const url = g === "duzenle" ? "?duzenle=" + encodeURIComponent(id) : g === "yeni" ? "?g=yeni" : location.pathname;
    history.replaceState(null, "", url);
    window.scrollTo(0, 0);
    if (g === "liste") listeEkrani(); else formEkrani(g === "duzenle" ? id : null);
  }

  /* ---------- İlan listesi ---------- */
  async function listeEkrani() {
    const ic = document.getElementById("ic");
    ic.innerHTML = `<div class="panel-bas"><h1>İlanlar</h1><button class="btn btn-vurgu" id="ekle">${I.arti}Yeni ilan</button></div>
      <div class="sayaclar" id="sayac"></div>
      <div class="kutu"><div class="panel-arac">
        <input id="ara" type="search" placeholder="Başlık, il, ilçe veya ilan no ara" aria-label="İlan ara">
        <select id="durum-f" aria-label="Duruma göre"><option value="">Tüm durumlar</option><option value="yayinda">Yayında</option><option value="taslak">Taslak</option><option value="pasif">Satıldı / Pasif</option></select>
      </div><div id="satirlar"><div class="bos">Yükleniyor…</div></div></div>`;
    document.getElementById("ekle").onclick = () => git("yeni");
    let hepsi = [];
    try { hepsi = await Veri.hepsi(); }
    catch (e) { document.getElementById("satirlar").innerHTML = `<div class="uyari hata">${esc(e.message)}</div>`; return; }

    const say = k => hepsi.filter(x => x.durum === k).length;
    document.getElementById("sayac").innerHTML = [
      [hepsi.length, "Toplam ilan"], [say("yayinda"), "Yayında"], [say("taslak"), "Taslak"], [hepsi.filter(x => x.one_cikan && x.durum === "yayinda").length, "Öne çıkan"]
    ].map(([n, t]) => `<div class="sayac"><b>${n}</b><span>${t}</span></div>`).join("");

    const ara = document.getElementById("ara"), df = document.getElementById("durum-f");
    function ciz() {
      const q = ara.value.toLocaleLowerCase("tr-TR").trim();
      const l = hepsi.filter(x => (!df.value || x.durum === df.value) &&
        (!q || [x.baslik, x.il, x.ilce, x.mahalle, x.id].some(v => String(v || "").toLocaleLowerCase("tr-TR").includes(q))));
      const kutu = document.getElementById("satirlar");
      if (!l.length) { kutu.innerHTML = `<div class="bos">${hepsi.length ? "Aramaya uygun ilan yok." : "Henüz ilan yok. “Yeni ilan” ile ilk ilanınızı ekleyin."}</div>`; return; }
      kutu.innerHTML = l.map(x => `<div class="ilan-satir" data-id="${esc(x.id)}">
        ${x.fotograflar && x.fotograflar[0] ? `<img src="${guvenliSrc(x.fotograflar[0])}" alt="">` : `<div style="width:96px;aspect-ratio:16/10;background:var(--zemin-2);border-radius:8px"></div>`}
        <div class="bilgi"><b>${esc(x.baslik)}</b>
          <small><span class="durum ${esc(x.durum)}">${esc(DURUM[x.durum] || x.durum)}</span>${x.one_cikan ? "★ " : ""}${esc(TIP[x.tip])} ${esc(KAT[x.kategori])} · ${para(x.fiyat)} · ${esc(konumYazi(x))}</small></div>
        <div class="islemler">
          <button class="btn btn-cizgi btn-kucuk" data-is="duzenle">Düzenle</button>
          <button class="btn btn-cizgi btn-kucuk" data-is="one" title="Ana sayfada öne çıkar">${x.one_cikan ? "★ Öne çıkan" : "☆ Öne çıkar"}</button>
          ${x.durum === "yayinda" ? `<a class="btn btn-cizgi btn-kucuk" href="ilan.html?id=${encodeURIComponent(x.id)}" target="_blank" rel="noopener">Gör</a>` : ""}
          <button class="btn btn-tehlike btn-kucuk" data-is="sil" aria-label="Sil">${I.cop}</button>
        </div></div>`).join("");
    }
    ara.addEventListener("input", ciz); df.addEventListener("change", ciz); ciz();

    document.getElementById("satirlar").addEventListener("click", async e => {
      const b = e.target.closest("[data-is]"); if (!b) return;
      const id = b.closest(".ilan-satir").dataset.id;
      const x = hepsi.find(i => i.id === id);
      try {
        if (b.dataset.is === "duzenle") return git("duzenle", id);
        if (b.dataset.is === "one") { await Veri.kaydet(id, { one_cikan: !x.one_cikan }); x.one_cikan = !x.one_cikan; ciz(); bildir(x.one_cikan ? "Öne çıkarıldı" : "Öne çıkan kaldırıldı"); }
        if (b.dataset.is === "sil") {
          if (!confirm(`"${x.baslik}" ilanı ve fotoğrafları kalıcı olarak silinsin mi? Bu işlem geri alınamaz.\n\nSatıldıysa silmek yerine durumunu "Satıldı / Pasif" yapabilirsiniz.`)) return;
          await Veri.sil(id); hepsi = hepsi.filter(i => i.id !== id); ciz(); bildir("İlan silindi");
        }
      } catch (err) { bildir(err.message, true); }
    });
  }

  /* ---------- İlan formu ---------- */
  async function formEkrani(id) {
    const ic = document.getElementById("ic");
    let x = { tip: "satilik", kategori: "daire", durum: "yayinda", il: "Denizli", ilce: "Çardak", ozellikler: [], fotograflar: [] };
    if (id) {
      ic.innerHTML = `<div class="bos">Yükleniyor…</div>`;
      try { x = await Veri.getir(id); } catch (e) { x = null; }
      if (!x) { ic.innerHTML = `<div class="uyari hata">İlan bulunamadı.</div>`; return; }
    }
    let fotolar = (x.fotograflar || []).slice();
    const silinecek = [];
    const v = k => esc(x[k] == null ? "" : x[k]);
    const sec = (ad, secenek, deger) => `<select id="i-${ad}" name="${ad}">${secenek.map(([d, t]) => `<option value="${esc(d)}"${String(deger || "") === d ? " selected" : ""}>${esc(t)}</option>`).join("")}</select>`;
    const odalar = ["", "1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+1"].map(o => [o, o || "—"]);
    const isitma = ["", "Doğalgaz", "Doğalgaz (kombi)", "Merkezi", "Yerden ısıtma", "Klima", "Soba", "Yok"].map(o => [o, o || "—"]);

    ic.innerHTML = `<div class="panel-bas"><h1>${id ? "İlanı düzenle" : "Yeni ilan"}</h1></div>
    <form class="kutu" id="ilan-form" novalidate>
      <div class="form-izgara">
        <h2 class="form-baslik">Temel bilgiler</h2>
        <div class="tam"><label for="i-baslik">İlan başlığı *</label><input id="i-baslik" name="baslik" required maxlength="120" value="${v("baslik")}" placeholder="Örn. Deniz manzaralı 3+1 site içinde daire"></div>
        <div><label for="i-tip">İlan tipi</label>${sec("tip", [["satilik", "Satılık"], ["kiralik", "Kiralık"]], x.tip)}</div>
        <div><label for="i-kategori">Emlak türü</label>${sec("kategori", Object.entries(KAT), x.kategori)}</div>
        <div><label for="i-fiyat">Fiyat (₺) *</label><input id="i-fiyat" name="fiyat" type="number" min="0" step="1" required value="${v("fiyat")}"></div>
        <div><label for="i-durum">Durum</label>${sec("durum", Object.entries(DURUM), x.durum)}</div>
        <div class="iki-sutun" style="align-self:end"><label class="kutu-sec"><input type="checkbox" name="one_cikan"${x.one_cikan ? " checked" : ""}> Ana sayfada öne çıkar</label></div>

        <h2 class="form-baslik">Konum</h2>
        <div><label for="i-il">İl *</label><input id="i-il" name="il" required value="${v("il")}"></div>
        <div><label for="i-ilce">İlçe *</label><input id="i-ilce" name="ilce" required value="${v("ilce")}"></div>
        <div><label for="i-mahalle">Mahalle</label><input id="i-mahalle" name="mahalle" value="${v("mahalle")}"></div>

        <h2 class="form-baslik">Detaylar</h2>
        <div><label for="i-oda">Oda sayısı</label>${sec("oda", odalar, x.oda)}</div>
        <div><label for="i-brut_m2">Brüt m²</label><input id="i-brut_m2" name="brut_m2" type="number" min="0" value="${v("brut_m2")}"></div>
        <div><label for="i-net_m2">Net m²</label><input id="i-net_m2" name="net_m2" type="number" min="0" value="${v("net_m2")}"></div>
        <div><label for="i-bina_yasi">Bina yaşı</label><input id="i-bina_yasi" name="bina_yasi" type="number" min="0" value="${v("bina_yasi")}"></div>
        <div><label for="i-kat">Bulunduğu kat</label><input id="i-kat" name="kat" value="${v("kat")}" placeholder="Örn. 3, Zemin, Bahçe"></div>
        <div><label for="i-kat_sayisi">Kat sayısı</label><input id="i-kat_sayisi" name="kat_sayisi" type="number" min="0" value="${v("kat_sayisi")}"></div>
        <div><label for="i-isitma">Isıtma</label>${sec("isitma", isitma, x.isitma)}</div>
        <div><label for="i-banyo">Banyo sayısı</label><input id="i-banyo" name="banyo" type="number" min="0" value="${v("banyo")}"></div>
        <div style="display:flex;flex-direction:column;justify-content:end;gap:8px">
          <label class="kutu-sec"><input type="checkbox" name="esyali"${x.esyali ? " checked" : ""}> Eşyalı</label>
          <label class="kutu-sec"><input type="checkbox" name="site_icinde"${x.site_icinde ? " checked" : ""}> Site içinde</label>
        </div>

        <h2 class="form-baslik">Özellikler</h2>
        <div class="tam ozellik-sec">${OZELLIK.map(o => `<label class="kutu-sec"><input type="checkbox" name="ozellik" value="${esc(o)}"${(x.ozellikler || []).includes(o) ? " checked" : ""}> ${esc(o)}</label>`).join("")}</div>

        <h2 class="form-baslik">Açıklama</h2>
        <div class="tam"><label for="i-aciklama" class="sr">Açıklama</label><textarea id="i-aciklama" name="aciklama" maxlength="5000" placeholder="Evin öne çıkan yönleri, çevresi, ulaşım…">${v("aciklama")}</textarea></div>

        <h2 class="form-baslik">Fotoğraflar</h2>
        <div class="tam">
          <label class="foto-alan" for="i-foto">Fotoğraf seçmek için tıklayın (birden fazla seçebilirsiniz).<br><small>İlk fotoğraf kapak olur; okla sıralayabilirsiniz. Fotoğraflar otomatik küçültülür.</small></label>
          <input id="i-foto" type="file" accept="image/*" multiple class="sr">
          <div class="foto-liste" id="foto-liste"></div>
        </div>
      </div>
      <div id="form-hata"></div>
      <div class="form-alt">
        <button type="button" class="btn btn-cizgi" id="vazgec">Vazgeç</button>
        <button type="submit" class="btn btn-ana" id="kaydet">${id ? "Değişiklikleri kaydet" : "İlanı kaydet"}</button>
      </div>
    </form>`;

    const form = document.getElementById("ilan-form");
    const liste = document.getElementById("foto-liste");
    function fotoCiz() {
      liste.innerHTML = fotolar.map((f, i) => `<div class="foto-oge"><img src="${guvenliSrc(f)}" alt="Fotoğraf ${i + 1}">
        ${i === 0 ? `<span class="kapak">Kapak</span>` : ""}
        <div class="fb">${i ? `<button type="button" data-f="sol" data-i="${i}" aria-label="Öne al">${I.sol}</button>` : ""}
        <button type="button" data-f="sil" data-i="${i}" aria-label="Fotoğrafı kaldır">${I.cop}</button></div></div>`).join("");
    }
    fotoCiz();
    liste.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const i = Number(b.dataset.i);
      if (b.dataset.f === "sil") silinecek.push(...fotolar.splice(i, 1));
      else if (i > 0) [fotolar[i - 1], fotolar[i]] = [fotolar[i], fotolar[i - 1]];
      fotoCiz();
    });
    document.getElementById("i-foto").addEventListener("change", async e => {
      const dosyalar = Array.from(e.target.files); e.target.value = "";
      for (const d of dosyalar) {
        if (!d.type.startsWith("image/")) continue;
        const yer = document.createElement("div"); yer.className = "foto-oge"; yer.innerHTML = `<div class="bos" style="padding:20px;border:0">Yükleniyor…</div>`;
        liste.appendChild(yer);
        try { fotolar.push(await Veri.fotoYukle(d)); } catch (err) { bildir(err.message, true); }
        fotoCiz();
      }
    });
    document.getElementById("vazgec").onclick = () => git("liste");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const hataKutu = document.getElementById("form-hata");
      const eksik = ["baslik", "fiyat", "il", "ilce"].filter(k => !String(form[k].value).trim());
      if (eksik.length) {
        hataKutu.innerHTML = `<div class="uyari hata" style="margin-top:16px">Lütfen zorunlu alanları doldurun: başlık, fiyat, il ve ilçe.</div>`;
        form[eksik[0]].focus(); return;
      }
      const fd = new FormData(form);
      const veri = {
        baslik: fd.get("baslik").trim(), tip: fd.get("tip"), kategori: fd.get("kategori"), fiyat: fd.get("fiyat"),
        durum: fd.get("durum"), one_cikan: form.one_cikan.checked, il: fd.get("il").trim(), ilce: fd.get("ilce").trim(),
        mahalle: fd.get("mahalle").trim(), oda: fd.get("oda"), brut_m2: fd.get("brut_m2"), net_m2: fd.get("net_m2"),
        bina_yasi: fd.get("bina_yasi"), kat: fd.get("kat").trim(), kat_sayisi: fd.get("kat_sayisi"), isitma: fd.get("isitma"),
        banyo: fd.get("banyo"), esyali: form.esyali.checked, site_icinde: form.site_icinde.checked,
        ozellikler: fd.getAll("ozellik"), aciklama: fd.get("aciklama").trim(), fotograflar: fotolar
      };
      const b = document.getElementById("kaydet"); b.disabled = true; b.textContent = "Kaydediliyor…";
      try {
        await Veri.kaydet(id, veri);
        for (const u of silinecek) { try { await Veri.fotoSil(u); } catch (err) {} }
        bildir(id ? "Değişiklikler kaydedildi" : "İlan eklendi");
        git("liste");
      } catch (err) {
        hataKutu.innerHTML = `<div class="uyari hata" style="margin-top:16px">${esc(err.message)}</div>`;
        b.disabled = false; b.textContent = id ? "Değişiklikleri kaydet" : "İlanı kaydet";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    try { kullanici = await Veri.oturum(); } catch (e) { kullanici = null; }
    kullanici ? paneliKur() : girisEkrani();
  });
})();

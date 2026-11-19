/* Demo modu için örnek ilanlar. Görseller çizim (SVG); gerçek fotoğraf değildir. */
(function () {
  const PALET = [
    ["#cfe3f0", "#f6efe4", "#2f5d62", "#e9a25f"],
    ["#f3dccb", "#fbf4ec", "#5b4a7a", "#d97a5b"],
    ["#d6ead9", "#f4f7ef", "#35624a", "#c9a24a"],
    ["#e4dcf2", "#f7f4fb", "#3b4f80", "#e08b6a"],
    ["#f2e4c9", "#fbf7ee", "#7a4b35", "#5f8a8b"],
    ["#d9e6ee", "#eef4f6", "#24435c", "#e3b65b"]
  ];
  function svg(p, tur, aci) {
    const [gok, zemin, ana, vurgu] = p;
    let bina;
    if (tur === "arsa") {
      bina = `<path d="M0 300 Q200 250 400 285 T800 270 V500 H0Z" fill="#9cbf8a"/><path d="M0 360 Q300 320 800 350 V500 H0Z" fill="#86ad74"/>
      <g stroke="${ana}" stroke-width="4"><line x1="250" y1="330" x2="250" y2="280"/><line x1="560" y1="335" x2="560" y2="285"/></g>
      <rect x="255" y="282" width="70" height="30" fill="${vurgu}"/>`;
    } else if (tur === "villa") {
      bina = `<rect x="0" y="380" width="800" height="120" fill="#a7c79a"/>
      <rect x="180" y="220" width="440" height="170" fill="${zemin}"/><path d="M160 225 L400 120 L640 225Z" fill="${ana}"/>
      <rect x="370" y="290" width="60" height="100" fill="${vurgu}"/>
      <g fill="${gok}" stroke="${ana}" stroke-width="5"><rect x="220" y="260" width="90" height="70"/><rect x="490" y="260" width="90" height="70"/></g>
      <ellipse cx="110" cy="360" rx="55" ry="70" fill="#6f9a63"/><ellipse cx="700" cy="350" rx="50" ry="80" fill="#6f9a63"/>`;
    } else if (tur === "isyeri") {
      bina = `<rect x="0" y="400" width="800" height="100" fill="#c9ccd1"/>
      <rect x="160" y="160" width="480" height="240" fill="${zemin}"/><rect x="160" y="150" width="480" height="38" fill="${ana}"/>
      <rect x="200" y="250" width="400" height="150" fill="${gok}" stroke="${ana}" stroke-width="6"/>
      <line x1="400" y1="250" x2="400" y2="400" stroke="${ana}" stroke-width="6"/><rect x="160" y="210" width="480" height="18" fill="${vurgu}"/>`;
    } else {
      let pen = "";
      for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++)
        pen += `<rect x="${250 + c * 80}" y="${120 + r * 55}" width="44" height="34" rx="3" fill="${(r + c + aci) % 3 ? gok : vurgu}"/>`;
      bina = `<rect x="0" y="410" width="800" height="90" fill="#b8cbb0"/>
      <rect x="225" y="90" width="350" height="320" fill="${zemin}" stroke="${ana}" stroke-width="6"/>${pen}
      <rect x="370" y="360" width="60" height="50" fill="${ana}"/>
      <rect x="80" y="230" width="120" height="180" fill="${ana}" opacity=".35"/><rect x="610" y="190" width="130" height="220" fill="${ana}" opacity=".25"/>`;
    }
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="${gok}"/>
    <circle cx="${640 - aci * 60}" cy="90" r="38" fill="#fff" opacity=".7"/>${bina}</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  }
  function foto(i, tur) { return [0, 1, 2].map(k => svg(PALET[(i + k) % PALET.length], tur, k)); }
  function gun(n) { return new Date(Date.now() - n * 86400000).toISOString(); }

  const L = [
    ["Deniz manzaralı 3+1 site içinde daire", "satilik", "daire", 6450000, "İzmir", "Karşıyaka", "Bostanlı", "3+1", 145, 125, 5, "4", 8, "Doğalgaz (kombi)", 2, false, true, ["Asansör", "Otopark", "Havuz", "Güvenlik", "Balkon"], true],
    ["Metroya 5 dakika yeni binada 2+1", "satilik", "daire", 3850000, "Ankara", "Çankaya", "Balgat", "2+1", 105, 92, 1, "2", 6, "Doğalgaz (kombi)", 1, false, false, ["Asansör", "Otopark", "Ankastre mutfak"], true],
    ["Bahçeli müstakil villa, 4+1", "satilik", "villa", 14900000, "Muğla", "Bodrum", "Gümüşlük", "4+1", 260, 220, 3, "Bahçe", 2, "Klima", 3, false, false, ["Bahçe", "Havuz", "Otopark", "Şömine"], true],
    ["Eşyalı 1+1 öğrenciye uygun", "kiralik", "daire", 14500, "İstanbul", "Kadıköy", "Moda", "1+1", 65, 55, 20, "1", 5, "Doğalgaz (kombi)", 1, true, false, ["Balkon", "İnternet altyapısı"], false],
    ["Cadde üzeri 120 m² dükkân", "kiralik", "isyeri", 42000, "Bursa", "Nilüfer", "Beşevler", "", 130, 120, 10, "Zemin", 4, "Klima", 1, false, false, ["Vitrin", "Depo", "Otopark"], true],
    ["İmarlı 520 m² konut arsası", "satilik", "arsa", 2750000, "Antalya", "Döşemealtı", "Yeniköy", "", 520, 520, null, "", null, "", null, false, false, ["Köşe parsel", "Elektrik", "Su"], false],
    ["Geniş aile dairesi 3+1, okula yakın", "kiralik", "daire", 24000, "Ankara", "Etimesgut", "Eryaman", "3+1", 150, 130, 7, "3", 10, "Merkezi", 2, false, true, ["Asansör", "Otopark", "Çocuk parkı", "Güvenlik"], false],
    ["Yatırımlık 2+1, kiracılı", "satilik", "daire", 3200000, "İzmir", "Bornova", "Erzene", "2+1", 95, 85, 12, "2", 5, "Doğalgaz (kombi)", 1, false, false, ["Balkon", "Kiracılı"], false]
  ];
  window.EMLAK_ORNEK = function () {
    return L.map((x, i) => ({
      id: "ornek" + (i + 1), baslik: x[0], tip: x[1], kategori: x[2], fiyat: x[3], il: x[4], ilce: x[5], mahalle: x[6],
      oda: x[7], brut_m2: x[8], net_m2: x[9], bina_yasi: x[10], kat: x[11], kat_sayisi: x[12], isitma: x[13], banyo: x[14],
      esyali: x[15], site_icinde: x[16], ozellikler: x[17], one_cikan: x[18], durum: "yayinda",
      aciklama: x[0] + ". Bu bir örnek ilandır; demo modunda sitenin nasıl görüneceğini göstermek için eklendi.\n\nPanelden düzenleyebilir, silebilir veya kendi ilanlarınızı ekleyebilirsiniz.",
      fotograflar: foto(i, x[2]), created_at: gun(i * 3 + 1)
    }));
  };
})();

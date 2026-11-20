/*
  SİTE AYARLARI — sadece bu dosyayı düzenlemeniz yeterli.

  supabaseUrl ve supabaseAnonKey BOŞ ise:
    - demo: false → site, assets/js/ilanlar-veri.js içindeki ilanları gösterir; panel kapalıdır.
    - demo: true  → panel denenebilir, değişiklikler yalnızca o tarayıcıda saklanır (müşteriye göstermek için).
  Gerçek panel için README.md'deki "Supabase kurulumu" adımlarını yapıp iki değeri doldurun.
*/
window.EMLAK_AYAR = {
  firma: "Ayda Emlak",
  slogan: "Çardak'ta satılık ve kiralık ev, daire ve tarla",
  telefon: "0544 906 98 15",
  telefonLink: "+905449069815",
  telefon2: "0545 319 74 53",
  telefon2Link: "+905453197453",
  whatsapp: "905449069815",           // boş bırakılırsa WhatsApp düğmesi gizlenir
  eposta: "info@aydaemlak.com.tr",
  adres: "Cumhuriyet Mah., Adnan Menderes Blv. No:108/A, 20350 Çardak / Denizli",
  haritaLink: "https://www.google.com/maps/search/?api=1&query=Ayda+Emlak+Adnan+Menderes+Blv.+108%2FA+%C3%87ardak+Denizli",
  calismaSaatleri: "Pzt – Cmt · 09:00 – 19:00",

  demo: false,
  supabaseUrl: "https://iuelwlutkbxagfllbdak.supabase.co",                    // ör. https://abcdefgh.supabase.co
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZWx3bHV0a2J4YWdmbGxiZGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNDkzNzAsImV4cCI6MjExMDcyNTM3MH0.xRGzxRmaiVO86uCwTG2oBKvlvKPbNRyoUSUMKDf7YAs",                // Project Settings → API → anon public
  fotoBucket: "ilan-fotolari"
};

/*
  SİTE AYARLARI — sadece bu dosyayı düzenlemeniz yeterli.

  supabaseUrl ve supabaseAnonKey BOŞ kalırsa site DEMO MODUNDA çalışır:
  ilanlar ziyaretçinin tarayıcısında tutulur, panel herkese açık bir deneme panelidir.
  Gerçek kullanım için README.md'deki "Supabase kurulumu" adımlarını yapıp iki değeri doldurun.
*/
window.EMLAK_AYAR = {
  firma: "Yuva Emlak",
  slogan: "Aradığınız ev, bir telefon uzağınızda",
  telefon: "0 (500) 000 00 00",      // ekranda görünen
  telefonLink: "+905000000000",       // tel: bağlantısı
  whatsapp: "905000000000",           // boş bırakılırsa WhatsApp düğmesi gizlenir
  eposta: "info@ornek.com",
  adres: "Ofis adresinizi buraya yazın",
  calismaSaatleri: "Pzt – Cmt · 09:00 – 19:00",

  supabaseUrl: "",                    // ör. https://abcdefgh.supabase.co
  supabaseAnonKey: "",                // Project Settings → API → anon public
  fotoBucket: "ilan-fotolari"
};

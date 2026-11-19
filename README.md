# Emlak teması (ofis panelli)

GitHub Pages'te çalışan statik emlak sitesi. İlanlar, giriş ve fotoğraflar ücretsiz **Supabase** üzerinde tutulur.

- `index.html`: ana sayfa (arama, öne çıkan ilanlar, kategoriler)
- `ilanlar.html`: filtreli ilan listesi
- `ilan.html?id=…`: ilan detayı (galeri, özellikler, ara / WhatsApp)
- `panel.html`: ofis paneli (giriş, ilan ekle/düzenle/sil, öne çıkar, durum, fotoğraf yükleme)
- `assets/js/config.js`: firma adı, telefon, WhatsApp, Supabase bilgileri. **Düzenlemeniz gereken tek dosya bu.**

## Demo modu
`config.js` içinde `supabaseUrl` boşsa site demo modunda çalışır. Örnek ilanlar görünür, panel her e-posta ve şifreyle açılır. Kayıtlar yalnızca o tarayıcıda saklanır. Bu mod müşteriye göstermek içindir, gerçek kullanım için değildir.

## Supabase kurulumu (bir kez, yaklaşık 10 dakika)
1. supabase.com'da ücretsiz hesap açın ve **New project** oluşturun (bölge: Frankfurt).
2. **SQL Editor → New query** açın. `supabase/kurulum.sql` dosyasının tamamını yapıştırıp **Run** deyin.
3. **Authentication → Sign In / Providers → Email** altında **Allow new users to sign up** seçeneğini **kapatın**. Böylece dışarıdan kimse hesap açamaz.
4. **Authentication → Users → Add user → Create new user** ile ofis hesabını (e-posta + şifre) ekleyin. **Auto confirm** işaretli olsun.
5. **Project Settings → API** sayfasındaki **Project URL** ve **anon public** anahtarını `assets/js/config.js` içine yazın.
   (anon anahtarının sitede görünmesi normaldir; yetkiler SQL'deki kurallarla korunur. `service_role` anahtarını **asla** buraya yazmayın.)
6. Siteyi açın, `panel.html` adresinden giriş yapıp ilk ilanınızı ekleyin.

## GitHub Pages
Depoyu GitHub'a yükleyin, ardından **Settings → Pages → Deploy from a branch → main / (root)** seçin. Alan adı için `CNAME` dosyası ekleyin.

## Firma adını değiştirmek
`config.js` içindeki `firma` alanı menüyü ve alt bilgiyi değiştirir. HTML dosyalarının `<title>` satırlarındaki "Yuva Emlak" yazısını da değiştirin.

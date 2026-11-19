# Ayda Emlak — aydaemlak.com.tr (ofis panelli site)

GitHub Pages'te çalışan statik emlak sitesi. İlanlar, giriş ve fotoğraflar ücretsiz **Supabase** üzerinde tutulur.

- `index.html`: ana sayfa (arama, öne çıkan ilanlar, kategoriler)
- `ilanlar.html`: filtreli ilan listesi
- `ilan.html?id=…`: ilan detayı (galeri, özellikler, ara / WhatsApp)
- `panel.html`: ofis paneli (giriş, ilan ekle/düzenle/sil, öne çıkar, durum, fotoğraf yükleme)
- `assets/js/config.js`: firma adı, telefon, WhatsApp, Supabase bilgileri. **Düzenlemeniz gereken tek dosya bu.**

## Supabase kurulmadan önce
`config.js` içinde `supabaseUrl` boşsa site, eski WordPress sitesinden aktarılan 18 ilanı (`assets/js/ilanlar-veri.js`, fotoğraflar `assets/ilanlar/`) gösterir; panel kapalıdır.
`demo: true` yapılırsa panel denenebilir, değişiklikler yalnızca o tarayıcıda kalır.

## Makaleler
6 makale kök dizinde ayrı HTML sayfalarıdır; liste `assets/js/makaleler.js` içindedir. Yeni makale eklerken bir makale sayfasını kopyalayıp metni değiştirin, listeye ve `sitemap.xml`'e ekleyin.

## Eski adresler
Eski WordPress adresleri (`/özellikler/...`, `/about-us/` vb.) klasörlerdeki `index.html` dosyalarıyla yeni sayfalara yönlendirilir.

## Supabase kurulumu (bir kez, yaklaşık 10 dakika)
1. supabase.com'da ücretsiz hesap açın ve **New project** oluşturun (bölge: Frankfurt).
2. **SQL Editor → New query** açın. `supabase/kurulum.sql` dosyasının tamamını yapıştırıp **Run** deyin.
3. **Authentication → Sign In / Providers → Email** altında **Allow new users to sign up** seçeneğini **kapatın**. Böylece dışarıdan kimse hesap açamaz.
4. **Authentication → Users → Add user → Create new user** ile ofis hesabını (e-posta + şifre) ekleyin. **Auto confirm** işaretli olsun.
5. **Project Settings → API** sayfasındaki **Project URL** ve **anon public** anahtarını `assets/js/config.js` içine yazın.
   (anon anahtarının sitede görünmesi normaldir; yetkiler SQL'deki kurallarla korunur. `service_role` anahtarını **asla** buraya yazmayın.)
6. **SQL Editor**'de `supabase/ilanlar.sql` dosyasını da çalıştırın; eski siteden aktarılan 18 ilan veritabanına yüklenir (fotoğrafları sitedeki `assets/ilanlar/` klasöründen gelir).
7. Siteyi açın, `panel.html` adresinden giriş yapıp ilanları yönetin.

## GitHub Pages
Depoyu GitHub'a yükleyin, ardından **Settings → Pages → Deploy from a branch → main / (root)** seçin. Alan adı için `CNAME` dosyası ekleyin.

## Firma adını değiştirmek
`config.js` içindeki `firma` alanı menüyü ve alt bilgiyi değiştirir. Logo dosyaları `assets/img/` içindedir: `ayda-emlak-logo.png` (sitede), `ayda-emlak-logo-seffaf.png`, `ayda-emlak-logo-beyaz.png`, `ayda-emlak-logo-siyah.png` (baskı ve sosyal medya için).

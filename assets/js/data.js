/* Veri katmanı: Supabase ayarlıysa Supabase, değilse tarayıcıda demo veri. */
(function () {
  const A = window.EMLAK_AYAR || {};
  const supaHazir = !!(A.supabaseUrl && A.supabaseAnonKey && window.supabase);
  const sb = supaHazir ? window.supabase.createClient(A.supabaseUrl, A.supabaseAnonKey) : null;

  const ALANLAR = ["baslik", "aciklama", "tip", "kategori", "fiyat", "il", "ilce", "mahalle", "oda",
    "brut_m2", "net_m2", "bina_yasi", "kat", "kat_sayisi", "isitma", "banyo", "esyali", "site_icinde",
    "ozellikler", "fotograflar", "durum", "one_cikan"];

  function temizle(v) {
    const o = {};
    ALANLAR.forEach(k => { if (k in v) o[k] = v[k]; });
    ["fiyat", "brut_m2", "net_m2", "bina_yasi", "kat_sayisi", "banyo"].forEach(k => {
      if (k in o) o[k] = o[k] === "" || o[k] == null ? null : Number(o[k]);
    });
    return o;
  }

  /* ---------- Ortak filtre (demo) ---------- */
  function tr(s) { return String(s || "").toLocaleLowerCase("tr-TR"); }
  function filtrele(list, f) {
    let r = list.filter(x => x.durum === "yayinda");
    if (f.tip) r = r.filter(x => x.tip === f.tip);
    if (f.kategori) r = r.filter(x => x.kategori === f.kategori);
    if (f.oda) r = r.filter(x => x.oda === f.oda);
    if (f.il) r = r.filter(x => tr(x.il).includes(tr(f.il)));
    if (f.ilce) r = r.filter(x => tr(x.ilce).includes(tr(f.ilce)));
    if (f.min) r = r.filter(x => x.fiyat >= Number(f.min));
    if (f.max) r = r.filter(x => x.fiyat <= Number(f.max));
    if (f.q) {
      const q = tr(f.q);
      r = r.filter(x => [x.baslik, x.il, x.ilce, x.mahalle, x.aciklama].some(v => tr(v).includes(q)));
    }
    if (f.one) r = r.filter(x => x.one_cikan);
    r = sirala(r, f.sira);
    return f.limit ? r.slice(0, f.limit) : r;
  }
  function sirala(r, sira) {
    const k = r.slice();
    if (sira === "fiyat-artan") k.sort((a, b) => a.fiyat - b.fiyat);
    else if (sira === "fiyat-azalan") k.sort((a, b) => b.fiyat - a.fiyat);
    else k.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    return k;
  }

  /* ---------- Fotoğraf küçültme ---------- */
  function fotoKucult(file, maxKenar, kalite) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const o = Math.min(1, maxKenar / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * o); c.height = Math.round(img.height * o);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(b => b ? res(b) : rej(new Error("Fotoğraf işlenemedi")), "image/jpeg", kalite);
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error(file.name + " okunamadı")); };
      img.src = url;
    });
  }
  function blobDataUrl(b) {
    return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
  }

  /* ---------- DEMO ---------- */
  const KEY = "emlak_demo_v1";
  let mem = null;
  function demoDb() {
    if (mem) return mem;
    if (A.demo) try { const s = localStorage.getItem(KEY); if (s) { mem = JSON.parse(s); return mem; } } catch (e) {}
    mem = { ilanlar: window.EMLAK_ORNEK ? window.EMLAK_ORNEK() : [], oturum: null };
    if (A.demo) demoKaydet();
    return mem;
  }
  function demoKaydet() {
    if (!A.demo) throw new Error("Panel kapalı: Supabase kurulumu yapılmadı.");
    try { localStorage.setItem(KEY, JSON.stringify(mem)); }
    catch (e) { throw new Error("Tarayıcı depolama alanı doldu. Demo modunda daha az fotoğraf yükleyin."); }
  }
  function yeniId() { return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4); }

  const Demo = {
    async oturum() { const d = demoDb(); return A.demo && d.oturum ? { id: "demo", email: d.oturum } : null; },
    async girisYap(email, sifre) {
      if (!A.demo) throw new Error("Panel henüz etkin değil. Supabase kurulumu yapılınca giriş açılır (README.md).");
      if (!email || !sifre) throw new Error("E-posta ve şifre girin.");
      demoDb().oturum = email; demoKaydet(); return { id: "demo", email };
    },
    async cikisYap() { demoDb().oturum = null; demoKaydet(); },
    async liste(f) { return filtrele(demoDb().ilanlar, f || {}); },
    async hepsi() { return sirala(demoDb().ilanlar, "yeni"); },
    async getir(id) { return demoDb().ilanlar.find(x => x.id === id) || null; },
    async kaydet(id, veri) {
      const d = demoDb(); const v = temizle(veri);
      if (id) {
        const i = d.ilanlar.findIndex(x => x.id === id);
        if (i < 0) throw new Error("İlan bulunamadı");
        d.ilanlar[i] = Object.assign({}, d.ilanlar[i], v, { updated_at: new Date().toISOString() });
        demoKaydet(); return d.ilanlar[i];
      }
      const n = Object.assign({ id: yeniId(), created_at: new Date().toISOString() }, v);
      d.ilanlar.push(n); demoKaydet(); return n;
    },
    async sil(id) { const d = demoDb(); d.ilanlar = d.ilanlar.filter(x => x.id !== id); demoKaydet(); },
    async fotoYukle(file) { return blobDataUrl(await fotoKucult(file, 1000, 0.72)); },
    async fotoSil() {},
    sifirla() { try { localStorage.removeItem(KEY); } catch (e) {} mem = null; }
  };

  /* ---------- SUPABASE ---------- */
  function hata(e) { if (e) throw new Error(e.message || "Sunucu hatası"); }
  function guvenli(q) { return String(q).replace(/[,()%*\\]/g, " ").trim(); }

  const Supa = {
    async oturum() { const { data } = await sb.auth.getSession(); return data.session ? data.session.user : null; },
    async girisYap(email, sifre) {
      const { data, error } = await sb.auth.signInWithPassword({ email, password: sifre });
      if (error) throw new Error(error.message === "Invalid login credentials" ? "E-posta veya şifre hatalı." : error.message);
      return data.user;
    },
    async cikisYap() { await sb.auth.signOut(); },
    async liste(f) {
      f = f || {};
      let q = sb.from("ilanlar").select("*").eq("durum", "yayinda");
      if (f.tip) q = q.eq("tip", f.tip);
      if (f.kategori) q = q.eq("kategori", f.kategori);
      if (f.oda) q = q.eq("oda", f.oda);
      if (f.il) q = q.ilike("il", "%" + guvenli(f.il) + "%");
      if (f.ilce) q = q.ilike("ilce", "%" + guvenli(f.ilce) + "%");
      if (f.min) q = q.gte("fiyat", Number(f.min));
      if (f.max) q = q.lte("fiyat", Number(f.max));
      if (f.one) q = q.eq("one_cikan", true);
      if (f.q) { const s = guvenli(f.q); if (s) q = q.or(`baslik.ilike.%${s}%,il.ilike.%${s}%,ilce.ilike.%${s}%,mahalle.ilike.%${s}%`); }
      if (f.sira === "fiyat-artan") q = q.order("fiyat", { ascending: true });
      else if (f.sira === "fiyat-azalan") q = q.order("fiyat", { ascending: false });
      else q = q.order("created_at", { ascending: false });
      if (f.limit) q = q.limit(f.limit);
      const { data, error } = await q; hata(error); return data;
    },
    async hepsi() {
      const { data, error } = await sb.from("ilanlar").select("*").order("created_at", { ascending: false });
      hata(error); return data;
    },
    async getir(id) {
      const { data, error } = await sb.from("ilanlar").select("*").eq("id", id).maybeSingle();
      hata(error); return data;
    },
    async kaydet(id, veri) {
      const v = temizle(veri);
      const r = id ? await sb.from("ilanlar").update(v).eq("id", id).select().single()
                   : await sb.from("ilanlar").insert(v).select().single();
      hata(r.error); return r.data;
    },
    async sil(id) {
      const ilan = await Supa.getir(id);
      const { error } = await sb.from("ilanlar").delete().eq("id", id); hata(error);
      if (ilan && ilan.fotograflar) for (const u of ilan.fotograflar) await Supa.fotoSil(u);
    },
    async fotoYukle(file) {
      const blob = await fotoKucult(file, 1600, 0.82);
      const yol = new Date().toISOString().slice(0, 7) + "/" + yeniId() + ".jpg";
      const { error } = await sb.storage.from(A.fotoBucket).upload(yol, blob, { contentType: "image/jpeg" });
      hata(error);
      return sb.storage.from(A.fotoBucket).getPublicUrl(yol).data.publicUrl;
    },
    async fotoSil(url) {
      const isaret = "/object/public/" + A.fotoBucket + "/";
      const i = String(url).indexOf(isaret);
      if (i > -1) await sb.storage.from(A.fotoBucket).remove([decodeURIComponent(url.slice(i + isaret.length))]);
    }
  };

  window.Veri = Object.assign({ mod: supaHazir ? "supabase" : A.demo ? "demo" : "statik" }, supaHazir ? Supa : Demo);
  window.Veri.sifirla = Demo.sifirla;
})();

-- Emlak teması — Supabase kurulumu
-- Supabase → SQL Editor → New query → bu dosyanın tamamını yapıştırıp "Run".
-- Kural: ziyaretçiler yalnızca "yayinda" ilanları görür; giriş yapmış ofis hesapları her şeyi yönetir.
-- Ofis hesaplarını Authentication → Users → "Add user" ile siz eklersiniz (dışarıdan üyelik kapalı tutulmalı).

create table if not exists public.ilanlar (
  id           text primary key default substr(md5(random()::text || clock_timestamp()::text), 1, 8),
  baslik       text not null,
  aciklama     text default '',
  tip          text not null default 'satilik' check (tip in ('satilik','kiralik')),
  kategori     text not null default 'daire'   check (kategori in ('daire','villa','arsa','tarla','isyeri')),
  fiyat        numeric,
  il           text, ilce text, mahalle text,
  oda          text,
  brut_m2      numeric, net_m2 numeric,
  bina_yasi    int, kat text, kat_sayisi int,
  isitma       text, banyo int,
  esyali       boolean default false,
  site_icinde  boolean default false,
  ozellikler   text[] default '{}',
  fotograflar  text[] default '{}',
  durum        text not null default 'yayinda' check (durum in ('yayinda','taslak','pasif')),
  one_cikan    boolean default false,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create index if not exists ilanlar_durum_idx on public.ilanlar (durum, created_at desc);

create or replace function public.ilan_guncellendi() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists ilan_guncellendi on public.ilanlar;
create trigger ilan_guncellendi before update on public.ilanlar for each row execute function public.ilan_guncellendi();

alter table public.ilanlar enable row level security;

drop policy if exists "herkes yayindakileri gorur" on public.ilanlar;
create policy "herkes yayindakileri gorur" on public.ilanlar
  for select using (durum = 'yayinda' or auth.role() = 'authenticated');

drop policy if exists "ofis ekler" on public.ilanlar;
create policy "ofis ekler" on public.ilanlar for insert to authenticated with check (true);

drop policy if exists "ofis gunceller" on public.ilanlar;
create policy "ofis gunceller" on public.ilanlar for update to authenticated using (true) with check (true);

drop policy if exists "ofis siler" on public.ilanlar;
create policy "ofis siler" on public.ilanlar for delete to authenticated using (true);

-- Fotoğraf deposu (herkese açık okuma, yalnızca ofis yükler/siler)
insert into storage.buckets (id, name, public)
values ('ilan-fotolari', 'ilan-fotolari', true)
on conflict (id) do update set public = true;

drop policy if exists "ilan fotolari okunur" on storage.objects;
create policy "ilan fotolari okunur" on storage.objects for select using (bucket_id = 'ilan-fotolari');

drop policy if exists "ofis foto yukler" on storage.objects;
create policy "ofis foto yukler" on storage.objects for insert to authenticated with check (bucket_id = 'ilan-fotolari');

drop policy if exists "ofis foto siler" on storage.objects;
create policy "ofis foto siler" on storage.objects for delete to authenticated using (bucket_id = 'ilan-fotolari');

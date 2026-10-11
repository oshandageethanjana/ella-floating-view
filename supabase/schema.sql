-- Ella Floating View content schema
create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  eyebrow text,
  description text,
  price_lkr integer not null default 0,
  guests integer not null default 0,
  image_url text,
  features jsonb not null default '[]'::jsonb,
  breakfast_included boolean not null default true,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text,
  label text,
  layout_class text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.rooms enable row level security;
alter table public.gallery_items enable row level security;

create policy "public can read published rooms" on public.rooms for select using (is_published = true);
create policy "authenticated can manage rooms" on public.rooms for all to authenticated using (true) with check (true);
create policy "public can read published gallery" on public.gallery_items for select using (is_published = true);
create policy "authenticated can manage gallery" on public.gallery_items for all to authenticated using (true) with check (true);

insert into public.rooms (slug, name, eyebrow, description, price_lkr, guests, image_url, features, breakfast_included, sort_order)
values
('double-mountain-view','Double Room with Mountain View','Bed & Breakfast','Double room with mountain view. Breakfast included.',8000,0,'/images/room-enhanced.webp','["Mountain view","Breakfast included"]',true,1),
('deluxe-double-mountain-view','Deluxe Double Room with Mountain View','Bed & Breakfast','Deluxe double room with mountain view. Breakfast included.',10000,0,'/images/room-enhanced.webp','["Mountain view","Breakfast included"]',true,2),
('family-mountain-view','Family Room with Mountain View','Bed & Breakfast','Family room with mountain view. Breakfast included.',12000,0,'/images/room-enhanced.webp','["Mountain view","Breakfast included"]',true,3)
on conflict (slug) do update set
  name = excluded.name,
  eyebrow = excluded.eyebrow,
  description = excluded.description,
  price_lkr = excluded.price_lkr,
  guests = excluded.guests,
  image_url = excluded.image_url,
  features = excluded.features,
  breakfast_included = excluded.breakfast_included,
  sort_order = excluded.sort_order;

insert into public.gallery_items (image_url, alt_text, label, layout_class, sort_order)
values
('/images/gallery/breakfast-together.webp','A couple enjoying breakfast with the Ella hills behind them','Breakfast above the hills','',1),
('/images/gallery/garden-corner.webp','Stone building, water feature and garden at Ella Floating View','A quiet garden corner','',2),
('/images/gallery/balcony-morning.webp','Guest with a laptop and breakfast on the mountain-facing balcony','A morning of your own','',3),
('/images/gallery/table-for-four.webp','Rice and accompaniments served on a wooden dining table','Good food. Good company.','',4),
('/images/gallery/misty-morning.webp','Guest enjoying a drink on the terrace in the mountain mist','Slow mornings in the mist','',5),
('/images/gallery/breakfast-view.webp','Breakfast with a blue teapot and mountain scenery','A table with a view','',6),
('/images/gallery/sunset-terrace.webp','Two guests watching sunset from the covered terrace','Stay for the sunset','',7)
on conflict do nothing;

-- ============================================================================
-- LAGO SPA · ESTÉTICA · SALUD
-- SCRIPT DE BASE DE DATOS — SUPABASE / POSTGRESQL
-- Versión: 1.0
-- ============================================================================
--
-- INSTRUCCIONES DE USO:
-- 1. Abre tu proyecto en Supabase > SQL Editor.
-- 2. Pega este script completo y ejecútalo (Run) una sola vez.
-- 3. Es idempotente en su mayoría (usa IF NOT EXISTS / ON CONFLICT DO NOTHING /
--    CREATE OR REPLACE), por lo que puede re-ejecutarse sin duplicar datos,
--    EXCEPTO el cron.schedule() del Bloque 8, que fallará si el job ya existe
--    con ese nombre (usa cron.unschedule('archive-expired-promotions') antes
--    de re-ejecutar si necesitas correrlo de nuevo).
-- 4. Al final, sigue los "PASOS POST-INSTALACIÓN" al final de este archivo
--    para crear tu usuario administrador y asignarle el rol OWNER.
--
-- ============================================================================
-- BLOQUE 1 / 8 — EXTENSIONES, TIPOS ENUM Y FUNCIONES HELPER
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1.1 EXTENSIONES
-- ----------------------------------------------------------------------------

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists "pg_cron";
create extension if not exists "unaccent"; -- necesaria para slugs sin tildes

-- ----------------------------------------------------------------------------
-- 1.2 SCHEMA DEDICADO PARA CRON (buena práctica, evita ensuciar public)
-- ----------------------------------------------------------------------------

create schema if not exists cron_jobs;

-- ----------------------------------------------------------------------------
-- 1.3 TIPOS ENUM
-- ----------------------------------------------------------------------------
-- Se utilizan ENUM nativos de Postgres en lugar de VARCHAR + CHECK
-- para mayor integridad, mejor rendimiento en índices y claridad semántica.
-- El TDD los describe como VARCHAR(20)/VARCHAR(50), pero un ENUM es
-- estrictamente más seguro y compatible (Postgres lo almacena igual de eficiente).

do $$
begin
  if not exists (select 1 from pg_type where typname = 'service_status') then
    create type service_status as enum ('PUBLIC', 'PRIVATE', 'ARCHIVED');
  end if;

  if not exists (select 1 from pg_type where typname = 'contact_form_status') then
    create type contact_form_status as enum ('PENDING', 'READ', 'ARCHIVED');
  end if;

  if not exists (select 1 from pg_type where typname = 'role_name') then
    create type role_name as enum ('OWNER', 'EMPLOYEE', 'SUPER_ADMIN');
  end if;
end$$;

-- ----------------------------------------------------------------------------
-- 1.4 FUNCIÓN: actualizar updated_at automáticamente
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 1.5 FUNCIÓN: slugify (texto -> slug SEO)
-- ----------------------------------------------------------------------------
-- Convierte "Limpieza Facial Profunda" -> "limpieza-facial-profunda"
-- Soporta tildes, ñ, signos de puntuación y espacios múltiples.

create or replace function public.slugify(input_text text)
returns text
language plpgsql
immutable
as $$
declare
  result text;
begin
  if input_text is null or btrim(input_text) = '' then
    return '';
  end if;

  -- 1. Quitar tildes/diacríticos (unaccent)
  result := unaccent(input_text);

  -- 2. Minúsculas
  result := lower(result);

  -- 3. Reemplazar ñ explícitamente (unaccent no siempre la transforma)
  result := replace(result, 'ñ', 'n');

  -- 4. Reemplazar cualquier carácter no alfanumérico por guion
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');

  -- 5. Quitar guiones al inicio/final
  result := trim(both '-' from result);

  -- 6. Colapsar guiones repetidos
  result := regexp_replace(result, '-{2,}', '-', 'g');

  return result;
end;
$$;

-- ----------------------------------------------------------------------------
-- 1.6 FUNCIÓN GENÉRICA: generar slug único para cualquier tabla
-- ----------------------------------------------------------------------------
-- Dado un texto base, una tabla y una columna de exclusión (id actual,
-- útil en updates), devuelve un slug único agregando -2, -3, etc.
-- si ya existe colisión, según RN-302.4 / TDD-118.

create or replace function public.generate_unique_slug(
  base_text text,
  target_table text,
  exclude_id uuid default null
)
returns text
language plpgsql
as $$
declare
  candidate text;
  base_slug text;
  counter int := 1;
  slug_exists boolean;
begin
  base_slug := public.slugify(base_text);

  if base_slug = '' then
    base_slug := 'item';
  end if;

  candidate := base_slug;

  loop
    execute format(
      'select exists(select 1 from %I where slug = $1 and ($2::uuid is null or id <> $2::uuid))',
      target_table
    )
    into slug_exists
    using candidate, exclude_id;

    if not slug_exists then
      return candidate;
    end if;

    counter := counter + 1;
    candidate := base_slug || '-' || counter::text;
  end loop;
end;
$$;
-- ============================================================================
-- BLOQUE 2 / 8 — ROLES, USUARIOS Y RELACIÓN USER_ROLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 2.1 TABLA: roles
-- ----------------------------------------------------------------------------

create table if not exists public.roles (
  id          uuid primary key default gen_random_uuid(),
  name        role_name not null,
  description text,
  created_at  timestamptz not null default now(),

  constraint roles_name_unique unique (name)
);

comment on table public.roles is 'Roles del sistema. MVP utiliza únicamente OWNER. EMPLOYEE y SUPER_ADMIN preparados para futuras fases.';

-- ----------------------------------------------------------------------------
-- 2.2 TABLA: users
-- ----------------------------------------------------------------------------
-- Información complementaria al usuario autenticado vía Supabase Auth
-- (auth.users). Se crea automáticamente mediante trigger (ver Bloque 7).

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid not null,
  full_name     varchar(150),
  email         varchar(255) not null,
  avatar_url    text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint users_auth_user_id_unique unique (auth_user_id),
  constraint users_email_unique unique (email),
  constraint users_auth_user_id_fk
    foreign key (auth_user_id)
    references auth.users (id)
    on delete cascade
);

comment on table public.users is 'Espejo de auth.users con datos de negocio adicionales (nombre, avatar, estado).';

create trigger trg_users_updated_at
  before update on public.users
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 2.3 TABLA: user_roles
-- ----------------------------------------------------------------------------
-- Relación muchos a muchos entre usuarios y roles.
-- Permite que en el futuro un usuario tenga múltiples roles.

create table if not exists public.user_roles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null,
  role_id     uuid not null,
  created_at  timestamptz not null default now(),

  constraint user_roles_user_fk
    foreign key (user_id)
    references public.users (id)
    on delete cascade,

  constraint user_roles_role_fk
    foreign key (role_id)
    references public.roles (id)
    on delete restrict,

  constraint user_roles_unique unique (user_id, role_id)
);

comment on table public.user_roles is 'Relación N:N entre usuarios administrativos y roles del sistema.';

create index if not exists idx_user_roles_user on public.user_roles (user_id);
create index if not exists idx_user_roles_role on public.user_roles (role_id);
-- ============================================================================
-- BLOQUE 3 / 8 — CATEGORÍAS, SERVICIOS E IMÁGENES DE SERVICIOS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 3.1 TABLA: categories
-- ----------------------------------------------------------------------------
-- RN-001: categorías fijas en el MVP (Facial, Corporal, Salud, Spa).
-- El administrador no puede crear/eliminar categorías desde el panel,
-- pero la tabla queda preparada para administrarlas en fases futuras.

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        varchar(100) not null,
  slug        varchar(120) not null,
  description text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),

  constraint categories_name_unique unique (name),
  constraint categories_slug_unique unique (slug)
);

comment on table public.categories is 'Categorías de servicios. MVP: Facial, Corporal, Salud, Spa (fijas vía panel, editables solo por SQL/futuro rol SUPER_ADMIN).';

create index if not exists idx_categories_slug on public.categories (slug);
create index if not exists idx_categories_active on public.categories (is_active);

-- ----------------------------------------------------------------------------
-- 3.2 TABLA: services
-- ----------------------------------------------------------------------------
-- Entidad principal del catálogo (TDD-108).

create table if not exists public.services (
  id                  uuid primary key default gen_random_uuid(),
  category_id         uuid not null,

  title               varchar(255) not null,
  slug                varchar(255) not null,

  short_description   text,
  description         text not null,

  benefits            jsonb not null default '[]'::jsonb,
  included_services   jsonb not null default '[]'::jsonb,
  recommendations      text,
  contraindications    text,
  observations         text,

  price               numeric(12,2),
  show_price          boolean not null default true,

  status              service_status not null default 'PUBLIC',

  is_featured         boolean not null default false,

  is_promotional      boolean not null default false,
  promotion_start      timestamptz,
  promotion_end        timestamptz,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint services_slug_unique unique (slug),

  constraint services_category_fk
    foreign key (category_id)
    references public.categories (id)
    on delete restrict,

  -- RN-303.2 / RN-303.3: si es promocional, ambas fechas son obligatorias
  -- y la fecha fin debe ser posterior a la fecha inicio.
  constraint services_promotion_dates_required
    check (
      is_promotional = false
      or (promotion_start is not null and promotion_end is not null)
    ),

  constraint services_promotion_dates_order
    check (
      promotion_start is null
      or promotion_end is null
      or promotion_end > promotion_start
    ),

  constraint services_price_non_negative
    check (price is null or price >= 0)
);

comment on table public.services is 'Catálogo principal de tratamientos/servicios. Las promociones son servicios con is_promotional = true (RN-303.1).';

create index if not exists idx_services_slug on public.services (slug);
create index if not exists idx_services_status on public.services (status);
create index if not exists idx_services_featured on public.services (is_featured) where is_featured = true;
create index if not exists idx_services_category on public.services (category_id);
create index if not exists idx_services_promotional on public.services (is_promotional) where is_promotional = true;
create index if not exists idx_services_promotion_end on public.services (promotion_end) where is_promotional = true;

create trigger trg_services_updated_at
  before update on public.services
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 3.3 TRIGGER: generación automática de slug para services
-- ----------------------------------------------------------------------------
-- RN-302.3 / RN-302.4: el slug se genera automáticamente a partir del título
-- y nunca es editable manualmente por el administrador (se ignora cualquier
-- valor enviado manualmente en slug durante INSERT, y se bloquea su cambio
-- en UPDATE salvo que cambie el título).

create or replace function public.services_generate_slug()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    new.slug := public.generate_unique_slug(new.title, 'services', null);
  elsif TG_OP = 'UPDATE' then
    if new.title is distinct from old.title then
      new.slug := public.generate_unique_slug(new.title, 'services', old.id);
    else
      new.slug := old.slug; -- nunca editable manualmente
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_services_slug
  before insert or update on public.services
  for each row
  execute function public.services_generate_slug();

-- ----------------------------------------------------------------------------
-- 3.4 TABLA: service_images
-- ----------------------------------------------------------------------------

create table if not exists public.service_images (
  id            uuid primary key default gen_random_uuid(),
  service_id    uuid not null,
  storage_path  text not null,
  alt_text      text,
  sort_order    integer not null default 0,
  is_cover      boolean not null default false,
  created_at    timestamptz not null default now(),

  constraint service_images_service_fk
    foreign key (service_id)
    references public.services (id)
    on delete cascade
);

comment on table public.service_images is 'Galería de imágenes por servicio. Máximo 15 por servicio (RN-306.3), una sola portada (RN-306.4).';

create index if not exists idx_service_images_service on public.service_images (service_id);
create index if not exists idx_service_images_cover on public.service_images (service_id) where is_cover = true;

-- ----------------------------------------------------------------------------
-- 3.5 TRIGGER: límite de 15 imágenes por servicio (RN-306.3 / D-650)
-- ----------------------------------------------------------------------------

create or replace function public.service_images_enforce_limit()
returns trigger
language plpgsql
as $$
declare
  current_count int;
begin
  select count(*) into current_count
  from public.service_images
  where service_id = new.service_id;

  if current_count >= 15 then
    raise exception 'No se pueden agregar más de 15 imágenes por servicio.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

create trigger trg_service_images_limit
  before insert on public.service_images
  for each row
  execute function public.service_images_enforce_limit();

-- ----------------------------------------------------------------------------
-- 3.6 TRIGGER: una sola portada por servicio (RN-306.4 / RN-306.5)
-- ----------------------------------------------------------------------------
-- Cuando una imagen se marca como portada, cualquier otra portada del
-- mismo servicio pierde automáticamente ese estado.

create or replace function public.service_images_enforce_single_cover()
returns trigger
language plpgsql
as $$
begin
  if new.is_cover = true then
    update public.service_images
    set is_cover = false
    where service_id = new.service_id
      and id <> new.id
      and is_cover = true;
  end if;

  return new;
end;
$$;

create trigger trg_service_images_single_cover
  before insert or update on public.service_images
  for each row
  when (new.is_cover = true)
  execute function public.service_images_enforce_single_cover();
-- ============================================================================
-- BLOQUE 4 / 8 — ESPECIALISTAS Y RELACIÓN SERVICE_SPECIALISTS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 4.1 TABLA: specialists
-- ----------------------------------------------------------------------------

create table if not exists public.specialists (
  id              uuid primary key default gen_random_uuid(),
  name            varchar(255) not null,
  slug            varchar(255) not null,
  photo_url       text not null,
  position        varchar(255) not null,
  description     text,
  certifications  jsonb not null default '[]'::jsonb,
  whatsapp        varchar(50),
  social_links    jsonb not null default '{}'::jsonb,
  schedules       jsonb not null default '[]'::jsonb,
  is_visible      boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint specialists_slug_unique unique (slug)
);

comment on table public.specialists is 'Equipo profesional mostrado públicamente. RN-304.2/304.3: foto y cargo obligatorios.';

create index if not exists idx_specialists_slug on public.specialists (slug);
create index if not exists idx_specialists_visible on public.specialists (is_visible) where is_visible = true;

create trigger trg_specialists_updated_at
  before update on public.specialists
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4.2 TRIGGER: generación automática de slug para specialists
-- ----------------------------------------------------------------------------

create or replace function public.specialists_generate_slug()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    new.slug := public.generate_unique_slug(new.name, 'specialists', null);
  elsif TG_OP = 'UPDATE' then
    if new.name is distinct from old.name then
      new.slug := public.generate_unique_slug(new.name, 'specialists', old.id);
    else
      new.slug := old.slug;
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_specialists_slug
  before insert or update on public.specialists
  for each row
  execute function public.specialists_generate_slug();

-- ----------------------------------------------------------------------------
-- 4.3 TABLA: service_specialists (relación N:N)
-- ----------------------------------------------------------------------------
-- RN-304.4 / RN-304.5: un especialista puede asociarse a múltiples servicios
-- y viceversa. Al eliminar un especialista, solo se elimina la relación
-- (los servicios permanecen). Al eliminar un servicio, se elimina la
-- relación pero el especialista permanece.

create table if not exists public.service_specialists (
  id              uuid primary key default gen_random_uuid(),
  service_id      uuid not null,
  specialist_id   uuid not null,
  created_at      timestamptz not null default now(),

  constraint service_specialists_service_fk
    foreign key (service_id)
    references public.services (id)
    on delete cascade,

  constraint service_specialists_specialist_fk
    foreign key (specialist_id)
    references public.specialists (id)
    on delete cascade,

  constraint service_specialists_unique unique (service_id, specialist_id)
);

comment on table public.service_specialists is 'Relación N:N entre servicios y especialistas. Eliminar una entidad solo borra la relación, nunca la otra entidad.';

create index if not exists idx_service_specialists_service on public.service_specialists (service_id);
create index if not exists idx_service_specialists_specialist on public.service_specialists (specialist_id);
-- ============================================================================
-- BLOQUE 5 / 8 — FORMULARIOS DE CONTACTO, CONFIGURACIÓN Y PROMOTION_RULES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 5.1 TABLA: contact_forms
-- ----------------------------------------------------------------------------
-- DECISIÓN DE DISEÑO (acordada con el cliente):
-- service_interest se modela como FK a services.id (en vez de texto libre),
-- para mayor integridad y trazabilidad de qué servicios generan más
-- consultas. Se permite NULL porque el campo es opcional (FR-109.2).
--
-- on delete set null: si el servicio referenciado se elimina, el formulario
-- NO se borra (RN-305.1 / RN-305.7: los formularios nunca se eliminan
-- automáticamente), solo se limpia la referencia.

create table if not exists public.contact_forms (
  id                  uuid primary key default gen_random_uuid(),
  full_name           varchar(255) not null,
  phone               varchar(50) not null,
  email               varchar(255) not null,
  service_interest_id uuid,
  message             text not null,
  ip_address          inet,
  status              contact_form_status not null default 'PENDING',
  created_at          timestamptz not null default now(),
  read_at             timestamptz,
  archived_at         timestamptz,

  constraint contact_forms_service_interest_fk
    foreign key (service_interest_id)
    references public.services (id)
    on delete set null,

  constraint contact_forms_full_name_length check (char_length(btrim(full_name)) >= 2),
  constraint contact_forms_message_length check (char_length(btrim(message)) >= 10),
  constraint contact_forms_email_format
    check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

comment on table public.contact_forms is 'Solicitudes de contacto recibidas desde el sitio público. Nunca se eliminan automáticamente (RN-305.7), solo se archivan.';

create index if not exists idx_contact_forms_status on public.contact_forms (status);
create index if not exists idx_contact_forms_created_at on public.contact_forms (created_at desc);
create index if not exists idx_contact_forms_service_interest on public.contact_forms (service_interest_id);

-- ----------------------------------------------------------------------------
-- 5.2 TRIGGER: timestamps automáticos de read_at / archived_at
-- ----------------------------------------------------------------------------
-- Cuando el estado cambia a READ o ARCHIVED, se registra el momento exacto
-- automáticamente, evitando que el frontend tenga que enviarlo manualmente.

create or replace function public.contact_forms_set_status_timestamps()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'READ' and old.status is distinct from 'READ' and new.read_at is null then
    new.read_at := now();
  end if;

  if new.status = 'ARCHIVED' and old.status is distinct from 'ARCHIVED' and new.archived_at is null then
    new.archived_at := now();
  end if;

  return new;
end;
$$;

create trigger trg_contact_forms_status_timestamps
  before update on public.contact_forms
  for each row
  execute function public.contact_forms_set_status_timestamps();

-- ----------------------------------------------------------------------------
-- 5.3 TABLA: settings
-- ----------------------------------------------------------------------------
-- Configuraciones globales del sistema en formato key/value (JSONB).
-- Preparada para administrar en el futuro: Hero, Contacto, Redes Sociales,
-- etc. (TDD-113 / TDD-510).

create table if not exists public.settings (
  id          uuid primary key default gen_random_uuid(),
  key         varchar(100) not null,
  value       jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint settings_key_unique unique (key)
);

comment on table public.settings is 'Configuración global en formato key/value. Usada en MVP para datos de contacto, WhatsApp y redes sociales.';

create trigger trg_settings_updated_at
  before update on public.settings
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5.4 TABLA: promotion_rules
-- ----------------------------------------------------------------------------
-- Preparación arquitectónica para automatizaciones de promociones más
-- complejas en fases futuras (TDD-114). No se utiliza activamente en el MVP;
-- la lógica actual vive directamente en services.is_promotional/promotion_*.

create table if not exists public.promotion_rules (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid not null,
  starts_at   timestamptz not null,
  ends_at     timestamptz not null,
  created_at  timestamptz not null default now(),

  constraint promotion_rules_service_fk
    foreign key (service_id)
    references public.services (id)
    on delete cascade,

  constraint promotion_rules_dates_order check (ends_at > starts_at)
);

comment on table public.promotion_rules is 'Reservada para automatizaciones de promociones avanzadas en fases futuras. No utilizada activamente en el MVP.';

create index if not exists idx_promotion_rules_service on public.promotion_rules (service_id);
-- ============================================================================
-- BLOQUE 6 / 8 — ROW LEVEL SECURITY (RLS) Y POLÍTICAS
-- ============================================================================
-- Principio (TDD-207 / TDD-208): RLS habilitado en TODAS las tablas.
-- Lectura pública limitada a contenido PUBLIC/visible. Escritura y lectura
-- de contenido sensible restringida a usuarios autenticados con rol válido.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 6.1 FUNCIÓN HELPER: ¿el usuario autenticado actual es administrador?
-- ----------------------------------------------------------------------------
-- Se define como SECURITY DEFINER + STABLE para poder usarse eficientemente
-- dentro de políticas RLS sin recursión y sin penalizar el rendimiento.
-- MVP: cualquier rol válido y activo en user_roles cuenta como "admin"
-- (en el MVP solo existe OWNER, pero la función ya soporta EMPLOYEE/SUPER_ADMIN
-- para cuando se implementen permisos diferenciados).

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.users u on u.id = ur.user_id
    where u.auth_user_id = auth.uid()
      and u.is_active = true
  );
$$;

comment on function public.is_admin() is 'Devuelve true si el usuario autenticado actual tiene al menos un rol administrativo activo.';

create or replace function public.has_role(required_role role_name)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.users u on u.id = ur.user_id
    join public.roles r on r.id = ur.role_id
    where u.auth_user_id = auth.uid()
      and u.is_active = true
      and r.name = required_role
  );
$$;

comment on function public.has_role(role_name) is 'Devuelve true si el usuario autenticado actual posee el rol específico indicado.';

-- ----------------------------------------------------------------------------
-- 6.2 HABILITAR RLS EN TODAS LAS TABLAS
-- ----------------------------------------------------------------------------

alter table public.roles                enable row level security;
alter table public.users                enable row level security;
alter table public.user_roles           enable row level security;
alter table public.categories           enable row level security;
alter table public.services             enable row level security;
alter table public.service_images       enable row level security;
alter table public.specialists          enable row level security;
alter table public.service_specialists  enable row level security;
alter table public.contact_forms        enable row level security;
alter table public.settings             enable row level security;
alter table public.promotion_rules      enable row level security;

-- ----------------------------------------------------------------------------
-- 6.3 POLÍTICAS: roles (privada — solo admin)
-- ----------------------------------------------------------------------------

drop policy if exists "roles_select_admin" on public.roles;
create policy "roles_select_admin"
  on public.roles for select
  using (public.is_admin());

drop policy if exists "roles_write_super_admin" on public.roles;
create policy "roles_write_super_admin"
  on public.roles for all
  using (public.has_role('SUPER_ADMIN'))
  with check (public.has_role('SUPER_ADMIN'));

-- ----------------------------------------------------------------------------
-- 6.4 POLÍTICAS: users (privada — solo admin, y cada usuario ve su propio registro)
-- ----------------------------------------------------------------------------

drop policy if exists "users_select_self_or_admin" on public.users;
create policy "users_select_self_or_admin"
  on public.users for select
  using (auth_user_id = auth.uid() or public.is_admin());

drop policy if exists "users_update_self_or_super_admin" on public.users;
create policy "users_update_self_or_super_admin"
  on public.users for update
  using (auth_user_id = auth.uid() or public.has_role('SUPER_ADMIN'))
  with check (auth_user_id = auth.uid() or public.has_role('SUPER_ADMIN'));

drop policy if exists "users_insert_super_admin" on public.users;
create policy "users_insert_super_admin"
  on public.users for insert
  with check (public.has_role('SUPER_ADMIN'));

drop policy if exists "users_delete_super_admin" on public.users;
create policy "users_delete_super_admin"
  on public.users for delete
  using (public.has_role('SUPER_ADMIN'));

-- ----------------------------------------------------------------------------
-- 6.5 POLÍTICAS: user_roles (privada — solo admin)
-- ----------------------------------------------------------------------------

drop policy if exists "user_roles_select_admin" on public.user_roles;
create policy "user_roles_select_admin"
  on public.user_roles for select
  using (public.is_admin());

drop policy if exists "user_roles_write_super_admin" on public.user_roles;
create policy "user_roles_write_super_admin"
  on public.user_roles for all
  using (public.has_role('SUPER_ADMIN'))
  with check (public.has_role('SUPER_ADMIN'));

-- ----------------------------------------------------------------------------
-- 6.6 POLÍTICAS: categories (lectura pública si activa, escritura admin)
-- ----------------------------------------------------------------------------

drop policy if exists "categories_select_public" on public.categories;
create policy "categories_select_public"
  on public.categories for select
  using (is_active = true or public.is_admin());

drop policy if exists "categories_write_admin" on public.categories;
create policy "categories_write_admin"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.7 POLÍTICAS: services (lectura pública solo PUBLIC, escritura admin)
-- ----------------------------------------------------------------------------

drop policy if exists "services_select_public_or_admin" on public.services;
create policy "services_select_public_or_admin"
  on public.services for select
  using (status = 'PUBLIC' or public.is_admin());

drop policy if exists "services_write_admin" on public.services;
create policy "services_write_admin"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.8 POLÍTICAS: service_images (lectura pública si el servicio es público)
-- ----------------------------------------------------------------------------

drop policy if exists "service_images_select_public_or_admin" on public.service_images;
create policy "service_images_select_public_or_admin"
  on public.service_images for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.services s
      where s.id = service_images.service_id
        and s.status = 'PUBLIC'
    )
  );

drop policy if exists "service_images_write_admin" on public.service_images;
create policy "service_images_write_admin"
  on public.service_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.9 POLÍTICAS: specialists (lectura pública si visible, escritura admin)
-- ----------------------------------------------------------------------------

drop policy if exists "specialists_select_visible_or_admin" on public.specialists;
create policy "specialists_select_visible_or_admin"
  on public.specialists for select
  using (is_visible = true or public.is_admin());

drop policy if exists "specialists_write_admin" on public.specialists;
create policy "specialists_write_admin"
  on public.specialists for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.10 POLÍTICAS: service_specialists (lectura pública condicional)
-- ----------------------------------------------------------------------------

drop policy if exists "service_specialists_select_public_or_admin" on public.service_specialists;
create policy "service_specialists_select_public_or_admin"
  on public.service_specialists for select
  using (
    public.is_admin()
    or (
      exists (select 1 from public.services s where s.id = service_specialists.service_id and s.status = 'PUBLIC')
      and exists (select 1 from public.specialists sp where sp.id = service_specialists.specialist_id and sp.is_visible = true)
    )
  );

drop policy if exists "service_specialists_write_admin" on public.service_specialists;
create policy "service_specialists_write_admin"
  on public.service_specialists for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.11 POLÍTICAS: contact_forms (insert público, lectura/gestión solo admin)
-- ----------------------------------------------------------------------------
-- Cualquier visitante anónimo puede CREAR un formulario (CU-005), pero
-- nadie excepto el admin puede leer, listar o modificar formularios.

drop policy if exists "contact_forms_insert_anyone" on public.contact_forms;
create policy "contact_forms_insert_anyone"
  on public.contact_forms for insert
  with check (true);

drop policy if exists "contact_forms_select_admin" on public.contact_forms;
create policy "contact_forms_select_admin"
  on public.contact_forms for select
  using (public.is_admin());

drop policy if exists "contact_forms_update_admin" on public.contact_forms;
create policy "contact_forms_update_admin"
  on public.contact_forms for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "contact_forms_delete_super_admin" on public.contact_forms;
create policy "contact_forms_delete_super_admin"
  on public.contact_forms for delete
  using (public.has_role('SUPER_ADMIN'));

-- ----------------------------------------------------------------------------
-- 6.12 POLÍTICAS: settings (privada — solo admin)
-- ----------------------------------------------------------------------------
-- NOTA: algunas keys (whatsapp_number, contact_email, social_instagram, etc.)
-- deben ser consumidas por el sitio público. Esto se resuelve sirviéndolas
-- desde el servidor con el cliente de Service Role (nunca expuestas al
-- navegador directamente), por lo que mantener esta tabla 100% privada es
-- la opción más segura y alineada con TDD-208.

drop policy if exists "settings_select_admin" on public.settings;
create policy "settings_select_admin"
  on public.settings for select
  using (public.is_admin());

drop policy if exists "settings_write_admin" on public.settings;
create policy "settings_write_admin"
  on public.settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6.13 POLÍTICAS: promotion_rules (privada — solo admin)
-- ----------------------------------------------------------------------------

drop policy if exists "promotion_rules_select_admin" on public.promotion_rules;
create policy "promotion_rules_select_admin"
  on public.promotion_rules for select
  using (public.is_admin());

drop policy if exists "promotion_rules_write_admin" on public.promotion_rules;
create policy "promotion_rules_write_admin"
  on public.promotion_rules for all
  using (public.is_admin())
  with check (public.is_admin());
-- ============================================================================
-- BLOQUE 7 / 8 — SINCRONIZACIÓN AUTH, STORAGE BUCKETS Y POLÍTICAS DE STORAGE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 7.1 TRIGGER: crear automáticamente un registro en public.users
--      cada vez que se registra un usuario en auth.users (Supabase Auth)
-- ----------------------------------------------------------------------------
-- Esto resuelve la pregunta "no tengo usuario creado aún": cuando crees el
-- primer usuario administrador desde el Dashboard de Supabase (Authentication
-- > Add User), este trigger creará automáticamente su fila en public.users.
-- Luego deberás asignarle el rol OWNER manualmente (ver Bloque 8, sección
-- de instrucciones post-creación).

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (auth_user_id, full_name, email, is_active)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    true
  )
  on conflict (auth_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_auth_user();

-- ----------------------------------------------------------------------------
-- 7.2 STORAGE BUCKETS
-- ----------------------------------------------------------------------------
-- Tres buckets públicos para LECTURA (las imágenes deben verse en el sitio
-- sin autenticación), pero con escritura restringida exclusivamente a
-- administradores autenticados (TDD-222, confirmado por el cliente).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('services',    'services',    true, 15728640, array['image/jpeg','image/jpg','image/png','image/webp']),
  ('specialists', 'specialists', true, 15728640, array['image/jpeg','image/jpg','image/png','image/webp']),
  ('static',      'static',      true, 15728640, array['image/jpeg','image/jpg','image/png','image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- file_size_limit en bytes: 15728640 = 15 MB (RN-306.2 / D-650).

-- ----------------------------------------------------------------------------
-- 7.3 POLÍTICAS DE STORAGE
-- ----------------------------------------------------------------------------
-- Lectura pública (cualquier visitante, incluso anónimo) en los 3 buckets.
-- Escritura (insert/update/delete) restringida a usuarios con is_admin().

drop policy if exists "storage_public_read_services" on storage.objects;
create policy "storage_public_read_services"
  on storage.objects for select
  using (bucket_id = 'services');

drop policy if exists "storage_public_read_specialists" on storage.objects;
create policy "storage_public_read_specialists"
  on storage.objects for select
  using (bucket_id = 'specialists');

drop policy if exists "storage_public_read_static" on storage.objects;
create policy "storage_public_read_static"
  on storage.objects for select
  using (bucket_id = 'static');

drop policy if exists "storage_admin_insert" on storage.objects;
create policy "storage_admin_insert"
  on storage.objects for insert
  with check (
    bucket_id in ('services', 'specialists', 'static')
    and public.is_admin()
  );

drop policy if exists "storage_admin_update" on storage.objects;
create policy "storage_admin_update"
  on storage.objects for update
  using (
    bucket_id in ('services', 'specialists', 'static')
    and public.is_admin()
  );

drop policy if exists "storage_admin_delete" on storage.objects;
create policy "storage_admin_delete"
  on storage.objects for delete
  using (
    bucket_id in ('services', 'specialists', 'static')
    and public.is_admin()
  );
-- ============================================================================
-- BLOQUE 8 / 8 — CRON JOB, SEED DATA Y VERIFICACIÓN
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 8.1 FUNCIÓN: archivar promociones vencidas
-- ----------------------------------------------------------------------------
-- RN-303.5 / RN-310.3: cuando la fecha actual supera promotion_end, el
-- servicio promocional debe archivarse automáticamente.

create or replace function public.archive_expired_promotions()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.services
  set status = 'ARCHIVED'
  where is_promotional = true
    and promotion_end is not null
    and promotion_end < now()
    and status <> 'ARCHIVED';
end;
$$;

comment on function public.archive_expired_promotions() is 'Archiva automáticamente servicios promocionales cuya fecha de finalización ya pasó. Ejecutada por pg_cron diariamente.';

-- ----------------------------------------------------------------------------
-- 8.2 CRON JOB: ejecutar diariamente a la 00:05 (hora servidor, UTC)
-- ----------------------------------------------------------------------------
-- Se elige horario de baja actividad. Ajustable según necesidad del negocio.
-- pg_cron usa expresiones estándar de cron: minuto hora día mes día-semana.

select cron.schedule(
  'archive-expired-promotions',  -- nombre único del job
  '5 0 * * *',                   -- todos los días a las 00:05 UTC
  $$select public.archive_expired_promotions();$$
);

-- Para verificar el job en cualquier momento:
--   select * from cron.job;
-- Para ver el historial de ejecuciones:
--   select * from cron.job_run_details order by start_time desc limit 20;
-- Para eliminarlo si fuera necesario:
--   select cron.unschedule('archive-expired-promotions');

-- ----------------------------------------------------------------------------
-- 8.3 SEED DATA: ROLES
-- ----------------------------------------------------------------------------

insert into public.roles (name, description)
values
  ('OWNER',       'Administrador principal. Acceso completo a todos los módulos del sistema.'),
  ('EMPLOYEE',    'Rol preparado para fases futuras. Acceso parcial/limitado (no implementado en MVP).'),
  ('SUPER_ADMIN', 'Rol preparado para fases futuras. Control total incluyendo gestión de usuarios y configuración global (no implementado en MVP).')
on conflict (name) do nothing;

-- ----------------------------------------------------------------------------
-- 8.4 SEED DATA: CATEGORÍAS
-- ----------------------------------------------------------------------------

insert into public.categories (name, slug, description, is_active)
values
  ('Facial',   'facial',   'Tratamientos estéticos enfocados en el cuidado y rejuvenecimiento facial.', true),
  ('Corporal', 'corporal', 'Tratamientos estéticos corporales orientados al bienestar y la estética integral.', true),
  ('Salud',    'salud',    'Servicios de salud y bienestar, incluyendo quiropraxia y terapias complementarias.', true),
  ('Spa',      'spa',      'Experiencias de spa y relajación premium.', true)
on conflict (name) do nothing;

-- ----------------------------------------------------------------------------
-- 8.5 SEED DATA: SETTINGS (datos reales de contacto suministrados por el cliente)
-- ----------------------------------------------------------------------------
-- Estas claves serán consumidas desde el servidor (Server Components /
-- Server Actions) usando el cliente con Service Role, nunca expuestas
-- directamente al navegador, conforme a la política RLS de settings.

insert into public.settings (key, value)
values
  ('whatsapp_primary',   '"+573113118625"'),
  ('phone_secondary_1',  '"+573143411955"'),
  ('phone_secondary_2',  '"+573135105205"'),
  ('social_instagram',   '"https://www.instagram.com/lagospaesteticasalud"'),
  ('social_facebook',    '"https://www.facebook.com/profile.php?id=61577780604356"'),
  ('business_city',      '"Sogamoso"'),
  ('business_department','"Boyacá"'),
  ('business_country',   '"Colombia"')
on conflict (key) do nothing;

-- NOTA: business_address, business_email y horarios de atención quedaron
-- pendientes de confirmación por el cliente (ver Documento de Alcance,
-- sección 52.1). Agrégalos con un UPDATE/INSERT cuando los tengas, ej:
--
-- insert into public.settings (key, value)
-- values ('business_address', '"Dirección exacta aquí"')
-- on conflict (key) do update set value = excluded.value;

-- ----------------------------------------------------------------------------
-- 8.6 VERIFICACIÓN FINAL (opcional — ejecutar para confirmar que todo existe)
-- ----------------------------------------------------------------------------

do $$
begin
  raise notice '=== VERIFICACIÓN DE INSTALACIÓN ===';
  raise notice 'Roles creados: %', (select count(*) from public.roles);
  raise notice 'Categorías creadas: %', (select count(*) from public.categories);
  raise notice 'Settings creados: %', (select count(*) from public.settings);
  raise notice 'Cron jobs activos: %', (select count(*) from cron.job where jobname = 'archive-expired-promotions');
  raise notice '=== INSTALACIÓN COMPLETA ===';
end$$;

-- ============================================================================
-- PASOS POST-INSTALACIÓN (ejecutar manualmente, una sola vez)
-- ============================================================================
--
-- PASO 1 — Crear tu usuario administrador:
--   Ve a Supabase Dashboard > Authentication > Users > Add User.
--   Crea tu usuario con correo y contraseña reales.
--   Al guardarlo, el trigger trg_on_auth_user_created creará automáticamente
--   su fila correspondiente en public.users.
--
-- PASO 2 — Asignarle el rol OWNER:
--   Ejecuta el siguiente bloque reemplazando el correo por el que usaste:
--
--   insert into public.user_roles (user_id, role_id)
--   select u.id, r.id
--   from public.users u
--   join public.roles r on r.name = 'OWNER'
--   where u.email = 'tu-correo-real@ejemplo.com'
--   on conflict (user_id, role_id) do nothing;
--
-- PASO 3 — Verificar que el rol quedó asignado:
--
--   select u.email, r.name
--   from public.user_roles ur
--   join public.users u on u.id = ur.user_id
--   join public.roles r on r.id = ur.role_id;
--
-- A partir de este momento, ese usuario podrá autenticarse en /admin/login
-- y tendrá acceso completo según las políticas RLS (public.is_admin() = true).
--
-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

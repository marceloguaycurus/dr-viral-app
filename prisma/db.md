Proposta de schema (com RLS) 0) Tipos (ENUM)
-- Tipos básicos
create type role as enum ('owner','admin','editor','viewer');

create type post_status as enum ('generated','scheduled','published');

create type post_type as enum ('post','carousel','story','reel');
-- (mantém simples; a razão 1:1, 1:9, 9:16 pode ir em colunas opcionais)

1. Organizações (empresas) e membros
   -- Empresas que o usuário pode selecionar na sidebar
   create table organizations (
   id uuid primary key default gen_random_uuid(),
   name text not null,
   slug text unique,
   timezone text not null default 'America/Sao_Paulo',
   created_at timestamptz not null default now()
   );

-- Vínculo usuário-empresa + papel
create table organization_members (
org_id uuid not null references organizations(id) on delete cascade,
user_id uuid not null references auth.users(id) on delete cascade,
role role not null default 'editor',
is_active boolean not null default true,
created_at timestamptz not null default now(),
primary key (org_id, user_id)
);

RLS
alter table organizations enable row level security;
alter table organization_members enable row level security;

-- Orgs visíveis apenas para membros
create policy "orgs_select_members"
on organizations for select
using (
exists (
select 1 from organization_members m
where m.org_id = organizations.id
and m.user_id = auth.uid()
and m.is_active
)
);

-- Criar org: qualquer usuário autenticado
create policy "orgs_insert_auth"
on organizations for insert
with check (auth.uid() is not null);

-- Membros: cada usuário vê só seus vínculos
create policy "members_select_self"
on organization_members for select
using (user_id = auth.uid());

-- Gerenciar membros: apenas owner/admin da org
create policy "members_modify_admins"
on organization_members for all
using (
exists (
select 1 from organization_members m
where m.org_id = organization_members.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
)
with check (
exists (
select 1 from organization_members m
where m.org_id = organization_members.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
);

2. Categorias (por empresa)
   create table categories (
   id uuid primary key default gen_random_uuid(),
   org_id uuid not null references organizations(id) on delete cascade,
   name text not null,
   color_hex text, -- opcional
   is_active boolean not null default true,
   created_at timestamptz not null default now(),
   unique (org_id, name)
   );

alter table categories enable row level security;

-- Ler categorias: qualquer membro
create policy "categories_select_members"
on categories for select
using (
exists (
select 1 from organization_members m
where m.org_id = categories.org_id
and m.user_id = auth.uid()
and m.is_active
)
);

-- Criar/editar/apagar: owner/admin
create policy "categories_cud_admins"
on categories for all
using (
exists (
select 1 from organization_members m
where m.org_id = categories.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
)
with check (
exists (
select 1 from organization_members m
where m.org_id = categories.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
);

3. Posts

Regra de negócio mapeada

“Gerados” = status generated

“Agendados” = status scheduled com scheduled_at preenchido

“Publicados” = status published com published_at preenchido

Única marcação por horário: índice único (empresa, scheduled_at) evita overbooking.

create table posts (
id uuid primary key default gen_random_uuid(),
org_id uuid not null references organizations(id) on delete cascade,
created_by uuid not null references auth.users(id) on delete restrict,

type post_type not null, -- post|carousel|story|reel
aspect_ratio text, -- ex: '1:1', '9:16' (opcional)
pages_count int not null default 1 check (pages_count > 0),

category_id uuid references categories(id) on delete set null,

description text, -- "Descreva seu post" do modal
caption text, -- legenda atual
caption_generated boolean not null default false,

status post_status not null default 'generated',
generated_at timestamptz not null default now(),
scheduled_at timestamptz, -- se for para fila
published_at timestamptz, -- quando publicado

auto_publish boolean not null default false, -- “gerou e já vai publicar”
-- opcional: campo livre para metadados do gerador (prompt, seed etc)
meta jsonb not null default '{}'::jsonb
);

-- evita colisão de horários por empresa
create unique index posts_org_sched_unique
on posts (org_id, scheduled_at)
where scheduled_at is not null;

create index posts_org_status_idx on posts (org_id, status);
create index posts_org_sched_idx on posts (org_id, scheduled_at);
create index posts_org_pub_idx on posts (org_id, published_at);

-- Consistência mínima entre status e timestamps
alter table posts add constraint posts_ck_sched_ts
check (status <> 'scheduled' or scheduled_at is not null);

alter table posts add constraint posts_ck_published_ts
check (status <> 'published' or published_at is not null);

RLS
alter table posts enable row level security;

-- Ler posts: qualquer membro da empresa
create policy "posts_select_members"
on posts for select
using (
exists (
select 1 from organization_members m
where m.org_id = posts.org_id
and m.user_id = auth.uid()
and m.is_active
)
);

-- Criar posts: editor+ (inclui owner/admin/editor)
create policy "posts_insert_editors"
on posts for insert
with check (
exists (
select 1 from organization_members m
where m.org_id = posts.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin','editor')
and m.is_active
)
);

-- Atualizar posts: editor+
create policy "posts_update_editors"
on posts for update
using (
exists (
select 1 from organization_members m
where m.org_id = posts.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin','editor')
and m.is_active
)
)
with check (
exists (
select 1 from organization_members m
where m.org_id = posts.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin','editor')
and m.is_active
)
);

-- Deletar posts: admin/owner
create policy "posts_delete_admins"
on posts for delete
using (
exists (
select 1 from organization_members m
where m.org_id = posts.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
);

4. Assets (arte gerada / arquivos)

Suporta 1:N (carrossel). Recomendo usar Supabase Storage (bucket posts) e salvar aqui o storage_path.

create table post_assets (
id uuid primary key default gen_random_uuid(),
post_id uuid not null references posts(id) on delete cascade,
page_index int not null default 1, -- 1..N
storage_path text not null, -- ex: 'orgs/<org>/posts/<post>/<n>.png'
mime_type text,
width int,
height int,
size_bytes bigint,
created_at timestamptz not null default now(),
unique (post_id, page_index)
);

create index post_assets_post_idx on post_assets (post_id);

RLS
alter table post_assets enable row level security;

-- Herdar permissão via post/org
create policy "assets_select_members"
on post_assets for select
using (
exists (
select 1 from posts p
join organization_members m on m.org_id = p.org_id
where p.id = post_assets.post_id
and m.user_id = auth.uid()
and m.is_active
)
);

create policy "assets_cud_editors"
on post_assets for all
using (
exists (
select 1 from posts p
join organization_members m on m.org_id = p.org_id
where p.id = post_assets.post_id
and m.user_id = auth.uid()
and m.role in ('owner','admin','editor')
and m.is_active
)
)
with check (
exists (
select 1 from posts p
join organization_members m on m.org_id = p.org_id
where p.id = post_assets.post_id
and m.user_id = auth.uid()
and m.role in ('owner','admin','editor')
and m.is_active
)
);

Nota sobre Storage: crie um bucket posts e use paths com org_id, ex.:
orgs/{org_id}/posts/{post_id}/{page_index}.png.
Depois, políticas em storage.objects que permitam select/insert/update/delete somente se o usuário for membro da org e o name começar com orgs/{org_id}/. (Se quiser, eu escrevo as policies do Storage também.)

5. (Opcional, mínimo) Templates de slots da agenda

Só se você quiser já deixar a configuração de slots para o botão Agendar → “próximo horário da fila”. A lógica de encontrar o próximo horário pode ficar no app, mas os dados ficam no BD.

create table schedule_slot_templates (
id uuid primary key default gen_random_uuid(),
org_id uuid not null references organizations(id) on delete cascade,
weekday int not null check (weekday between 0 and 6), -- 0=domingo ... 6=sábado
slot_time time not null, -- 10:00, 14:30...
active boolean not null default true,
created_at timestamptz not null default now(),
unique (org_id, weekday, slot_time)
);

alter table schedule_slot_templates enable row level security;

create policy "slots_select_members"
on schedule_slot_templates for select
using (
exists (
select 1 from organization_members m
where m.org_id = schedule_slot_templates.org_id
and m.user_id = auth.uid()
and m.is_active
)
);

create policy "slots_cud_admins"
on schedule_slot_templates for all
using (
exists (
select 1 from organization_members m
where m.org_id = schedule_slot_templates.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
)
with check (
exists (
select 1 from organization_members m
where m.org_id = schedule_slot_templates.org_id
and m.user_id = auth.uid()
and m.role in ('owner','admin')
and m.is_active
)
);

Com isso, o “próximo horário da fila” é:

pegar timezone da empresa; 2) varrer os schedule_slot_templates nos próximos dias; 3) pular horários já tomados por posts.scheduled_at (há índice/unique pra isso).

6. Vistas úteis (opcional) para as 3 abas
   create view v_posts_generated as
   select \* from posts where status = 'generated';

create view v_posts_scheduled as
select \* from posts where status = 'scheduled';

create view v_posts_published as
select \* from posts where status = 'published';
-- (RLS do base table já se aplica)

Por que esse modelo encaixa no seu fluxo

Sidebar por empresas: organizations + organization_members.

Modal “Novo Post”: posts(type, category_id, pages_count, description, caption_generated) + criação dos post_assets.

Modal de resultado (arte + legenda + agendar/baixar): lê post_assets e posts.caption. Se clicar Agendar, só atualiza status='scheduled' e scheduled_at.

Fila/hora seguinte: garantida por unique (org_id, scheduled_at); slots opcionais no schedule_slot_templates.

Calendário: consulta posts.scheduled_at (+ status).

Publicado: só seta published_at e status='published' (migrando da aba Agendados para Publicados automaticamente pelas queries).

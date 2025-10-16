-- Supabase RLS and bootstrap trigger setup
-- Run this in Supabase SQL editor or via CLI after `prisma db push`

-- ===== Enable RLS =====
alter table if exists public."organizations" enable row level security;
alter table if exists public."organization_members" enable row level security;
alter table if exists public."categories" enable row level security;
alter table if exists public."posts" enable row level security;
alter table if exists public."post_assets" enable row level security;
alter table if exists public."schedule_slot_templates" enable row level security;

-- ===== Ensure pgcrypto for gen_random_uuid() (used by dbgenerated defaults) =====
create extension if not exists pgcrypto;

-- ===== Organizations Policies =====
drop policy if exists orgs_select_members on public."organizations";
create policy orgs_select_members
on public."organizations" for select to authenticated
using (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."organizations".id
      and m."userId" = (select auth.uid())
      and m."isActive"
  )
);

drop policy if exists orgs_insert_auth on public."organizations";
create policy orgs_insert_auth
on public."organizations" for insert to authenticated
with check (
  (select auth.uid()) is not null
  and public."organizations"."createdBy" = (select auth.uid())
);

drop policy if exists orgs_update_admins on public."organizations";
create policy orgs_update_admins
on public."organizations" for update to authenticated
using (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."organizations".id
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
)
with check (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."organizations".id
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

-- ===== Organization Members Policies =====
drop policy if exists members_select_self on public."organization_members";
create policy members_select_self
on public."organization_members" for select to authenticated
using (
  "userId" = (select auth.uid())
);

-- Bootstrap insert for creator → owner membership (used by trigger)
drop policy if exists members_insert_owner_bootstrap on public."organization_members";
create policy members_insert_owner_bootstrap
on public."organization_members" for insert to authenticated
with check (
  "userId" = (select auth.uid())
  and role in ('owner')
  and exists (
    select 1 from public."organizations" o
    where o.id = public."organization_members"."orgId"
      and o."createdBy" = (select auth.uid())
  )
);

drop policy if exists members_insert_admins on public."organization_members";
create policy members_insert_admins
on public."organization_members" for insert to authenticated
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."organization_members"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists members_update_admins on public."organization_members";
create policy members_update_admins
on public."organization_members" for update to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."organization_members"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
)
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."organization_members"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists members_delete_admins on public."organization_members";
create policy members_delete_admins
on public."organization_members" for delete to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."organization_members"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

-- ===== Categories Policies =====
drop policy if exists categories_select_members on public."categories";
create policy categories_select_members
on public."categories" for select to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."categories"."orgId"
      and m."userId" = (select auth.uid())
      and m."isActive"
  )
);

drop policy if exists categories_insert_admins on public."categories";
create policy categories_insert_admins
on public."categories" for insert to authenticated
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."categories"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists categories_update_admins on public."categories";
create policy categories_update_admins
on public."categories" for update to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."categories"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
)
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."categories"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists categories_delete_admins on public."categories";
create policy categories_delete_admins
on public."categories" for delete to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."categories"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

-- ===== Posts Policies (soft delete aware) =====
drop policy if exists posts_select_members on public."posts";
create policy posts_select_members
on public."posts" for select to authenticated
using (
  "deletedAt" is null
  and exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."posts"."orgId"
      and m."userId" = (select auth.uid())
      and m."isActive"
  )
);

drop policy if exists posts_insert_editors on public."posts";
create policy posts_insert_editors
on public."posts" for insert to authenticated
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."posts"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
);

drop policy if exists posts_update_editors on public."posts";
create policy posts_update_editors
on public."posts" for update to authenticated
using (
  "deletedAt" is null
  and exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."posts"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
)
with check (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."posts"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
);

drop policy if exists posts_delete_admins on public."posts";
create policy posts_delete_admins
on public."posts" for delete to authenticated
using (
  exists (
    select 1 from public."organization_members" m
    where m."orgId" = public."posts"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

-- ===== Post Assets Policies (soft delete aware) =====
drop policy if exists assets_select_members on public."post_assets";
create policy assets_select_members
on public."post_assets" for select to authenticated
using (
  "deletedAt" is null
  and exists (
    select 1
    from public."posts" p
    join public."organization_members" m on m."orgId" = p."orgId"
    where p.id = public."post_assets"."postId"
      and p."deletedAt" is null
      and m."userId" = (select auth.uid())
      and m."isActive"
  )
);

drop policy if exists assets_insert_editors on public."post_assets";
create policy assets_insert_editors
on public."post_assets" for insert to authenticated
with check (
  ("deletedAt" is null)
  and exists (
    select 1
    from public."posts" p
    join public."organization_members" m on m."orgId" = p."orgId"
    where p.id = public."post_assets"."postId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
);

drop policy if exists assets_update_editors on public."post_assets";
create policy assets_update_editors
on public."post_assets" for update to authenticated
using (
  "deletedAt" is null
  and exists (
    select 1
    from public."posts" p
    join public."organization_members" m on m."orgId" = p."orgId"
    where p.id = public."post_assets"."postId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
)
with check (
  ("deletedAt" is null)
  and exists (
    select 1
    from public."posts" p
    join public."organization_members" m on m."orgId" = p."orgId"
    where p.id = public."post_assets"."postId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
);

drop policy if exists assets_delete_editors on public."post_assets";
create policy assets_delete_editors
on public."post_assets" for delete to authenticated
using (
  "deletedAt" is null
  and exists (
    select 1
    from public."posts" p
    join public."organization_members" m on m."orgId" = p."orgId"
    where p.id = public."post_assets"."postId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin','editor')
      and m."isActive"
  )
);

-- ===== Schedule Slot Templates Policies =====
drop policy if exists slots_select_members on public."schedule_slot_templates";
create policy slots_select_members
on public."schedule_slot_templates" for select to authenticated
using (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."schedule_slot_templates"."orgId"
      and m."userId" = (select auth.uid())
      and m."isActive"
  )
);

drop policy if exists slots_insert_admins on public."schedule_slot_templates";
create policy slots_insert_admins
on public."schedule_slot_templates" for insert to authenticated
with check (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."schedule_slot_templates"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists slots_update_admins on public."schedule_slot_templates";
create policy slots_update_admins
on public."schedule_slot_templates" for update to authenticated
using (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."schedule_slot_templates"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
)
with check (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."schedule_slot_templates"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

drop policy if exists slots_delete_admins on public."schedule_slot_templates";
create policy slots_delete_admins
on public."schedule_slot_templates" for delete to authenticated
using (
  exists (
    select 1
    from public."organization_members" m
    where m."orgId" = public."schedule_slot_templates"."orgId"
      and m."userId" = (select auth.uid())
      and m.role in ('owner','admin')
      and m."isActive"
  )
);

-- ===== Bootstrap trigger: on org insert, auto-create owner membership =====
create or replace function public.fn_org_insert_owner_membership()
returns trigger
language plpgsql
security invoker -- RLS applies using caller; policy members_insert_owner_bootstrap allows it
set search_path = public, pg_temp
as $$
begin
  insert into public."organization_members"("orgId","userId","role","isActive")
  values (new.id, new."createdBy", 'owner', true)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists tr_org_owner_after_insert on public."organizations";
create trigger tr_org_owner_after_insert
after insert on public."organizations"
for each row
execute function public.fn_org_insert_owner_membership();


-- Optional utility for updatedAt triggers with safe search_path
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$;


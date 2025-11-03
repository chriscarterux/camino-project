-- Lead capture table for marketing site
-- Stores email signups before user conversion

create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  email varchar(255) unique not null,
  name varchar(255),
  primary_interest varchar(50) check (primary_interest in ('identity', 'worldview', 'relationships')),
  source varchar(100) not null check (source in ('homepage', 'how-it-works', 'pricing', 'footer', 'exit-intent')),
  converted_to_user boolean not null default false,
  converted_user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for performance
create index leads_email_idx on public.leads(email);
create index leads_source_idx on public.leads(source);
create index leads_created_at_idx on public.leads(created_at desc);
create index leads_converted_idx on public.leads(converted_to_user);

-- Add updated_at trigger
create trigger handle_updated_at before update on public.leads
  for each row execute procedure public.handle_updated_at();

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Allow public/anonymous users to submit leads via forms
create policy "Allow public lead creation"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Allow public users to read their own leads (after signup)
create policy "Users can view their own leads"
  on public.leads for select
  using (auth.uid() = converted_user_id or converted_user_id is null);

-- Admin-only policies (service role)
-- In production, add specific admin role policies
create policy "Service role can view all leads"
  on public.leads for select
  using (auth.role() = 'service_role');

create policy "Service role can insert leads"
  on public.leads for insert
  with check (auth.role() = 'service_role');

create policy "Service role can update leads"
  on public.leads for update
  using (auth.role() = 'service_role');

-- Lead analytics view (for dashboards)
create or replace view public.lead_stats as
select
  date_trunc('day', created_at) as date,
  source,
  count(*) as lead_count,
  count(*) filter (where converted_to_user = true) as converted_count,
  round(
    100.0 * count(*) filter (where converted_to_user = true) / nullif(count(*), 0),
    2
  ) as conversion_rate
from public.leads
group by date_trunc('day', created_at), source
order by date desc;

-- Grant access to view
grant select on public.lead_stats to service_role;

-- Comment for documentation
comment on table public.leads is 'Stores email captures from marketing site before user signup';
comment on column public.leads.email is 'User email address (normalized to lowercase)';
comment on column public.leads.name is 'Optional user name';
comment on column public.leads.primary_interest is 'User selected interest area';
comment on column public.leads.source is 'Page/location where lead was captured';
comment on column public.leads.converted_to_user is 'Whether lead converted to registered user';
comment on column public.leads.converted_user_id is 'Reference to auth.users if converted';

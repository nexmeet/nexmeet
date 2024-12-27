create table
  public.profiles (
    id uuid not null,
    email text not null,
    fullname text null,
    username text generated always as (
      lower(
        regexp_replace(
          split_part(email, '@'::text, 1),
          '[^a-zA-Z0-9]'::text,
          ''::text
        )
      )
    ) stored null,
    gender text null,
    profile_tagline text null,
    location text null,
    profile_img text null,
    social_link text null,
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
    constraint profiles_gender_check check (
      (
        gender = any (
          array[
            'male'::text,
            'female'::text,
            'other'::text,
            'prefer not to say'::text
          ]
        )
      )
    ),
    constraint username_length check ((char_length(username) >= 3))
  ) tablespace pg_default;

create trigger update_profiles_updated_at before
update on profiles for each row
execute function update_profiles_updated_at ();
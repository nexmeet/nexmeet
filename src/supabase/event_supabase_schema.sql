-- Core event table
CREATE TABLE public.events (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_title TEXT NOT NULL,
    event_description TEXT NOT NULL,
    event_duration BIGINT NOT NULL,
    event_startdate TIMESTAMP WITH TIME ZONE NOT NULL,
    event_enddate TIMESTAMP WITH TIME ZONE NOT NULL,
    team_size SMALLINT NOT NULL DEFAULT '1'::SMALLINT,
    is_free BOOLEAN NOT NULL,
    event_amount BIGINT NULL,
    event_likes BIGINT NULL DEFAULT '0'::BIGINT,
    is_approved BOOLEAN NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT (now() AT TIME ZONE 'utc'::TEXT),
    CONSTRAINT events_pkey PRIMARY KEY (id),
    CONSTRAINT events_title_unique UNIQUE (event_title)
);

-- Event location table
CREATE TABLE public.event_locations (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    location_name TEXT NOT NULL,
    CONSTRAINT event_locations_pkey PRIMARY KEY (id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id)
);

-- Event registration period
CREATE TABLE public.event_registration_periods (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT event_registration_periods_pkey PRIMARY KEY (id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id)
);

-- Organizer table
CREATE TABLE public.organizers (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    contact BIGINT NOT NULL,
    CONSTRAINT organizers_pkey PRIMARY KEY (id),
    CONSTRAINT organizers_email_unique UNIQUE (email)
);

-- Event organizer mapping (allows multiple organizers per event)
CREATE TABLE public.event_organizers (
    event_id UUID NOT NULL,
    organizer_id UUID NOT NULL,
    CONSTRAINT event_organizers_pkey PRIMARY KEY (event_id, organizer_id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id),
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id) REFERENCES public.organizers(id)
);

-- Categories table
CREATE TABLE public.event_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    category_name TEXT NOT NULL,
    CONSTRAINT event_categories_pkey PRIMARY KEY (id),
    CONSTRAINT category_name_unique UNIQUE (category_name)
);

-- Event category mapping
CREATE TABLE public.event_category_mappings (
    event_id UUID NOT NULL,
    category_id UUID NOT NULL,
    CONSTRAINT event_category_mappings_pkey PRIMARY KEY (event_id, category_id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.event_categories(id)
);

-- Tags table
CREATE TABLE public.tags (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    tag_name TEXT NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id),
    CONSTRAINT tag_name_unique UNIQUE (tag_name)
);

-- Event tags mapping
CREATE TABLE public.event_tags (
    event_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    CONSTRAINT event_tags_pkey PRIMARY KEY (event_id, tag_id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id),
    CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES public.tags(id)
);

-- Payment information
CREATE TABLE public.payment_details (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    account_holder_name TEXT NOT NULL,
    upi_id TEXT NOT NULL,
    CONSTRAINT payment_details_pkey PRIMARY KEY (id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id)
);

-- Social links table
CREATE TABLE public.event_social_links (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    link_url TEXT NOT NULL,
    platform_name TEXT NOT NULL,
    CONSTRAINT event_social_links_pkey PRIMARY KEY (id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(id)
);

CREATE INDEX idx_events_startdate ON public.events(event_startdate);
CREATE INDEX idx_events_enddate ON public.events(event_enddate);
CREATE INDEX idx_events_is_approved ON public.events(is_approved);

-- Date validation
ALTER TABLE public.events 
ADD CONSTRAINT check_dates 
CHECK (event_startdate <= event_enddate);

ALTER TABLE public.event_registration_periods 
ADD CONSTRAINT check_registration_dates 
CHECK (start_date <= end_date);

-- Email format validation
ALTER TABLE public.organizers 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
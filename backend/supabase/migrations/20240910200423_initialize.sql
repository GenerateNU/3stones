BEGIN;

-- Allows us to use gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- not a 'real' table - just for learning/dev purposes
CREATE TABLE contributors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL
);

CREATE TABLE investors (
    supabase_id uuid PRIMARY KEY, -- Uses investor uuid provided by Supabase
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    first_name varchar(256) NOT NULL,
    last_name varchar(256) NOT NULL
);

CREATE TABLE developers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name varchar(256) NOT NULL,
    description text NOT NULL,
    location text NOT NULL
);

CREATE TABLE projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    developer_id uuid REFERENCES developers ON DELETE RESTRICT,
    title varchar(256) NOT NULL,
    description text NOT NULL DEFAULT '',
    location text NOT NULL,
    completed boolean NOT NULL DEFAULT FALSE,
    funding_goal_cents bigint NOT NULL -- Total funding is in cents - 1234 = $12.34
);

CREATE TABLE investor_investments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects ON DELETE RESTRICT,
    investor_id uuid REFERENCES investors ON DELETE RESTRICT,
    funded_cents bigint NOT NULL -- Total funding is in cents - 1234 
);

CREATE TABLE project_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects ON DELETE CASCADE,
    title varchar(256) NOT NULL,
    description text NOT NULL
);

-- TODO: revamp this to milestones, need to consult with michael s. on this though. Keeping this
-- table, just commented out, to remind us of project progress updates as a feature.
-- CREATE TABLE project_progress_updates (
--     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--     created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     project_id uuid REFERENCES projects on DELETE CASCADE,
--     progress int NOT NULL CHECK (progress >= 0 AND progress <= 100) -- 0-100 integer value
-- );

CREATE TABLE project_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects on DELETE CASCADE,
    image_url text NOT NULL  
);

CREATE TABLE project_post_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    post_id uuid REFERENCES project_posts ON DELETE CASCADE,
    image_url text NOT NULL
);

COMMIT;

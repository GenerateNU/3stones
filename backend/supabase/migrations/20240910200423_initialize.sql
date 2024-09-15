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

CREATE TABLE users (
    supabase_id uuid PRIMARY KEY, -- Uses user uuid provided by Supabase
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
    total_shares int NOT NULL,
    price_per_share_cents bigint NOT NULL -- Price/Share is USD cents - 1234 = $12.34 
);

CREATE TABLE user_shares (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects ON DELETE RESTRICT,
    user_id uuid REFERENCES users ON DELETE RESTRICT,
    shares int NOT NULL -- TODO: constraint stuff 
);

CREATE TABLE project_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects ON DELETE CASCADE,
    title varchar(256) NOT NULL,
    description text NOT NULL
);

CREATE TABLE project_progress_updates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id uuid REFERENCES projects on DELETE CASCADE,
    progress int NOT NULL CHECK (progress >= 0 AND progress <= 100) -- 0-100 integer value
);

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
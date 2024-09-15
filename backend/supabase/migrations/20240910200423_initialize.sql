-- Allows us to use gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- not a 'real' table - just for learning/dev purposes
CREATE TABLE contributors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    supabase_id uuid PRIMARY KEY, -- Use user uuid provided by Supabase
    first_name varchar(256) NOT NULL,
    last_name varchar(256) NOT NULL,
);

CREATE TABLE projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id uuid REFERENCES developers ON DELETE RESTRICT,
    title varchar(256) NOT NULL,
    description text NOT NULL DEFAULT '',
    -- location: TODO I gotta figure out this step
    total_shares int NOT NULL,
    price_per_share_cents bigint NOT NULL, -- Price/Share is USD cents - 1234 = $12.34 
);

CREATE TABLE developers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(256) NOT NULL,
    description TEXT NOT NULL,
    -- location: TODO I gotta figure out this step
);

CREATE TABLE user_shares (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES projects ON DELETE RESTRICT,
    user_id uuid REFERENCES users ON DELETE RESTRICT,
    shares int NOT NULL, -- TODO: constraint stuff 
);

CREATE TABLE project_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES projects ON DELETE CASCADE,
    title varchar(256) NOT NULL,
    description text NOT NULL,
);

CREATE TABLE project_progress_updates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES projects on DELETE CASCADE,
    progress int NOT NULL CHECK (progress >= 0 AND progress <= 100) -- 0-100 integer value
);

CREATE TABLE project_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES projects on DELETE CASCADE,
    image_url text NOT NULL,  
);

CREATE TABLE project_post_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES project_posts ON DELETE CASCADE,
    image_url text NOT NULL,
);
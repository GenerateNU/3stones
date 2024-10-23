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

-- enum of US state codes (for addresses)
CREATE TYPE us_state as ENUM (
    'DC', -- District of Columbia
    'AL', -- Alabama
    'AK', -- Alaska
    'AZ', -- Arizona
    'AR', -- Arkansas
    'CA', -- California
    'CO', -- Colorado
    'CT', -- Connecticut
    'DE', -- Delaware
    'FL', -- Florida
    'GA', -- Georgia
    'HI', -- Hawaii
    'ID', -- Idaho
    'IL', -- Illinois
    'IN', -- Indiana
    'IA', -- Iowa
    'KS', -- Kansas
    'KY', -- Kentucky
    'LA', -- Louisiana
    'ME', -- Maine
    'MD', -- Maryland
    'MA', -- Massachusetts
    'MI', -- Michigan
    'MN', -- Minnesota
    'MS', -- Mississippi
    'MO', -- Missouri
    'MT', -- Montana
    'NE', -- Nebraska
    'NV', -- Nevada
    'NH', -- New Hampshire
    'NJ', -- New Jersey
    'NM', -- New Mexico
    'NY', -- New York
    'NC', -- North Carolina
    'ND', -- North Dakota
    'OH', -- Ohio
    'OK', -- Oklahoma
    'OR', -- Oregon
    'PA', -- Pennsylvania
    'RI', -- Rhode Island
    'SC', -- South Carolina
    'SD', -- South Dakota
    'TN', -- Tennessee
    'TX', -- Texas
    'UT', -- Utah
    'VT', -- Vermont
    'VA', -- Virginia
    'WA', -- Washington
    'WV', -- West Virginia
    'WI', -- Wisconsin
    'WY'  -- Wyoming
);

CREATE TABLE investors (
    supabase_id uuid PRIMARY KEY, -- Uses investor uuid provided by Supabase
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    first_name varchar(256) NOT NULL,
    last_name varchar(256) NOT NULL,
    access_token varchar(256),
    item_id varchar(256)
);

CREATE TABLE developers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name varchar(256) NOT NULL,
    description text NOT NULL,
    premise varchar(10) NOT NULL,
    subpremise varchar(10),
    street varchar(256) NOT NULL,
    locality varchar(256) NOT NULL,
    state us_state NOT NULL,
    zipcode varchar(10) NOT NULL
);

CREATE TABLE projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    developer_id uuid REFERENCES developers ON DELETE RESTRICT,
    title varchar(256) NOT NULL,
    description text NOT NULL DEFAULT '',
    completed boolean NOT NULL DEFAULT FALSE,
    funding_goal_cents bigint NOT NULL, -- Total funding is in cents - 1234 = $12.34
    milestone varchar(256) NOT NULL, -- Very basic but I think this is OK for MVP
    premise varchar(10) NOT NULL,
    subpremise varchar(10),
    street varchar(256) NOT NULL,
    locality varchar(256) NOT NULL,
    state us_state NOT NULL,
    zipcode varchar(10) NOT NULL
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

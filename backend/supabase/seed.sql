-- SQLBook: Code
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id :: text, email) :: jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

-- test investor data matching auth users
INSERT INTO
    investors (
        supabase_id,
        first_name,
        last_name,
        email,
        phone_number,
        ssn,
        premise,
        subpremise,
        street,
        locality,
        state,
        zipcode,
        profile_picture_url,
        cash_balance_cents
    ) (
        select
            id,
            'Test',
            'User' || (ROW_NUMBER() OVER ()),
            email,
            '555-555-5555',
            '123-45-6789',
            '123',
            null,
            'Main St',
            'Boston',
            'MA',
            '02115',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=' || (ROW_NUMBER() OVER ()),
            2000000
        from
            auth.users
    );

-- SQLBook: Code
INSERT INTO contributors (first_name, last_name, email) VALUES ('Michael', 'Brennan', 'brennan.mic@northeastern.edu');
INSERT INTO contributors (first_name, last_name, email) VALUES ('Ryan', 'Saperstein', 'saperstein.r@northeastern.edu');

INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('f9ad1bd6-8b5a-41e0-aacf-56fe3cde2e2a', 'Capital Construction', 'Design, build, and lead construction projects', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('c2128c81-e4db-4695-8be7-089f12d5ea46', 'Developer 1', 'Developer 1 description', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Arav', 'Developer for Generate', '7', 'Speare Pl', 'Boston', 'MA', '02115');

INSERT INTO projects (
    id, 
    developer_id, 
    title, 
    description, 
    completed, 
    completion_date, 
    funding_goal_cents, 
    milestone, 
    premise, 
    street, 
    locality, 
    state, 
    zipcode, 
    coordinates) 
    VALUES (
    'c3733692-5a86-441f-8ad0-9c32c648bb72', 
    '56ebee48-d844-4fcd-aa58-fb71688c3e81', 
    '15 Necco', 
    'In partnership with Alexandria Real Estate Equities, National Development developed a 360,000 SF life science building in Boston''s Fort Point neighborhood. The office/lab portion of the building is fully leased to pharmaceutical giant Eli Lilly and Co. as its Lilly Institute for Genetic Medicine. The waterfront property, which overlooks Fort Point Channel and the Harborwalk, features a tenant-exclusive rooftop terrace, a publicly accessible lobby and street-level restaurant space, and state-of-the-art resiliency and sustainability features. The life science building is targeting LEED Gold Core & Shell, Fitwel Life Science and WiredScore Platinum certifications by using on-site renewable geothermal energy and solar energy.', 
    'FALSE', 
    '06-01-2027', 
    '1000000000', 
    'Land Control Secured', 
    '15', 
    'Necco St', 
    'Boston', 
    'MA', 
    '02210',  ST_GeogFromText('SRID=4326;POINT(42.34912699571892 -71.05143594417615)'));

INSERT INTO project_images (project_id, image_url) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', 'https://natdev.com/wp-content/uploads/2024/08/15-Necco-1.jpg');
INSERT INTO project_images (project_id, image_url) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', 'https://natdev.com/wp-content/uploads/2020/02/2021_12_13_15_Necco_Channel-1-scaled.jpg');
INSERT INTO project_images (project_id, image_url) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', 'https://natdev.com/wp-content/uploads/2020/02/2021_12_13_15_Necco_Harborwalk-scaled.jpg');
INSERT INTO project_images (project_id, image_url) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', 'https://natdev.com/wp-content/uploads/2020/02/15-Necco-sustainability-graphic.jpg');

INSERT INTO projects (
    id, 
    developer_id, 
    title, 
    description, 
    completed, 
    completion_date, 
    funding_goal_cents, 
    milestone, 
    premise, 
    street, 
    locality, 
    state, 
    zipcode, 
    coordinates) 
    VALUES (
    'a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 
    '56ebee48-d844-4fcd-aa58-fb71688c3e81', 
    'FORUM', 
    'Inspired by the athletic excellence of our neighbors, FORUM will propel Boston''s boundary-pushing life science firms. FORUM is a home for ambitious, driven teams. Class-leading labs. A vibrant art and events gallery. Flexible, comfortable community gathering spaces. All in an exciting, colorful neighborhood.', 
    'FALSE', 
    '12-01-2027', 
    '2000000000', 
    'Land Control Secured', 
    '60', 
    'Guess St', 
    'Boston', 
    'MA', 
    '02135',  ST_GeogFromText('SRID=4326;POINT(42.35699783009139 -71.14611329665908)'));

INSERT INTO project_images (project_id, image_url) VALUES ('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 'https://media.sga-arch.com/wp-content/uploads/2023/06/2022-0128-60-Guest-View-from-Mass-Pike-scaled.jpg?strip=all&lossy=1&ssl=1');
INSERT INTO project_images (project_id, image_url) VALUES ('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 'https://www.forumbostonlanding.com/globalassets/us/forum-boston/images/access-map_revised-2048x1650.jpg?width=300&height=400&upscale=false&mode=max&quality=80');
INSERT INTO project_images (project_id, image_url) VALUES ('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 'https://www.forumbostonlanding.com/globalassets/us/forum-boston/images/rectangle-154.jpg?width=300&height=400&upscale=false&mode=max&quality=80');
INSERT INTO project_images (project_id, image_url) VALUES ('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 'https://natdev.com/wp-content/uploads/2020/02/15-Necco-sustainability-graphic.jpg');

INSERT INTO projects (
    id, 
    developer_id, 
    title, 
    description, 
    completed, 
    completion_date, 
    funding_goal_cents, 
    milestone, 
    premise, 
    street, 
    locality, 
    state, 
    zipcode, 
    coordinates) 
    VALUES (
    '0fec9ee5-e10a-4120-9cf1-c954e69fee25', 
    '56ebee48-d844-4fcd-aa58-fb71688c3e81', 
    '74M', 
    'Welcome to a new era in life science, where our focus isn''t simply on scientific advancements, but also on the scientists who discover them. That''s why we incorporate cutting-edge design, services and amenities that revitalize bodies and refresh minds — a true breakthrough in life science development. Located in the vibrant Somerville cluster, 74M is the next life science development centered in this emerging innovation community. Adjacent to the MBTA Orange Line and I-93, 74M offers easy accessibility and unparalleled visibility. The development creates connectivity between the highly amenitized Assembly Square and the authentic cafes and restaurants of East Somerville; 74M''s proximity to highly educated labor and unique talent, along with its walkability and bicycle access, provides an ideal destination for today''s innovators.',
    'FALSE', 
    '12-01-2025', 
    '1000000000', 
    'Land Control Secured', 
    '74', 
    'Middlesex Ave', 
    'Somerville', 
    'MA', 
    '02145',  ST_GeogFromText('SRID=4326;POINT(42.39320834175978 -71.08342695767045)'));

INSERT INTO project_images (project_id, image_url) VALUES ('0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'https://cdn.sanity.io/images/2wfu4oov/production/0db2fe3c40711f344a1c5cdc32988b2a33b7591e-990x1044.png?w=768&h=810&q=100&auto=format');
INSERT INTO project_images (project_id, image_url) VALUES ('0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'https://cdn.sanity.io/images/2wfu4oov/production/f43123c6975c5b6a5aa1213a18e1912772535b41-990x653.png?w=990&q=100&auto=format');
INSERT INTO project_images (project_id, image_url) VALUES ('0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'https://cdn.sanity.io/images/2wfu4oov/production/2739e36dc665d318d19c170652ea93dbf629029c-990x653.png?w=990&q=100&auto=format');
INSERT INTO project_images (project_id, image_url) VALUES ('0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'https://cdn.sanity.io/images/2wfu4oov/production/3c2db8e6b5b98ef5cd3f9775bf12b17b03ff177f-1340x792.png?w=1024&h=605&q=100&auto=format');

-- Investments for the 60 Guest St project (a9daf2f3-67c5-4f34-8c7c-0b4079a90c91)
INSERT INTO investor_investments (project_id, investor_id, funded_cents) VALUES 
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user1@example.com'), 250000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user2@example.com'), 175000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user3@example.com'), 325000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user4@example.com'), 425000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user5@example.com'), 150000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user6@example.com'), 275000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user7@example.com'), 190000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user8@example.com'), 225000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user9@example.com'), 310000),
('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', (SELECT id FROM auth.users WHERE email='user10@example.com'), 280000);

-- Investments for the 74M project (0fec9ee5-e10a-4120-9cf1-c954e69fee25)
INSERT INTO investor_investments (project_id, investor_id, funded_cents) VALUES 
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user1@example.com'), 150000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user2@example.com'), 450000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user3@example.com'), 275000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user4@example.com'), 180000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user5@example.com'), 320000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user6@example.com'), 195000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user7@example.com'), 260000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user8@example.com'), 340000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user9@example.com'), 225000),
('0fec9ee5-e10a-4120-9cf1-c954e69fee25', (SELECT id FROM auth.users WHERE email='user10@example.com'), 170000);

-- Investments for the previous project (c3733692-5a86-441f-8ad0-9c32c648bb72)
INSERT INTO investor_investments (project_id, investor_id, funded_cents) VALUES 
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user1@example.com'), 200000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user2@example.com'), 350000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user3@example.com'), 125000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user4@example.com'), 290000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user5@example.com'), 175000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user6@example.com'), 230000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user7@example.com'), 310000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user8@example.com'), 165000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user9@example.com'), 280000),
('c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user10@example.com'), 195000);

INSERT INTO project_posts (id, created_at, project_id, title, description) VALUES ('0a880294-a917-4480-9865-f3a5d8ccc54d', '2024-9-03 00:10:18.08853+00', 'c3733692-5a86-441f-8ad0-9c32c648bb72', 'We have added a moat', 'The castle is now surrounded by a moat to keep intruders out');
INSERT INTO project_posts (id, created_at, project_id, title, description) VALUES ('93c9ec99-aef7-4f9b-ab60-8354c5c7119b', '2024-10-04 00:56:18.08853+00', '0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'Antimold technology installed', 'Spongebob will no longer be at risk of living in a mouldy pineapple');
INSERT INTO project_posts (id, created_at, project_id, title, description) VALUES ('2e840679-d9c4-4044-9f82-b262ace78bf3', '2024-10-03 00:56:18.08853+00', '0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'Mold Discovered', 'Unfortunately we have discovered mold growing on spongebobs pineapple');
INSERT INTO project_posts (id, created_at, project_id, title, description) VALUES ('ade2d04f-b304-471c-ac1f-b3a0887b3319', '2024-9-03 00:14:18.08853+00', '0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'Pinapple in Place', 'We have placed the pineapple under the sea - waiting to start carving it into a home');
INSERT INTO project_posts (id, created_at, project_id, title, description) VALUES ('d9a81e16-05d1-4248-a047-5870f6c34755', '2024-8-03 00:14:18.08853+00', '0fec9ee5-e10a-4120-9cf1-c954e69fee25', 'Aquiring a Pineapple', 'It has been tricky trying to find a pineapple large enough to turn into a house');

INSERT INTO project_post_images (post_id, image_url) VALUES ('0a880294-a917-4480-9865-f3a5d8ccc54d', 'https://cdn2.thecatapi.com/images/MTk3OTMzMg.jpg');
INSERT INTO project_post_images (post_id, image_url) VALUES ('93c9ec99-aef7-4f9b-ab60-8354c5c7119b', 'https://cdn2.thecatapi.com/images/MTk3OTMzMg.jpg');
INSERT INTO project_post_images (post_id, image_url) VALUES ('2e840679-d9c4-4044-9f82-b262ace78bf3', 'https://cdn2.thecatapi.com/images/MTk3OTMzMg.jpg');
INSERT INTO project_post_images (post_id, image_url) VALUES ('ade2d04f-b304-471c-ac1f-b3a0887b3319', 'https://cdn2.thecatapi.com/images/MTk3OTMzMg.jpg');
INSERT INTO project_post_images (post_id, image_url) VALUES ('d9a81e16-05d1-4248-a047-5870f6c34755', 'https://cdn2.thecatapi.com/images/MTk3OTMzMg.jpg');


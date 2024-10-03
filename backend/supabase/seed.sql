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

-- SQLBook: Code
INSERT INTO contributors (first_name, last_name, email) VALUES ('Michael', 'Brennan', 'brennan.mic@northeastern.edu');
INSERT INTO contributors (first_name, last_name, email) VALUES ('Ryan', 'Saperstein', 'saperstein.r@northeastern.edu');

INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('f9ad1bd6-8b5a-41e0-aacf-56fe3cde2e2a', 'Capital Construction', 'Design, build, and lead construction projects', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('c2128c81-e4db-4695-8be7-089f12d5ea46', 'Developer 1', 'Developer 1 description', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Arav', 'Developer for Generate', '7', 'Speare Pl', 'Boston', 'MA', '02115');

INSERT INTO projects (id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Bowser Castle', 'A big fiery castle sitting on prime real estate', 'FALSE', '100000000', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO projects (id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode) VALUES ('d09c8f0f-13d3-4336-92e9-b0b2c8bce570', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Spongebob Pineapple', 'A pineapple under the sea', 'TRUE', '18000000', '7', 'Speare Pl', 'Boston', 'MA', '02115');

INSERT INTO investors (supabase_id, first_name, last_name) VALUES ((SELECT id from auth.users where email='user1@example.com'), 'Dwight', 'Howard');
INSERT INTO investors (supabase_id, first_name, last_name) VALUES ((SELECT id from auth.users where email='user2@example.com'), 'Taj', 'Gibson');


INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('bdd66406-64bd-41a5-b797-a486751ea429', 'c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user1@example.com'), '1200');
INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('ba995313-1b8a-4b4e-ad02-0b72efd22309', 'c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user1@example.com'), '400');
INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('de194a16-c0be-4519-bf6a-9a3bceea1b42', 'c3733692-5a86-441f-8ad0-9c32c648bb72', (SELECT id FROM auth.users WHERE email='user1@example.com'), '800');

INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('a9daf2f3-67c5-4f34-8c7c-0b4079a90c91', 'd09c8f0f-13d3-4336-92e9-b0b2c8bce570', (SELECT id FROM auth.users WHERE email='user1@example.com'), '1200');
INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('00ae74b8-dac2-47cd-8c79-eb543e0c0b41', 'd09c8f0f-13d3-4336-92e9-b0b2c8bce570', (SELECT id FROM auth.users WHERE email='user1@example.com'), '100');

INSERT INTO investor_investments (id, project_id, investor_id, funded_cents) VALUES ('874c693a-fefb-4a6f-8988-a85cfadb8fe2', 'd09c8f0f-13d3-4336-92e9-b0b2c8bce570', (SELECT id FROM auth.users WHERE email='user2@example.com'), '2000');


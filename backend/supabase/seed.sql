-- SQLBook: Code
INSERT INTO contributors (first_name, last_name, email) VALUES ('Michael', 'Brennan', 'brennan.mic@northeastern.edu');
INSERT INTO contributors (first_name, last_name, email) VALUES ('Ryan', 'Saperstein', 'saperstein.r@northeastern.edu');

INSERT INTO developers (name, description, location) VALUES ('f9ad1bd6-8b5a-41e0-aacf-56fe3cde2e2a', 'Capital Construction', 'Design, build, and lead construction projects', 'Boston')
INSERT INTO developers (name, description, location) VALUES ('c2128c81-e4db-4695-8be7-089f12d5ea46', 'Developer 1', 'Developer 1 description', 'Developer 1 location');
INSERT INTO developers (id, name, description, location) VALUES ('56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Arav', 'Developer for Generate', 'Boston, MA');

INSERT INTO projects (id, developer_id, title, description, location, completed, funding_goal_cents) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Bowser Castle', 'A big fiery castle sitting on prime real estate', 'The Valley of Bowser', 'FALSE', '100000000');
INSERT INTO projects (id, developer_id, title, description, location, completed, funding_goal_cents) VALUES ('d09c8f0f-13d3-4336-92e9-b0b2c8bce570', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Spongebob Pineapple', 'A pineapple under the sea', '124 Conch St', 'TRUE', '18000000');

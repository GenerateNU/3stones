-- SQLBook: Code
INSERT INTO contributors (first_name, last_name, email) VALUES ('Michael', 'Brennan', 'brennan.mic@northeastern.edu');
INSERT INTO contributors (first_name, last_name, email) VALUES ('Ryan', 'Saperstein', 'saperstein.r@northeastern.edu');

INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('f9ad1bd6-8b5a-41e0-aacf-56fe3cde2e2a', 'Capital Construction', 'Design, build, and lead construction projects', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('c2128c81-e4db-4695-8be7-089f12d5ea46', 'Developer 1', 'Developer 1 description', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO developers (id, name, description, premise, street, locality, state, zipcode) VALUES ('56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Arav', 'Developer for Generate', '7', 'Speare Pl', 'Boston', 'MA', '02115');

INSERT INTO projects (id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode) VALUES ('c3733692-5a86-441f-8ad0-9c32c648bb72', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Bowser Castle', 'A big fiery castle sitting on prime real estate', 'FALSE', '100000000', '7', 'Speare Pl', 'Boston', 'MA', '02115');
INSERT INTO projects (id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode) VALUES ('d09c8f0f-13d3-4336-92e9-b0b2c8bce570', '56ebee48-d844-4fcd-aa58-fb71688c3e81', 'Spongebob Pineapple', 'A pineapple under the sea', 'TRUE', '18000000', '7', 'Speare Pl', 'Boston', 'MA', '02115');


INSERT INTO investor_investments(id, created_at, project_id, investor_id, funded_cents) VALUES ('e30e9159-5dac-48e9-b5cd-5ee8910ffa56', '2024-09-27 12:15:30', 'c3733692-5a86-441f-8ad0-9c32c648bb72', '', '1574')
INSERT INTO investor_investments(id, created_at, project_id, investor_id, funded_cents) VALUES ('c21b9ea3-40d3-4c9c-aac0-baf6118719c2', '2024-09-26 10:49:15', 'd09c8f0f-13d3-4336-92e9-b0b2c8bce570', '', '2017')
INSERT INTO investor_investments(id, created_at, project_id, investor_id, funded_cents) VALUES ('10240ceb-6cd6-42e3-b68a-b5fccf4623d9', '2024-08-17 11:55:10', 'd09c8f0f-13d3-4336-92e9-b0b2c8bce570', '', '2514')
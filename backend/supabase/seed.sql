INSERT INTO contributors (first_name, last_name, email) VALUES ('Michael', 'Brennan', 'brennan.mic@northeastern.edu');
INSERT INTO contributors (first_name, last_name, email) VALUES ('Ryan', 'Saperstein', 'saperstein.r@northeastern.edu');
INSERT INTO developers (name, description, location) VALUES ('Arav', 'Developer for Generate', 'Boston, MA');
INSERT INTO projects (developer_id, title, location, funding_goal_cents) VALUES (SELECT id FROM developers WHERE name = "Arav", "Bowser's Castle", 'The Valley of Bowser', '10000000000');
INSERT INTO projects (developer_id, title, location, funding_goal_cents) VALUES (SELECT id FROM developers WHERE name = "Arav", "Spongebob's Pineapple", '124 Conch St.', '1800000000');
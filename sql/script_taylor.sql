
INSERT INTO artists (name, country) VALUES ('Taylor Swift', 'USA');
INSERT INTO albums (title, release_date, artist_id) VALUES ('Taylor Swift', '2006-10-24', (SELECT id FROM artists WHERE name = 'Taylor Swift'));
INSERT INTO albums (title, release_date, artist_id) VALUES ('Fearless', '2025-06-25', (SELECT id FROM artists WHERE name = 'Taylor Swift'));
INSERT INTO albums (title, release_date, artist_id) VALUES ('1989', '2014-10-27', (SELECT id FROM artists WHERE name = 'Taylor Swift'));
INSERT INTO albums (title, release_date, artist_id) VALUES ('Midnights', '2022-10-21', (SELECT id FROM artists WHERE name = 'Taylor Swift'));
INSERT INTO musics (title, release_date, duration, artist_id, album_id) VALUES
('Tim McGraw', '2006-10-24', 222, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Taylor Swift')),
('Picture to Burn', '2006-10-24', 173, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Taylor Swift')),
('Teardrops on My Guitar', '2006-10-24', 203, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Taylor Swift'));
INSERT INTO musics (title, release_date, duration, artist_id, album_id) VALUES
('Fearless', '2025-06-25', 241, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Fearless')),
('Love Story', '2025-06-25', 235, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Fearless')),
('You Belong With Me', '2025-06-25', 237, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Fearless'));
INSERT INTO musics (title, release_date, duration, artist_id, album_id) VALUES
('Welcome to New York', '2014-10-27', 212, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = '1989')),
('Blank Space', '2014-10-27', 231, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = '1989')),
('Shake It Off', '2014-10-27', 219, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = '1989'));
INSERT INTO musics (title, release_date, duration, artist_id, album_id) VALUES
('Lavender Haze', '2022-10-21', 202, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Midnights')),
('Anti-Hero', '2022-10-21', 200, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Midnights')),
('Karma', '2022-10-21', 204, (SELECT id FROM artists WHERE name = 'Taylor Swift'), (SELECT id FROM albums WHERE title = 'Midnights'));
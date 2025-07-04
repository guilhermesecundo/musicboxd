# CREATE TABLE artists (
#     id SERIAL PRIMARY KEY,
#     name VARCHAR(255) NOT NULL,
#     country VARCHAR(100)
# );
# CREATE TABLE albums (
#     id SERIAL PRIMARY KEY,
#     title VARCHAR(255) NOT NULL,
#     release_date DATE NOT NULL,
#     artist_id INT NOT NULL,
#     FOREIGN KEY (artist_id) REFERENCES artists(id)
# );
# CREATE TABLE musics (
#     id SERIAL PRIMARY KEY,
#     title VARCHAR(255) NOT NULL,
#     release_date DATE NOT NULL,
#     duration INT NOT NULL,
#     artist_id INT NOT NULL,
#     album_id INT NOT NULL,
#     FOREIGN KEY (artist_id) REFERENCES artists(id),
#     FOREIGN KEY (album_id) REFERENCES albums(id)
# );
# Title,Artist,Album,Genre,Release Date,Duration,Popularity

artists_list = []
album_list = []

with open("songs_2000_2020_50k.csv", "r") as songs:
    with open("script_songs.sql", "w") as output:
        for i, line in enumerate(songs):
            if i == 0: continue
            parts = line.strip()
            parts = parts.split(',')
            song = parts[0]
            artist = parts[1]
            album = parts[2]
            genre = parts[3]
            date = parts[4] #transformar data?
            duration = parts[5] #transformar numerico?
            pop = parts[6]
            if artist not in artists_list:
                artists_list.append(artist)
                output.write("INSERT INTO artists (name, country) VALUES(\'"+artist+"\', \'EUA\');\n")
            if album not in album_list:
                album_list.append(album)
                output.write("INSERT INTO albums (title, release_date, artist_id) VALUES(\'"+album+"\', \'"+date+"\', "+str(artists_list.index(artist))+");\n")
            output.write("INSERT INTO musics (title, release_date, duration, artist_id, album_id) VALUES(\'"+song+"\', \'"+date+"\', "+duration+", "+str(artists_list.index(artist))+", "+str(album_list.index(album))+");\n")
            
            # if artist_name not in bank: INSERT INTO artists VALUES(artist_name, EUA?)
            # if album not in bank: INSERT INTO albums VALUES(album, date?, get_artist_id(artist_name))
            # INSERT INTO musics VALUES(song_name,date,get_artist_id());

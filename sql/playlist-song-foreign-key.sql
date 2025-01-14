# Delete song will also delete that song in related playlist
ALTER TABLE playlist_song
    DROP FOREIGN KEY FK8l4jevlmxwsdm3ppymxm56gh2;

ALTER TABLE playlist_song
    ADD CONSTRAINT FK8l4jevlmxwsdm3ppymxm56gh2
        FOREIGN KEY (song_id) REFERENCES song (id)
            ON DELETE CASCADE;

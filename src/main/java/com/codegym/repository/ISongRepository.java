package com.codegym.repository;

import com.codegym.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISongRepository extends JpaRepository<Song, Long> {

    @Query("SELECT s FROM Song s ORDER BY s.listeningCount DESC")
    List<Song> findTopPlayedSongs();

    @Query("SELECT s FROM Song s ORDER BY s.uploadTime DESC")
    List<Song> findNewSongs();


    @Query("SELECT s FROM Song s ORDER BY s.likeCount DESC")
    List<Song> findTopLikedSongs();
}

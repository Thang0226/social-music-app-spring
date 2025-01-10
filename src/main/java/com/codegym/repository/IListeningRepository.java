package com.codegym.repository;



import com.codegym.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IListeningRepository extends JpaRepository<Song, Long> {


    @Query("SELECT s FROM Song s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Song> searchSongsByName(@Param("keyword") String keyword);


    @Query("SELECT s FROM Song s ORDER BY s.uploadTime DESC")
    List<Song> findLatestSongs();


    @Query("SELECT s FROM Song s ORDER BY s.listeningCount DESC")
    List<Song> findMostPlayedSongs();
}


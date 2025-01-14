package com.codegym.repository;

import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Genre;
import com.codegym.model.Singer;
import com.codegym.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ISongRepository extends JpaRepository<Song, Long> {

    @Query("SELECT s FROM Song s ORDER BY s.listeningCount DESC")
    List<Song> findTopPlayedSongs();

    @Query("SELECT s FROM Song s ORDER BY s.uploadTime DESC")
    List<Song> findNewSongs();


    @Query("SELECT s FROM Song s ORDER BY s.likeCount DESC")
    List<Song> findTopLikedSongs();


    @Query(nativeQuery = true, value = "call find_all_song_by_user_id(:userId)")
    List<UserSongDTO> findAllSongsByUserId(@Param("userId") Long userId);

    List<Song> findSongBySingersIdOrderByListeningCountDesc(Long singerId);

    Optional<Song> findByName(String name);

//    List<Song> findAllSongsBySingers(String singerName);
}

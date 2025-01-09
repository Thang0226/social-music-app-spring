package com.codegym.repository_tamthoi;

import com.codegym.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {


    @Query("SELECT p FROM Playlist p ORDER BY p.createTime DESC")
    List<Playlist> findNewPlaylists();


    @Query("SELECT p FROM Playlist p ORDER BY p.likeCount DESC")
    List<Playlist> findTopLikedPlaylists();

//    @Query("SELECT lc FROM Playlist lc ORDER BY lc. DESC")
    List<Playlist> findTopPlayedPlaylists();
}
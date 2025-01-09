package com.codegym.repository_tamthoi;

import com.codegym.model.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {


    @Query("SELECT p FROM PlayList p ORDER BY p.createTime DESC")
    List<PlayList> findNewPlaylists();


    @Query("SELECT p FROM PlayList p ORDER BY p.likeCount DESC")
    List<PlayList> findTopLikedPlaylists();

    @Query("SELECT lc FROM PlayList lc ORDER BY lc. DESC")
    List<PlayList> findTopPlayedPlaylists();
}
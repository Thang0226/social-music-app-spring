package com.codegym.repository;

import com.codegym.model.Comment;

import com.codegym.model.DTO.comment.SongCommentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {
    @Query(nativeQuery = true, value = "call find_comment_by_song_id(:songId)")
    List<SongCommentDTO> findCommentsBySongId(@Param("songId") Long songId);
}

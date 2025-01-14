package com.codegym.service.comment;

import com.codegym.model.Comment;
import com.codegym.model.DTO.comment.PlaylistCommentDTO;
import com.codegym.model.DTO.comment.SingerCommentDTO;
import com.codegym.model.DTO.comment.SongCommentDTO;
import com.codegym.service.IGenerateService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICommentService extends IGenerateService<Comment> {
    Page<SongCommentDTO> findCommentsBySongId(Long songId, Pageable pageable);

    Page<PlaylistCommentDTO> findCommentsByPlaylistId(Long playlistID, Pageable pageable);

    Page<SingerCommentDTO> findCommentsBySingerId(Long singerId, Pageable pageable);

    void deleteCommentsBySongId(Long songId);
}

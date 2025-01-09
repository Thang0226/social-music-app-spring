package com.codegym.service.comment;

import com.codegym.model.Comment;
import com.codegym.model.DTO.comment.PlaylistCommentDTO;
import com.codegym.model.DTO.comment.SingerCommentDTO;
import com.codegym.model.DTO.comment.SongCommentDTO;
import com.codegym.model.Playlist;
import com.codegym.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService implements ICommentService {
    @Autowired
    private ICommentRepository commentRepository;

    @Override
    public Iterable<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentRepository.findById(id);
    }

    @Override
    public Playlist save(Comment comment) {
        commentRepository.save(comment);
        return null;
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Page<SongCommentDTO> findCommentsBySongId(Long songId, Pageable pageable) {
        List<SongCommentDTO> comments = commentRepository.findCommentsBySongId(songId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), comments.size());
        return new PageImpl<>(comments.subList(start, end), pageable, comments.size());
    }

    @Override
    public Page<PlaylistCommentDTO> findCommentsByPlaylistId(Long playlistId, Pageable pageable) {
        List<PlaylistCommentDTO> comments = commentRepository.findCommentsByPlaylistId(playlistId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), comments.size());
        return new PageImpl<>(comments.subList(start, end), pageable, comments.size());
    }

    @Override
    public Page<SingerCommentDTO> findCommentsBySingerId(Long singerId, Pageable pageable) {
        List<SingerCommentDTO> comments = commentRepository.findCommentsBySingerId(singerId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), comments.size());
        return new PageImpl<>(comments.subList(start, end), pageable, comments.size());
    }
}

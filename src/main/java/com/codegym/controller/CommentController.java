package com.codegym.controller;

import com.codegym.model.Comment;
import com.codegym.model.DTO.comment.PlaylistCommentDTO;
import com.codegym.model.DTO.comment.SingerCommentDTO;
import com.codegym.model.DTO.comment.SongCommentDTO;
import com.codegym.service.comment.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    @PostMapping("/comments")
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
        comment.setCommentTime(LocalDateTime.now());
        commentService.save(comment);
        return new ResponseEntity<>("Comment saved", HttpStatus.CREATED);
    }

    @GetMapping("/song-comment/{id}")
    public ResponseEntity<Page<SongCommentDTO>> getSongComment(
            @PathVariable Long id,
            @PageableDefault(size = 10) Pageable pageable) {
        return new ResponseEntity<>(commentService.findCommentsBySongId(id, pageable), HttpStatus.OK);
    }

    @GetMapping("/playlist-comment/{id}")
    public ResponseEntity<Page<PlaylistCommentDTO>> getPlaylistComment(
            @PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(commentService.findCommentsByPlaylistId(id, pageable), HttpStatus.OK);
    }

    @GetMapping("/singer-comment/{id}")
    public ResponseEntity<Page<SingerCommentDTO>> getSingerComment(
            @PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(commentService.findCommentsBySingerId(id, pageable), HttpStatus.OK);
    }
}

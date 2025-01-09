package com.codegym.model.DTO.comment;

import java.time.LocalDateTime;

public interface PlaylistCommentDTO {
    String getPlaylistName();
    String getUsername();
    LocalDateTime getCommentTime();
    String getContent();
}

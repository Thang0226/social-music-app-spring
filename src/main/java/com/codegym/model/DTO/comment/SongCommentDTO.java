package com.codegym.model.DTO.comment;

import java.time.LocalDateTime;

public interface SongCommentDTO {
    String getSongName();
    String getUsername();
    LocalDateTime getCommentTime();
    String getContent();
}

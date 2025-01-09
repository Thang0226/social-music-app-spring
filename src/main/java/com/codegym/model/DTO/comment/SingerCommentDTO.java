package com.codegym.model.DTO.comment;

import java.time.LocalDateTime;

public interface SingerCommentDTO {
    String getSingerName();
    String getUsername();
    LocalDateTime getCommentTime();
    String getContent();
}

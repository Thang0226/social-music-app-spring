package com.codegym.model.DTO.song;

import java.time.LocalDateTime;

public interface UserSongDTO {
    Long getSongId();
    String getSongName();
    String getUserName();
    String getDescription();
    String getImageFile();
    String getMusicFile();
    LocalDateTime getUploadTime();

}

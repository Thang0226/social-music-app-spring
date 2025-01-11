package com.codegym.model.DTO.song;

import java.time.LocalDateTime;

public interface UserSongDTO {
    String getSongName();
    String getUserName();
    String getDescription();
    String getImageFile();
    String getMusicFile();
    LocalDateTime getUploadTime();

}

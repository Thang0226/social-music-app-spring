package com.codegym.model.DTO.playlist;

import com.codegym.model.Song;
import com.codegym.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistDTO {
    private Long id;
    private String name;
    private int likeCount;
    private int listeningCount;
    private List<Song> songs;
    private LocalDateTime createdTime;
    private User user;
}

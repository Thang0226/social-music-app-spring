package com.codegym.model.DTO.listening;


import java.time.LocalDateTime;
import java.util.Set;

public class SongDTO {
    private Long id;
    private String name;
    private String description;
    private String musicFile;
    private String imageFile;
    private LocalDateTime uploadTime;
    private int likeCount;
    private int listeningCount;
    private Set<String> singers;
    private Set<String> genres;

    public SongDTO() {}

    public SongDTO(Long id, String name, String description, String musicFile, String imageFile,
                   LocalDateTime uploadTime, int likeCount, int listeningCount,
                   Set<String> singers, Set<String> genres) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.musicFile = musicFile;
        this.imageFile = imageFile;
        this.uploadTime = uploadTime;
        this.likeCount = likeCount;
        this.listeningCount = listeningCount;
        this.singers = singers;
        this.genres = genres;
    }

}


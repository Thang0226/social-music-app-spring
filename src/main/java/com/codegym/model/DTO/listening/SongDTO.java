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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMusicFile() {
        return musicFile;
    }

    public void setMusicFile(String musicFile) {
        this.musicFile = musicFile;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getListeningCount() {
        return listeningCount;
    }

    public void setListeningCount(int listeningCount) {
        this.listeningCount = listeningCount;
    }

    public Set<String> getSingers() {
        return singers;
    }

    public void setSingers(Set<String> singers) {
        this.singers = singers;
    }

    public Set<String> getGenres() {
        return genres;
    }

    public void setGenres(Set<String> genres) {
        this.genres = genres;
    }
}


package com.codegym.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongForm {
    private Long id;
    private String name;
    private String description;
    private MultipartFile musicFile;
    private MultipartFile imageFile;
    private LocalDateTime uploadTime;
    private int likeCount;
    private Set<Singer> singers;
    private User user;
    private Set<Genre> genres;
}

package com.codegym.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "playlist")
@Data
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "like_count", nullable = false)
    private int likeCount = 0; // Giá trị mặc định là 0

    @ManyToMany
    @JoinTable(
            name = "playlist_song",
            joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private Set<Song> songs;

    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "listening_count", nullable = false)
    private int listeningCount = 0; // Giá trị mặc định là 0

    @PrePersist
    protected void onCreate() {
        this.createTime = LocalDateTime.now();
    }
}

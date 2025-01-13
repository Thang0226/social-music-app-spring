package com.codegym.controller;

import com.codegym.model.Playlist;
import com.codegym.service.ISongService;
import com.codegym.service.playlist.IPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/playlist")
public class PlaylistController {
    @Autowired
    private IPlaylistService playlistService;

    @Autowired
    private ISongService songService;

    @GetMapping
    public ResponseEntity<Iterable<Playlist>> listPlaylist() {
        return new ResponseEntity<>(playlistService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.save(playlist);
        return new ResponseEntity<>("playlist created", HttpStatus.CREATED);
    }

    // API: Lấy danh sách bài hát trong một playlist
    @GetMapping("/{id}")
    public ResponseEntity<?> getSongsByPlaylist(@PathVariable Long id) {
        // Tìm playlist theo ID
        Playlist playlist = playlistService.findById(id).orElseThrow(() -> new RuntimeException("Playlist không tồn tại"));
        Map<String, Object> response = new HashMap<>();
        response.put("playlist", playlist.getName());
        response.put("songs", playlist.getSongs());
        return ResponseEntity.ok(response);
    }

    // API: Xóa một bài hát khỏi playlist
    @DeleteMapping("/songs/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable Long id) {
        songService.deleteById(id);
        return ResponseEntity.ok("Xóa bài hát trong playlist thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> updatePlaylist(@RequestBody Playlist playlist, @PathVariable Long id) {
        playlist.setId(id);
        playlistService.save(playlist);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Playlist> deletePlaylist(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistService.findById(id);
        if (!playlistOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        playlistService.deleteById(id);
        return new ResponseEntity<>(playlistOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/like-playlist/{id}")
    public ResponseEntity<String> likePlaylist(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistService.findById(id);
        if (playlistOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Playlist playlist = playlistOptional.get();
        int newLikeCount = playlist.getLikeCount() + 1;
        playlist.setLikeCount(newLikeCount);
        playlistService.save(playlist);
        String likeCountStr = String.valueOf(newLikeCount);
        return new ResponseEntity<>(likeCountStr, HttpStatus.OK);
    }

    @PutMapping("/unlike-playlist/{id}")
    public ResponseEntity<String> unlikePlaylist(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistService.findById(id);
        if (playlistOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Playlist playlist = playlistOptional.get();
        int newLikeCount = playlist.getLikeCount() - 1;
        playlist.setLikeCount(newLikeCount);
        playlistService.save(playlist);
        String likeCountStr = String.valueOf(newLikeCount);
        return new ResponseEntity<>(likeCountStr, HttpStatus.OK);
    }
}

package com.codegym.controller;

import com.codegym.model.Playlist;
import com.codegym.service.playlist.IPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/playlist")
public class PlaylistController {
    @Autowired
    private IPlaylistService playlistService;

    @GetMapping
    public ResponseEntity<Iterable<Playlist>> listPlaylist() {
        return new ResponseEntity<>(playlistService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.save(playlist);
        return new ResponseEntity<>("playlist created", HttpStatus.CREATED);
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
}

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
    private IPlaylistService playListService;

    @GetMapping
    public ResponseEntity<Iterable<Playlist>> listPlayList() {
        return new ResponseEntity<>(playListService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playList) {
        return new ResponseEntity<>(playListService.save(playList), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Playlist> deletePlaylist(@PathVariable Long id) {
        Optional<Playlist> playListOptional = playListService.findById(id);
        if (!playListOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        playListService.delete(id);
        return new ResponseEntity<>(playListOptional.get(), HttpStatus.NO_CONTENT);
    }
}

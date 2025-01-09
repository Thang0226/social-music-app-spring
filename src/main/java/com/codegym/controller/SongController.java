package com.codegym.controller;


import com.codegym.model.Song;
import com.codegym.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @GetMapping
    public ResponseEntity<Iterable<Song>> listSongs() {
        return new ResponseEntity<>(iSongService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createSong(@RequestBody Song song) {
        iSongService.save(song);
        return new ResponseEntity<>("Song saved", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(@RequestBody Song song, @PathVariable Long id) {
        song.setId(id);
        iSongService.save(song);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Song> deleteSong(@PathVariable Long id) {
        Optional<Song> songOptional = iSongService.findById(id);
        if (songOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iSongService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

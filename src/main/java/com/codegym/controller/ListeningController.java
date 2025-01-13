package com.codegym.controller;

import com.codegym.model.DTO.listening.SongDTO;
import com.codegym.model.Song;
import com.codegym.service.listening.ListeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/songListen")
public class ListeningController {
    @Autowired
    private ListeningService listeningService;

    @GetMapping
    public ResponseEntity<List<SongDTO>> getAllSongs() {
        List<SongDTO> songs = listeningService.getAllSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSongById(@PathVariable Long id) {
        Optional<Song> songOptional = listeningService.findById(id);

        if (songOptional.isPresent()) {
            SongDTO songDTO = listeningService.convertToDTO(songOptional.get());
            return new ResponseEntity<>(songDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Song not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<SongDTO>> searchSongs(@RequestParam String keyword) {
        List<SongDTO> songs = listeningService.searchSongs(keyword);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
    @GetMapping("/latest")
    public ResponseEntity<List<SongDTO>> getLatestSongs() {
        List<SongDTO> songs = listeningService.getLatestSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
    @GetMapping("/most-played")
    public ResponseEntity<List<SongDTO>> getMostPlayedSongs() {
        List<SongDTO> songs = listeningService.getMostPlayedSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }



}


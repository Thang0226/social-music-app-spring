package com.codegym.controller;


import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Genre;
import com.codegym.model.Song;
import com.codegym.service.ISongService;
import com.codegym.service.genre.IGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @Autowired
    IGenreService iGenreService;

    // User xem bai hat da tao
    @GetMapping("/by-user/{id}")
    public ResponseEntity<List<UserSongDTO>> listSongs(@PathVariable Long id) {
        return new ResponseEntity<>(iSongService.findAllSongsByUserId(id), HttpStatus.OK);
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

    // Gán nhãn cho Song
    @PutMapping("/{id}/genres")
    public ResponseEntity<String> assignGenresToSong(@RequestBody Set<Long> genreIds, @PathVariable Long id) {

        /* Lấy thông tin bài hát. */
        Optional<Song> songOptional = iSongService.findById(id);
        if (songOptional.isEmpty()) {
            return new ResponseEntity<>("Song not found",HttpStatus.NOT_FOUND);
        }
        Song song = songOptional.get();

        /* Tìm genreId */
        Set<Genre> genres = new HashSet<>();
        for (Long genreId : genreIds) {
            Optional<Genre> genreOptional = iGenreService.findById(genreId);
            if (genreOptional.isEmpty()) {
                return new ResponseEntity<>("Genre with ID " + genreId + " not found", HttpStatus.NOT_FOUND);
            }
            genres.add(genreOptional.get());
        }

        /* Gán danh sách genres cho bài hát */
        song.setGenres(genres);

        /* Lưu bài hát sau khi gán genres */
        iSongService.save(song);

        return new ResponseEntity<>("Genres assigned to song successfully",HttpStatus.OK);
    }

}

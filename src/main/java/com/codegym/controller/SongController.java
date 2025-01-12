package com.codegym.controller;


import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Genre;
import com.codegym.model.Song;
import com.codegym.model.SongForm;
import com.codegym.service.ISongService;
import com.codegym.service.genre.IGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @Autowired
    IGenreService iGenreService;

    @Value("${image-upload}")
    private String imageUploadPath;

    @Value("${audio-upload}")
    private String audioUploadPath;

    // User xem bai hat da tao
    @GetMapping("/by-user/{id}")
    public ResponseEntity<List<UserSongDTO>> listSongs(@PathVariable Long id) {
        return new ResponseEntity<>(iSongService.findAllSongsByUserId(id), HttpStatus.OK);
    }

    // All songs
    @GetMapping
    public ResponseEntity<Iterable<Song>> allSongs() {
        return new ResponseEntity<>(iSongService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Song>> getSongById(@PathVariable Long id) {
        return new ResponseEntity<>(iSongService.findById(id), HttpStatus.OK);
    }

    @PostMapping
//    public ResponseEntity<String> createSong(@RequestBody Song song) {
//        iSongService.save(song);
//        return new ResponseEntity<>("Song saved", HttpStatus.CREATED);
//    }
    public ResponseEntity<?> createSong(@ModelAttribute SongForm songForm){
        try{
            // Upload Image
            String imageFileName = StringUtils.cleanPath(songForm.getImageFile().getOriginalFilename());
            Path imageUploadDir = Paths.get(imageUploadPath);
            if (!Files.exists(imageUploadDir)) {
                Files.createDirectories(imageUploadDir);
            }
            Path imagePath = imageUploadDir.resolve(imageFileName);
            Files.copy(songForm.getImageFile().getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

            // Upload Music
            String musicFileName = StringUtils.cleanPath(songForm.getMusicFile().getOriginalFilename());
            Path musicUploadDir = Paths.get(audioUploadPath);
            if (!Files.exists(musicUploadDir)) {
                Files.createDirectories(musicUploadDir);
            }
            Path musicPath = musicUploadDir.resolve(musicFileName);
            Files.copy(songForm.getMusicFile().getInputStream(), musicPath, StandardCopyOption.REPLACE_EXISTING);


            // Create and save Song entity
            Song song = new Song();
            song.setName(songForm.getName());
            song.setDescription(songForm.getDescription());
            song.setImageFile(imageFileName);
            song.setMusicFile(musicFileName);
            song.setUploadTime(LocalDateTime.now());
            song.setLikeCount(0);
            song.setListeningCount(0);


            iSongService.save(song);

            return new ResponseEntity<>("Song saved successfully", HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Error saving song: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @PostMapping("/like-song/{id}")
    public ResponseEntity<String> likeSong(@PathVariable Long id) {
        Optional<Song> songOptional = iSongService.findById(id);
        if (songOptional.isEmpty()) {
            return new ResponseEntity<>("Song not found",HttpStatus.NOT_FOUND);
        }
        Song song = songOptional.get();
        int newLikeCount = song.getLikeCount() + 1;
        song.setLikeCount(newLikeCount);
        iSongService.save(song);
        String newLikeCountStr = String.valueOf(newLikeCount);
        return new ResponseEntity<>(newLikeCountStr,HttpStatus.OK);
    }

    @PostMapping("/unlike-song/{id}")
    public ResponseEntity<String> unlikeSong(@PathVariable Long id) {
        Optional<Song> songOptional = iSongService.findById(id);
        if (songOptional.isEmpty()) {
            return new ResponseEntity<>("Song not found",HttpStatus.NOT_FOUND);
        }
        Song song = songOptional.get();
        int newLikeCount = song.getLikeCount() - 1;
        song.setLikeCount(newLikeCount);
        iSongService.save(song);
        String newLikeCountStr = String.valueOf(newLikeCount);
        return new ResponseEntity<>(newLikeCountStr,HttpStatus.OK);
    }
}

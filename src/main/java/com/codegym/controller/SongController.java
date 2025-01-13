package com.codegym.controller;


import com.codegym.model.*;
import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.service.ISongService;
import com.codegym.service.genre.IGenreService;
import com.codegym.service.singer.ISingerService;
import com.codegym.service.user.IUserService;
import com.codegym.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;
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
    @Autowired
    private ISingerService singerService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IGenreService genreService;

    // User xem bai hat da tao
    @GetMapping("/by-user/{id}")
    public ResponseEntity<List<UserSongDTO>> listSongs(@PathVariable Long id) {
        return new ResponseEntity<>(iSongService.findAllSongsByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Song>> getSongById(@PathVariable Long id) {
        return new ResponseEntity<>(iSongService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<Song>> getAllSongs() {
        return new ResponseEntity<>(iSongService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public Map<String, Object> showCreateForm() {
        Map<String, Object> infor = new HashMap<>();
        Iterable<Genre> genres = iGenreService.findAll();
        Iterable<Singer> singers = singerService.findAll();
        infor.put("genres", genres);
        infor.put("singers", singers);
        return infor;
    }

    @Value("${image-upload}")
    private String imagePath;
    @Value("${audio-upload}")
    private String audioPath;

    @PostMapping(path = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveSong(@RequestParam String name, @RequestParam String description,
                                      @RequestParam("musicFile") MultipartFile musicFile,
                                      @RequestParam("imageFile") MultipartFile imageFile,
                                      @RequestParam("singers") String[] singers,
                                      @RequestParam("genres") String[] genres,
                                      @RequestParam(value="user_id") Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User ID not found");
        }
        String musicFileName = musicFile.getOriginalFilename();
        String imageFileName = imageFile.getOriginalFilename();
        try {
            FileCopyUtils.copy(imageFile.getBytes(), new File(imagePath + imageFileName));
            FileCopyUtils.copy(musicFile.getBytes(), new File(audioPath + musicFileName));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        Song song = new Song();
        song.setName(name);
        song.setDescription(description);
        song.setMusicFile(musicFileName);
        song.setImageFile(imageFileName);
        song.setUploadTime(LocalDateTime.now());
        song.setGenres(findGenres(genres));
        song.setSingers(findSingers(singers));
        song.setUser(userOptional.get());
        iSongService.save(song);
        return new ResponseEntity<>(song, HttpStatus.OK);
    }

    private Set<Genre> findGenres(String[] genres) {
        if (genres == null || genres.length == 0) {
            return new HashSet<>();
        }
        Set<Genre> genresSet = new HashSet<>();
        for (String genre : genres) {
            genresSet.add(genreService.findByName(genre).get());
        }
        return genresSet;
    }

    private Set<Singer> findSingers(String[] singers) {
        if (singers == null || singers.length == 0) {
            return new HashSet<>();
        }
        Set<Singer> singersSet = new HashSet<>();
        for (String singer : singers) {
            singersSet.add(singerService.findBySingerName(singer).get());
        }
        return singersSet;
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

    @PutMapping("/like-song/{id}")
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

    @PutMapping("/unlike-song/{id}")
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

    @PutMapping("/update-listening-count/{id}")
    public ResponseEntity<String> updateListeningCount(@PathVariable Long id) {
        Optional<Song> songOptional = iSongService.findById(id);
        if (songOptional.isEmpty()) {
            return new ResponseEntity<>("Song not found",HttpStatus.NOT_FOUND);
        }
        Song song = songOptional.get();
        int newListeningCount = song.getListeningCount() + 1;
        song.setListeningCount(newListeningCount);
        iSongService.save(song);
        String newListeningCountStr = String.valueOf(newListeningCount);
        return new ResponseEntity<>(newListeningCountStr,HttpStatus.OK);
    }

    @GetMapping("/singer-popular-song/{id}")
    public ResponseEntity<List<Song>> getSingerPopularSong(@PathVariable Long id) {
        List<Song> songs = iSongService.findSongBySingers(id);
        return new ResponseEntity<>(songs,HttpStatus.OK);
    }

    @GetMapping("/findAllSongBySinger/{id}")
    public ResponseEntity<List<Song>> findAllSongBySinger(@PathVariable Long id) {
        List<Song> songs = iSongService.findSongBySingers(id);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
}

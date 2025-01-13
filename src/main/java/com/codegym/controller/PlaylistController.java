package com.codegym.controller;

import com.codegym.model.*;
import com.codegym.service.ISongService;
import com.codegym.service.playlist.IPlaylistService;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/playlist")
public class PlaylistController {
    @Autowired
    private IPlaylistService playlistService;

    @Autowired
    private ISongService songService;
    @Autowired
    private IUserService userService;

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
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistService.findById(id);
        if (!playlistOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Trả về 404 nếu playlist không tồn tại
        }
        playlistService.deleteById(id);  // Thực hiện xóa playlist
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // Trả về 204 nếu xóa thành công
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

    @PostMapping("/create")
    public Map<String, Object> showCreateForm() {
        Map<String, Object> infor = new HashMap<>();
        Iterable<Song> songs = songService.findAll();
        infor.put("songs", songs);
        return infor;
    }


    @PostMapping(path = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> savePlaylist(@RequestParam String name,
                                          @RequestParam("song") String[] songs,
                                          @RequestParam(value="user_id") Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User ID not found");
        }
        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setSongs(findSongs(songs));
        playlist.setUser(userOptional.get());
        playlistService.save(playlist);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }

    private Set<Song> findSongs(String[] songs) {
        if (songs == null || songs.length == 0) {
            return new HashSet<>();
        }
        Set<Song> songSet = new HashSet<>();
        for (String song : songs) {
            songSet.add(songService.findByName(song).get());
        }
        return songSet;
    }

}

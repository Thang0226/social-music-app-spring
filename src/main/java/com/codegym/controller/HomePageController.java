package com.codegym.controller;

import com.codegym.model.Playlist;
import com.codegym.model.Song;
import com.codegym.service.IPlaylistService;
import com.codegym.service.ISongService;
import com.codegym.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/homepage")
public class HomePageController {
    @Autowired
    private ISongService songService;
    @Autowired
    private IPlaylistService playlistService;




    /* ----------------NHIEM VU 40: HIỂN THỊ BÀI HÁT CÓ LƯỢT VIEW NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-played-songs", method = RequestMethod.GET)
    public ResponseEntity<List<Song>> getTopPlayedSongs() {
        List<Song> songs = songService.getTopPlayedSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
    /* ---------------- NHIỆM VỤ 41: HIỂN THỊ BÀI HÁT MỚI NHẤT VỪA ĐƯỢC THÊM VÀO------------------------ */
    @RequestMapping(value = "/new-songs", method = RequestMethod.GET)
    public ResponseEntity<List<Song>> getNewSongs() {
        List<Song> songs = songService.getNewSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
    /* ----------------NHIEM VU 43: HIỂN THỊ BÀI HÁT CÓ LƯỢT LIKE NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-liked-songs", method = RequestMethod.GET)
    public ResponseEntity<List<Song>> getTopLikedSongs() {
        List<Song> songs = songService.getTopLikedSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }


    /* ----------------NHIỆM VỤ 39: HIỂN THỊ PLAYLIST ĐANG ĐƯỢC NGHE NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-played-playlists", method = RequestMethod.GET)
    public ResponseEntity<List<Playlist>> getTopPlayedPlaylists() {
        List<Playlist> playlists = playlistService.getTopPlayedPlaylists();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
    /* ---------------- NHIỆM VỤ 42: HIỂN THỊ PLAYLIST MỚI NHẤT VỪA ĐƯỢC THÊM VÀO ------------------------ */
    @RequestMapping(value = "/new-playlists", method = RequestMethod.GET)
    public ResponseEntity<List<Playlist>> getNewPlaylists() {
        List<Playlist> playlists = playlistService.getNewPlaylists();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
    /* ---------------- NHIỆM VỤ 44: HIỂN THỊ PLAYLIST ĐƯỢC LIKE NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-liked-playlists", method = RequestMethod.GET)
    public ResponseEntity<List<Playlist>> getTopLikedPlaylists() {
        List<Playlist> playlists = playlistService.getTopLikedPlaylists();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }

}
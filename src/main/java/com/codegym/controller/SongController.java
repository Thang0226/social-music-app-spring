package com.codegym.controller;


import com.codegym.model.PlayList;
import com.codegym.model.Song;
import com.codegym.service_tamthoi.PlayListService;
import com.codegym.service_tamthoi.SongService;
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
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private PlayListService playlistService;

    /* ----------------NHIEM VU 40: HIỂN THỊ BÀI HÁT CÓ LƯỢT VIEW NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-played", method = RequestMethod.GET)
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
    @RequestMapping(value = "/top-liked", method = RequestMethod.GET)
    public ResponseEntity<List<Song>> getTopLikedSongs() {
        List<Song> songs = songService.getTopLikedSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }


    /* ----------------NHIỆM VỤ 39: HIỂN THỊ PLAYLIST ĐANG ĐƯỢC NGHE NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-played", method = RequestMethod.GET)
    public ResponseEntity<List<PlayList>> getTopPlayedPlaylists() {
        // Lấy các playlist được nghe nhiều nhất
//        List<PlayList> playlists = playlistService.getTopPlayedPlaylists();
//        return new ResponseEntity<>(playlists, HttpStatus.OK);
        return null;
    }

    /* ---------------- NHIỆM VỤ 43: HIỂN THỊ PLAYLIST MỚI NHẤT VỪA ĐƯỢC THÊM VÀO ------------------------ */
    @RequestMapping(value = "/new-playlists", method = RequestMethod.GET)
    public ResponseEntity<List<PlayList>> getNewPlaylists() {
        List<PlayList> playlists = playlistService.getNewPlaylists();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }

    /* ---------------- NHIỆM VỤ 44: HIỂN THỊ PLAYLIST ĐƯỢC LIKE NHIỀU NHẤT ------------------------ */
    @RequestMapping(value = "/top-liked", method = RequestMethod.GET)
    public ResponseEntity<List<PlayList>> getTopLikedPlaylists() {
        List<PlayList> playlists = playlistService.getTopLikedPlaylists();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }

}


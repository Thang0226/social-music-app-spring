package com.codegym.controller;


import com.codegym.model.Song;
import com.codegym.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @GetMapping
    public ResponseEntity<Iterable<Song>> listSongs() {
//        ModelAndView mav = new ModelAndView("/songs/list");
//        mav.addObject("songs", iSongService.findAll());
//        System.out.println("Read all songs");
//        return mav;
        return new ResponseEntity<>(iSongService.findAll(), HttpStatus.OK);
    }


}

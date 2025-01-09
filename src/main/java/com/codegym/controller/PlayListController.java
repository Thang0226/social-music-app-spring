package com.codegym.controller;


import com.codegym.model.PlayList;
import com.codegym.service.playList.IPlayListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/playlist")
public class PlayListController {
    @Autowired
    private IPlayListService playListService;

    @GetMapping
    public ResponseEntity<Iterable<PlayList>> listPlayList() {
        return new ResponseEntity<>(playListService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PlayList> createPlaylist(@RequestBody PlayList playList) {
        return new ResponseEntity<>(playListService.save(playList), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PlayList> deletePlaylist(@PathVariable Long id) {
        Optional<PlayList> playListOptional = playListService.findById(id);
        if (!playListOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        playListService.delete(id);
        return new ResponseEntity<>(playListOptional.get(), HttpStatus.NO_CONTENT);
    }
}

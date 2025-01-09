package com.codegym.controller;


import com.codegym.model.Singer;
import com.codegym.service.singer.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/singer")
public class SingerController {
    @Autowired
    private ISingerService singerService;

    @GetMapping
    public ResponseEntity<Iterable<Singer>> listSinger() {
        return new ResponseEntity<>(singerService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Singer> createSinger(@RequestBody Singer singer) {
        return new ResponseEntity<>(singerService.save(singer), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> findById(@PathVariable Long id) {
        return singerService.findById(id)
               .map(ResponseEntity::ok)
               .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}

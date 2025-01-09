package com.codegym.controller;


import com.codegym.model.Singer;
import com.codegym.service.singer.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/singers")
public class SingerController {
    @Autowired
    private ISingerService iSingerService;

    @GetMapping
    public ResponseEntity<Iterable<Singer>> listSinger() {
        return new ResponseEntity<>(iSingerService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createSinger(@RequestBody Singer singer) {
        iSingerService.save(singer);
        return new ResponseEntity<>("Singer saved", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> findById(@PathVariable Long id) {
        return iSingerService.findById(id)
               .map(ResponseEntity::ok)
               .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}

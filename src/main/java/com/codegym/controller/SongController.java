package com.codegym.controller;


import com.codegym.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/songs")
public class SongController {
    @Autowired
    private ISongService iSongService;
    @GetMapping()
    public ModelAndView listSongs() {
        ModelAndView mav = new ModelAndView("/songs/list");
        mav.addObject("songs", iSongService.findAll());
        System.out.println("Read all songs");
        return mav;
    }
}

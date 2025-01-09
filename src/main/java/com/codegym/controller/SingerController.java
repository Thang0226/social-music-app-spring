package com.codegym.controller;


import com.codegym.model.Singer;
import com.codegym.service.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/singers")
public class SingerController {
    @Autowired
    private ISingerService singerService;


    @GetMapping("/create")
    public ModelAndView ShowCreateForm() {
        ModelAndView modelAndView = new ModelAndView("/singer/create");
        modelAndView.addObject("singer", new Singer());
        return modelAndView;
    }

    @PostMapping("/create")
    public ModelAndView saveSinger(@ModelAttribute("singer") Singer singer) {
        singerService.save(singer);
        ModelAndView modelAndView = new ModelAndView("/singer/create");
        modelAndView.addObject("singer", new Singer());
        modelAndView.addObject("message", "Singer saved successfully!");
        return modelAndView;
    }
}

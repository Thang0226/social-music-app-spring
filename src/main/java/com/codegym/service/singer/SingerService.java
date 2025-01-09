package com.codegym.service.singer;


import com.codegym.model.Singer;
import com.codegym.repository.ISingerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SingerService implements ISingerService {

    @Autowired
    private ISingerRepository iSingerRepository;


    @Override
    public Iterable<Singer> findAll() {
        return iSingerRepository.findAll();
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return iSingerRepository.findById(id);
    }


    @Override
    public Singer save(Singer singer) {

        iSingerRepository.save(singer);
        return singer;
    }



}

package com.codegym.service;


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
        return null;
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return null;
    }

    @Override
    public void save(Singer singer) {

    }

    @Override
    public void remove(Long id) {
        iSingerRepository.deleteById(id);
    }
}

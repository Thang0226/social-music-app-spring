package com.codegym.service;

import com.codegym.model.Singer;

import java.util.Optional;

public interface IGenerateService<S> {
    Iterable<Singer> findAll();

    Optional<Singer> findById(Long id);

    void save(Singer singer);

    void remove(Long id);
}

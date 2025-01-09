package com.codegym.service;

import com.codegym.model.Playlist;

import java.util.Optional;

public interface IGenerateService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    Playlist save(T object);

    void deleteById(Long id);
}

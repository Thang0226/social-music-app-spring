package com.codegym.service;

import com.codegym.model.Singer;

import java.util.Optional;

public interface IGenerateService<T> {
    Iterable<T> findAll();

    Optional<Singer> findById(Long id);

    T save(T t);



}

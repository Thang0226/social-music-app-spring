package com.codegym.service.playlist;

import com.codegym.model.Playlist;

import java.util.List;
import java.util.Optional;

public interface IGenericService<T> {
    List<T> findAll();
    Optional<Playlist> findById(Long id);
    T save(T t);
    void delete(Long id);
}

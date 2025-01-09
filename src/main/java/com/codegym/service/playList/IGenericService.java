package com.codegym.service.playList;

import com.codegym.model.PlayList;

import java.util.List;
import java.util.Optional;

public interface IGenericService<T> {
    List<T> findAll();
    Optional<PlayList> findById(Long id);
    T save(T t);
    void delete(Long id);
}

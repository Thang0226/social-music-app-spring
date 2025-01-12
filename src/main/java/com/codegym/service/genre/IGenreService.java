package com.codegym.service.genre;

import com.codegym.model.Genre;
import com.codegym.service.IGenerateService;

import java.util.Optional;

public interface IGenreService extends IGenerateService<Genre> {
    Optional<Genre> findByName(String name);
}

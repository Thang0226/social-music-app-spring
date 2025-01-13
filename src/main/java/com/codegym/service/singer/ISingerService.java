package com.codegym.service.singer;

import com.codegym.model.Singer;
import com.codegym.service.IGenerateService;

import java.util.List;
import java.util.Optional;

public interface ISingerService extends IGenerateService<Singer> {
    List<Singer> getNewSinger();

    Optional<Singer> findBySingerName(String singerName);
}

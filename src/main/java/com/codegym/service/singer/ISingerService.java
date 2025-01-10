package com.codegym.service.singer;

import com.codegym.model.Singer;
import com.codegym.model.Song;
import com.codegym.service.IGenerateService;

import java.util.List;

public interface ISingerService extends IGenerateService<Singer> {
    List<Singer> getNewSingers();
}

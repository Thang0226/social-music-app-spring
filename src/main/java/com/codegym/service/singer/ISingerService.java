package com.codegym.service.singer;

import com.codegym.model.Singer;
import com.codegym.model.Song;
import com.codegym.service.IGenerateService;
import io.micrometer.observation.ObservationFilter;

import java.util.List;
import java.util.Optional;

public interface ISingerService extends IGenerateService<Singer> {

    List<Singer> getNewSingers();

    List<Singer> getNewSinger();

    Optional<Singer> findBySingerName(String singerName);

}

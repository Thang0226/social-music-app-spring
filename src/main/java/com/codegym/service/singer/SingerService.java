package com.codegym.service.singer;


import com.codegym.model.Singer;
import com.codegym.repository.ISingerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SingerService implements ISingerService {

    @Autowired
    private ISingerRepository iSingerRepository;

    @Override
    public Iterable<Singer> findAll() {
        return iSingerRepository.findAll();
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return iSingerRepository.findById(id);
    }


    @Override
    public void save(Singer singer) {

        iSingerRepository.save(singer);
    }

    @Override
    public void deleteById(Long id) {
        iSingerRepository.deleteById(id);
    }

    public List<Singer> getNewSinger() {
        return iSingerRepository.findAll().stream()
               .sorted(Comparator.comparing(Singer::getSingerName).reversed())
               .limit(5)
               .collect(Collectors.toList());
    }
}

package com.codegym.service.playList;

import com.codegym.model.PlayList;
import com.codegym.repository.PlayListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayListService implements IPlayListService{

    @Autowired
    private PlayListRepository playListRepository;

    @Override
    public List<PlayList> findAll() {
        return playListRepository.findAll();
    }

    @Override
    public Optional<PlayList> findById(Long id) {
        return playListRepository.findById(id);
    }

    @Override
    public PlayList save(PlayList playList) {
        playListRepository.save(playList);
        return playList;
    }

    @Override
    public void delete(Long id) {
        playListRepository.deleteById(id);
    }

}

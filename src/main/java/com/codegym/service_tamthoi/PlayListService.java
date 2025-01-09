package com.codegym.service_tamthoi;

import com.codegym.model.PlayList;
import com.codegym.model.Song;
import com.codegym.repository_tamthoi.PlayListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class PlayListService implements IPlayListService {

    @Autowired
    private PlayListRepository playListRepository;


    // Lấy danh sách playlist mới nhất
    public List<PlayList> getNewPlaylists() {
        return playListRepository.findNewPlaylists(); // Truy vấn để lấy playlist mới nhất

    }

    // Lấy danh sách playlist được like nhiều nhất
    public List<PlayList> getTopLikedPlaylists() {
        return playListRepository.findTopLikedPlaylists(); // Truy vấn để lấy playlist được like nhiều nhất
    }





}
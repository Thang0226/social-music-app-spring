package com.codegym.service_tamthoi;

import com.codegym.model.Playlist;
import com.codegym.repository_tamthoi.PlaylistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class PlaylistService implements IPlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;


    // Lấy danh sách playlist mới nhất
    public List<Playlist> getNewPlaylists() {
        return playlistRepository.findNewPlaylists(); // Truy vấn để lấy playlist mới nhất

    }

    // Lấy danh sách playlist được like nhiều nhất
    public List<Playlist> getTopLikedPlaylists() {
        return playlistRepository.findTopLikedPlaylists(); // Truy vấn để lấy playlist được like nhiều nhất
    }





}
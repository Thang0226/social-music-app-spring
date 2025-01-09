package com.codegym.service;

import com.codegym.model.Playlist;
import com.codegym.repository.IPlaylistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class PlaylistService implements IPlaylistService {

    @Autowired
    private IPlaylistRepository playlistRepository;


    public List<Playlist> getNewPlaylists() {
        return playlistRepository.findNewPlaylists(); // Truy vấn để lấy playlist mới nhất

    }

    public List<Playlist> getTopLikedPlaylists() {
        return playlistRepository.findTopLikedPlaylists(); // Truy vấn để lấy playlist được like nhiều nhất
    }

   public List<Playlist> getTopPlayedPlaylists() {
        return playlistRepository.findTopPlayedPlaylists();
   }



}
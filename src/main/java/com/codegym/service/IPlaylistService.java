package com.codegym.service;


import com.codegym.model.Playlist;
import com.codegym.repository.IPlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface IPlaylistService {

    List<Playlist> getNewPlaylists();

     List<Playlist> getTopLikedPlaylists();

    List<Playlist> getTopPlayedPlaylists();

}
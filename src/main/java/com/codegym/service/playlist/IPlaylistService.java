package com.codegym.service.playlist;

import com.codegym.model.Playlist;
import com.codegym.service.IGenerateService;

import java.util.List;

public interface IPlaylistService extends IGenerateService<Playlist> {
    List<Playlist> getNewPlaylists();

    List<Playlist> getTopLikedPlaylists();

    List<Playlist> getTopPlayedPlaylists();
}

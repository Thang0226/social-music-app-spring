package com.codegym.service;

import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Song;

import java.util.List;

public interface ISongService extends IGenerateService<Song> {
    List<Song> getTopPlayedSongs();
    List<Song> getNewSongs();
    List<Song> getTopLikedSongs();

    List<UserSongDTO> findAllSongsByUserId(Long userId);
}

package com.codegym.service;

import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Genre;
import com.codegym.model.Song;

import java.util.List;
import java.util.Optional;

public interface ISongService extends IGenerateService<Song> {
    List<Song> getTopPlayedSongs();
    List<Song> getNewSongs();
    List<Song> getTopLikedSongs();

    List<UserSongDTO> findAllSongsByUserId(Long userId);

    List<Song> findSongBySingers(Long singerId);
    Optional<Song> findByName(String name);
}

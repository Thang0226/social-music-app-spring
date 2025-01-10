package com.codegym.service.listening;



import com.codegym.model.DTO.listening.SongDTO;
import com.codegym.model.Song;

import java.util.List;
import java.util.Optional;

public interface IListeningService {
    Optional<Song> findById(Long id);
    List<SongDTO> searchSongs(String keyword);
    List<SongDTO> getLatestSongs();
    List<SongDTO> getMostPlayedSongs();
}


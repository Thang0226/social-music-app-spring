package com.codegym.service.listening;



import com.codegym.model.DTO.listening.SongDTO;
import java.util.List;


public interface IListeningService {
    List<SongDTO> searchSongs(String keyword);
    List<SongDTO> getLatestSongs();
    List<SongDTO> getMostPlayedSongs();
    List<SongDTO> getAllSongs();
    List<SongDTO> getMostLikedSongs();
}


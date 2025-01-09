package com.codegym.service_tamthoi;

import com.codegym.model.Song;
import com.codegym.repository_tamthoi.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SongService implements ISongService {

    @Autowired
    private SongRepository songRepository;

    public List<Song> getTopPlayedSongs() {
        return songRepository.findTopPlayedSongs();
    }

    public List<Song> getNewSongs() {
        return songRepository.findNewSongs();
    }

    public List<Song> getTopLikedSongs() {
        return songRepository.findTopLikedSongs();
    }

}

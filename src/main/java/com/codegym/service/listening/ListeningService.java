package com.codegym.service.listening;

import com.codegym.model.DTO.listening.SongDTO;
import com.codegym.model.Song;
import com.codegym.repository.IListeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ListeningService implements IListeningService {

    @Autowired
    private IListeningRepository listeningRepository;


    @Override
    public List<SongDTO> searchSongs(String keyword) {
        List<Song> songs = listeningRepository.searchSongsByName(keyword);
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<SongDTO> getLatestSongs() {
        List<Song> songs = listeningRepository.findLatestSongs();
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<SongDTO> getMostPlayedSongs() {
        List<Song> songs = listeningRepository.findMostPlayedSongs();
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public SongDTO convertToDTO(Song song) {
        Set<String> singers = song.getSingers().stream().map(singer -> singer.getSingerName()).collect(Collectors.toSet());
        Set<String> genres = song.getGenres().stream().map(genre -> genre.getName()).collect(Collectors.toSet());

        return new SongDTO(
                song.getId(),
                song.getName(),
                song.getDescription(),
                song.getMusicFile(),
                song.getImageFile(),
                song.getUploadTime(),
                song.getLikeCount(),
                song.getListeningCount(),
                singers,
                genres
        );
    }
    @Override
    public List<SongDTO> getAllSongs() {
        List<Song> songs = listeningRepository.findAll();
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    @Override
    public List<SongDTO> getMostLikedSongs() {
        List<Song> songs = listeningRepository.findMostLikedSongs();
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}


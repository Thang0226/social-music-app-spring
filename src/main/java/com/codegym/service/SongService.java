package com.codegym.service;

import com.codegym.model.DTO.song.UserSongDTO;
import com.codegym.model.Genre;
import com.codegym.model.Song;
import com.codegym.repository.ISongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SongService implements ISongService {
    @Autowired
    private ISongRepository iSongRepository;

    @Override
    public Iterable<Song> findAll() {
        return iSongRepository.findAll();
    }

    @Override
    public Optional<Song> findById(Long id) {
        return iSongRepository.findById(id);
    }

    @Override
    public void save(Song song) {
        iSongRepository.save(song);
   }

    @Override
    public void deleteById(Long id) {
        iSongRepository.deleteById(id);
    }



    public List<Song> getTopPlayedSongs() {
        return iSongRepository.findTopPlayedSongs();
    }

    public List<Song> getNewSongs() {
        return iSongRepository.findNewSongs();
    }

    public List<Song> getTopLikedSongs() {
        return iSongRepository.findTopLikedSongs();
    }


    @Override
    public List<UserSongDTO> findAllSongsByUserId(Long userId) {
        return iSongRepository.findAllSongsByUserId(userId);
    }

    @Override
    public List<Song> findSongBySingers(Long singerID) {
        return iSongRepository.findSongBySingersIdOrderByListeningCountDesc(singerID);
    }

    @Override
    public Optional<Song> findByName(String name) {
        return iSongRepository.findByName(name);
    }

}

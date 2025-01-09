package com.codegym.service.playlist;

import com.codegym.model.Playlist;
import com.codegym.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService implements IPlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Override
    public List<Playlist> findAll() {
        return playlistRepository.findAll();
    }

    @Override
    public Optional<Playlist> findById(Long id) {
        return playlistRepository.findById(id);
    }

    @Override
    public Playlist save(Playlist playlist) {
        playlistRepository.save(playlist);
        return playlist;
    }

    @Override
    public void deleteById(Long id) {
        playlistRepository.deleteById(id);
    }

}

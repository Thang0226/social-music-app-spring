package com.codegym.service.playlist;

import com.codegym.model.Playlist;
import com.codegym.repository.IPlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService implements IPlaylistService {

    @Autowired
    private IPlaylistRepository playlistRepository;

    @Override
    public List<Playlist> findAll() {
        return playlistRepository.findAll();
    }

    @Override
    public Optional<Playlist> findById(Long id) {
        return playlistRepository.findById(id);
    }

    @Override
    public void save(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    @Override
    public void deleteById(Long id) {
        playlistRepository.deleteById(id);
    }

    @Override
    public List<Playlist> getNewPlaylists() {
        return playlistRepository.findNewPlaylists(); // Truy vấn để lấy playlist mới nhất

    }

    @Override
    public List<Playlist> getTopLikedPlaylists() {
        return playlistRepository.findTopLikedPlaylists(); // Truy vấn để lấy playlist được like nhiều nhất
    }

    @Override
    public List<Playlist> getTopPlayedPlaylists() {
        return playlistRepository.findTopPlayedPlaylists();
    }

}

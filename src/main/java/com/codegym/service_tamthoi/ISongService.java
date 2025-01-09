package com.codegym.service_tamthoi;


import com.codegym.model.Song;

import java.util.List;

public interface ISongService {
   List<Song> getTopPlayedSongs();
    List<Song> getNewSongs();
    List<Song> getTopLikedSongs();
}
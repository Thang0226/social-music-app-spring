const API_BASE_URL = 'http://localhost:8080';

let song_id = localStorage.getItem("song-id");
let song = {};

$(document).ready(function(){
    $.ajax({
        url: `http://localhost:8080/api/songs/${song_id}`,
        method: 'GET',
        success: function(result){
            song = result;

            $("#song-details").html(
                `<a href="#"> ${song.singers} </a>
                <span class="mx-2">&bullet;</span> ${song.uploadTime} <span class="mx-2">&bullet;</span>
                <h1 class="mb-3">
                    <img width="150" height="150" src="${API_BASE_URL}/images/${song.imageFile}" alt="No Image" class="img-thumbnail rounded-circle">
                    ${song.name}
                </h1>`
            );

            $("#song-player").html(
                `<div class="player mb-5">
                <audio id="player2" preload="none" controls style="width: 100%">
                <source src="${API_BASE_URL}/audios/${song.musicFile}" type="audio/mp3">
                </audio>
                </div>`
            );
        }
    });
})
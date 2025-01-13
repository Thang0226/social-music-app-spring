function storeSongId(songId) {
    localStorage.setItem("song-id",songId)
}

function storeUserId(userId) {
    localStorage.setItem("user-id",userId)
}

function storeSingerId(singerId) {
    localStorage.setItem("singer-id",singerId)
}

function storePlaylistId(playlistId) {
    localStorage.setItem("playlist-id", playlistId)
}

const API_BASE_URL = 'http://localhost:8080';
let userId = localStorage.getItem("user-id");
let token = localStorage.getItem("token");

$(document).ready(function(){
    $.ajax({
        url: `http://localhost:8080/api/homepage/new-songs`,
        method: 'GET',
        success: function(result){
            let songs = result;
            console.log(songs);
            let content = "";
            for (let i = 0; i < 10; i++) {
                let singers = "";
                for (let j = 0; j < songs[i].singers.length; j++) {
                    singers += `<a href="singer.html" onclick="storeSingerId(${songs[i].singers[j].id})"> ${songs[i].singers[j].singerName}</a>`
                    if (j < songs[i].singers.length - 1) {
                        singers += `, `
                    }

                }
                let localDate = moment(songs[i].uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
                content += `
                        <div class="d-block d-md-flex podcast-entry bg-white mb-3" data-aos="fade-up">
                          <div class="image" style="background-image: url('${API_BASE_URL}/images/${songs[i].imageFile}')">
                          </div>
                          <div class="text w-100">
                            <h3 class="font-weight-light">
                              <a href="song.html" onclick="storeSongId(${songs[i].id}); storeUserId(userId)">
                                ${songs[i].name}
                              </a>
                            </h3>
                            <div class="text-white mb-3">
                              <span class="text-black-opacity-05">
                                <span>By ${singers} <span class="sep">&bullet;
                                </span> ${localDate} <span class="sep">&bullet;
                                <span> <i class="bi bi-eye"></i> <span id="listening-count">
                                    ${parseInt(songs[i].listeningCount, 10).toLocaleString('vi-VN')}</span>
                                </span>
                              </span>
                            </div>
                        
                            <div id="song-player">
                              <div class="player">
                                <audio id="player2" preload="none" controls style="max-width: 100%">
                                  <source src="${API_BASE_URL}/audios/${songs[i].musicFile}" type="audio/mp3">
                                </audio>
                              </div>
                            </div>
                            </div>
                        </div>
                    `;



            }
            $("#new-songs").html(content);
            initializeMediaPlayers();
        }
    });
})


function getTopPlayedSongs() {
    $.ajax({
        url: "http://localhost:8080/api/homepage/top-played-songs", // URL của API
        method: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < 10; i++) {
                content +=`
                <li>
                    <a href="playlist.html" class="d-flex align-items-center">
                        <img src="${API_BASE_URL}/images/${data[i].imageFile}" 
                        alt="${data[i].name}" class="img-fluid mr-2" 
                        style="max-width: 50px; max-height: 50px; width: 100%; height: auto;">
                        <div class="podcaster">
                            <span class="d-block" style="font-weight: bold">${data[i].name}</span>
                            <span class="small">
                            ${parseInt(data[i].listeningCount, 10).toLocaleString('vi-VN')} lượt nghe
                            </span>
                        </div>
                    </a>
                </li>
                `
            }
            $("#popular-songs").html(content)
        }
    })
}

getTopPlayedSongs();

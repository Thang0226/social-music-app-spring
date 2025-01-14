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
let songId = localStorage.getItem("song-id");
let userId = localStorage.getItem("user-id");
let token = localStorage.getItem("token");


// Get latest songs
function initializeNewSongs() {
    $.ajax({
        url: `http://localhost:8080/api/homepage/new-songs`,
        method: 'GET',
        success: function(result){
            let songs = result;
            console.log(songs);
            let content = "";
            for (let i = 0; i < 14 && i < songs.length; i++) {
                let singers = "";
                for (let j = 0; j < songs[i].singers.length; j++) {
                    singers += `<a href="singer.html" onclick="storeSingerId(${songs[i].singers[j].id})"> ${songs[i].singers[j].singerName}</a>`
                    if (j < songs[i].singers.length - 1) {
                        singers += `, `
                    }
                }
                let localDate = moment(songs[i].uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
                content += `
                        <div class="d-block d-flex podcast-entry bg-white mb-3 col-md-12 col-lg-6 m-auto gap-0 p-0"
                         data-aos="fade-up" style="width: 49%">
                          <div class="image-container">
                              <div
                                  class="image"
                                  style="background-image: url('${API_BASE_URL}/images/${songs[i].imageFile}');">
                                  <div class="play-button"
                                  onclick="showMainPlayer('${API_BASE_URL}/audios/${songs[i].musicFile}'); 
                                  getSongInfoForMPC(${songs[i].id})">
                                    <i class="bi bi-play-circle"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="w-100">                        
                              <div class="text-white h-100 justify-content-center p-2">
                                  <h5>
                                      <a href="song.html" onclick="storeSongId(${songs[i].id}); storeUserId(${userId})"
                                      class="">
                                           ${songs[i].name}
                                      </a>
                                  </h5>                              
                                  <span class="text-black-opacity-05">
                                      <span>By ${singers} <br> ${localDate} 
                                          <span class="sep">&bullet;</span>
                                          <span> <i class="bi bi-headphones"></i> 
                                              <span id="listening-count">
                                               ${parseInt(songs[i].listeningCount, 10).toLocaleString('vi-VN')}</span>
                                          </span>
                                          <span class="sep">&bullet;</span>
                                          <span><i class="bi bi-heart-fill" id="heart-icon"></i> ${songs[i].likeCount}</span>
                                      </span>
                                  </span>
                            </div>                     
                          </div>
                        </div>
                    `;
            }
            $("#new-songs").html(content);

        }
    });
}
initializeNewSongs();


function increaseViewCount(songId) {
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/update-listening-count/${songId}`,
        type: 'PUT',
        success: function (result) {
            console.log(result)

        }
    })
}

function showMainPlayer(audioSrc) {
    // Unhide the main player
    let mainPlayerContainer = document.getElementById('main-player-container');
    let mainPlayer = document.getElementById('mep_1');
    let songDetails = document.getElementById('song-details');
    mainPlayerContainer.classList.remove('d-none');
    mainPlayerContainer.classList.add('d-flex');
    mainPlayer.classList.add('d-flex');
    songDetails.classList.add('d-flex');

    getSongInfoForMPC(songId);

    // Update the audio source
    let mainAudio = mainPlayer.querySelector('audio');
    mainAudio.src = audioSrc;
    mainAudio.play();
}

function getSongInfoForMPC(songId) {
    $.ajax({
        url: `http://localhost:8080/api/songs/${songId}`,
        method: 'GET',
        success: function (data) {
            let singers = "";
            for (let j = 0; j < data.singers.length; j++) {
                singers += `<a href="singer.html" onclick="storeSingerId(${data.singers[j].id})"> ${data.singers[j].singerName}</a>`
                if (j < data.singers.length - 1) {
                    singers += `, `
                }
            }
            let content = "";
            content +=`           
                <img src="${API_BASE_URL}/images/${data.imageFile}" 
                alt="${data.name}" class="img-fluid mr-2 p-1" 
                style="max-width: 80px; max-height: 80px; width: 100%; height: 80px;">
                <div class="podcaster text-start">
                    <span style="font-weight: bold">
                        <a href="song.html" onclick="storeSongId(${data.id}); storeUserId(${userId})"> 
                            ${data.name}
                        </a>                       
                    </span><br>
                    <span>
                        ${singers}
                    </span>
                </div>         
            `
            $("#song-details").html(content)
        }
    })
}

function getTopPlayedSongs() {
    $.ajax({
        url: "http://localhost:8080/api/homepage/top-played-songs", // URL của API
        method: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < 10; i++) {
                content +=`
                <li>
                    <a href="song.html" class="d-flex align-items-center" 
                    onclick="storeSongId(${data[i].id}); storeUserId(${userId})">
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

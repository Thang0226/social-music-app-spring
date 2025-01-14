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
const API_BASE_URL = 'http://localhost:8080';

// Get latest songs
function initializeNewSongs() {
    $.ajax({
        url: `http://localhost:8080/api/homepage/new-songs`,
        method: 'GET',
        success: function(result){
            let songs = result;
            console.log(songs);
            let content = "";
            for (let i = 0; i < 10 && i < songs.length; i++) {
                let singers = "";
                for (let j = 0; j < songs[i].singers.length; j++) {
                    singers += `<a href="listsongbysingername.html" onclick="storeSingerId(${songs[i].singers[j].id})"> ${songs[i].singers[j].singerName}</a>`
                    if (j < songs[i].singers.length - 1) {
                        singers += `, `
                    }
                }
                let localDate = moment(songs[i].uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
                content += `
                        <div class="d-block d-md-flex podcast-entry bg-white mb-3" data-aos="fade-up">
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
                          <div class="text">
                            <h3 class="font-weight-light">
                              <a href="song.html" onclick="storeSongId(${songs[i].id}); storeUserId(${userId})">
                                ${songs[i].name}
                              </a>
                            </h3>
                            <div class="text-white mb-3">
                              <span class="text-black-opacity-05">
                                <span>By ${singers} <span class="sep">&bullet;</span> ${localDate} <span class="sep">&bullet;</span>
                                  <span> <i class="bi bi-eye"></i> <span id="listening-count">
                                      ${parseInt(songs[i].listeningCount, 10).toLocaleString('vi-VN')}</span>
                                  </span>
                                </span>
                              </span>
                            </div>                     
                          </div>
                        </div>
                    `;
            }
            $("#new-songs").html(content);
            initializeMediaPlayers();
        }
    });
}

initializeNewSongs();

// MediaElement
function initializeMediaPlayers() {
    let mediaElements = document.querySelectorAll('video, audio'), total = mediaElements.length;

    for (let i = 0; i < total; i++) {
        new MediaElementPlayer(mediaElements[i], {
            features: ['playpause', 'current', 'progress', 'duration', 'volume'],
            pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@7.0.7/build/',
            shimScriptAccess: 'always',
            success: function (mediaElement) {
                let target = document.body.querySelectorAll('.player'), targetTotal = target.length;
                for (let j = 0; j < targetTotal; j++) {
                    target[j].style.visibility = 'visible';
                }
                // Increase view count after 30 seconds
                mediaElement.addEventListener('timeupdate', function () {
                    if (mediaElement.currentTime >= 30) {
                        // Call your function to increase the view count
                        increaseViewCount(songId);
                        // Remove the event listener after it triggers once
                        mediaElement.removeEventListener('timeupdate', arguments.callee);
                    }
                });
            }
        });
    }
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
                alt="${data.name}" class="img-fluid mr-2" 
                style="max-width: 80px; max-height: 80px; width: 100%; height: auto;">
                <div class="podcaster">
                    <span class="d-block" style="font-weight: bold">
                        <a href="song.html" onclick="storeSongId(${data.id}); storeUserId(${userId})"> ${data.name}</a>                       
                    </span>
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

const API_BASE_URL = 'http://localhost:8080';
let user_id = localStorage.getItem("user-id");
$(document).ready(function() {
    $.ajax({
        url: `http://localhost:8080/api/songs/by-user/${user_id}`,
        method: 'GET',
        success: function(result){
            console.log(result);
            song = result;

            let songsHtml = '';
            result.forEach(song => {
                const localTime = song.uploadTime;
                songsHtml += `
                    <div class="d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate" data-aos="fade-up">
                        <img width="150" height="150" src="${API_BASE_URL}/images/${song.imageFile}" alt="Thumbnail Image" class="image">
                        <div class="text"  style="padding-bottom: 50px">
                            <h3 class="font-weight-light"><a href="song.html" onclick>${song.songName}</a></h3>
                            <div class="text-white mb-3">
                                <span class="text-black-opacity-05">
                                    <small>
                                        By ${song.userName}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleDateString()}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleTimeString()}
                                    </small>
                                </span>
                            </div>
                            <p>${song.description}</p>
                            <div class="player">
                                <audio  controls preload="none" style="width: 100%;">
                                    <source src="${API_BASE_URL}/music/${song.musicFile}" type="audio/mp3">
                                </audio>
                            </div>                            
                            
                        </div>
                        <div class="actions p-3 d-flex justify-content-end gap-3">
                                <button id="update" class="btn btn-secondary h-25 d-flex align-items-center" onclick="updateSong()"><i class="bi bi-pencil"></i></button>
                                <button id="delete" class="btn btn-danger h-25 d-flex align-items-center" onclick="deleteSong()"><i class="bi bi-trash"></i></button>
                            </div>
                    </div>
                `;
            })
            $("#newCreatedSong").html(songsHtml);
            initializeMediaPlayers();
        },
        error: function (err) {
            console.error('Lỗi khi lấy danh sách bài hát:', err);
        }
    })
})




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

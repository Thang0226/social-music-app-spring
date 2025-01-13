const API_BASE_URL = 'http://localhost:8080';
let user_id = localStorage.getItem("user-id");
console.log("Hello");
$(function () {
    console.log("jQuery ready function is working!");
    $("#update-form").hide();
    $.ajax({
        url: `http://localhost:8080/api/songs/by-user/${user_id}`,
        method: 'GET',
        success: function(result){
            console.log(result);

            let songsHtml = '';
            result.forEach(item => {
                console.log(item.songId);
                const localTime = item.uploadTime;
                songsHtml += `
                    <div class="d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate" data-aos="fade-up">
                        <img width="150" height="150" src="${API_BASE_URL}/images/${item.imageFile}" alt="Thumbnail Image" class="image">
                        <div class="text" style="padding-bottom: 50px">
                            <h3 class="font-weight-light"><a href="song.html" onclick="storeSongId(${item.songId})">${item.songName}</a></h3>
                            <div class="text-white mb-3">
                                <span class="text-black-opacity-05">
                                    <small>
                                        By ${item.userName}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleDateString()}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleTimeString()}
                                    </small>
                                </span>
                            </div>
                            <p>${item.description}</p>
                            <div class="player">
                                <audio  controls preload="none" style="width: 100%;">
                                    <source src="${API_BASE_URL}/music/${item.musicFile}" type="audio/mp3">
                                </audio>
                            </div>                            
                            
                        </div>
                        <div class="actions p-3 d-flex justify-content-end gap-3">
                                <button id="update" class="btn btn-secondary h-25 d-flex align-items-center" onclick="updateSong(${item.songId})"><i class="bi bi-pencil"></i></button>
                                <button id="delete" class="btn btn-danger h-25 d-flex align-items-center" onclick="deleteSong(${item.songId})"><i class="bi bi-trash"></i></button>
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

function storeSongId(songId) {
    localStorage.setItem("song-id",songId)
}

function updateSong(id) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/songs/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (song){
            console.log(song);

            let content = `            
                    <button type="submit" class="btn btn-primary" onclick="updateSongData(song.songId)">Update</button>
                    <button id="cancelUpdate" class="btn btn-danger">Cancel</button>`
            $("#buttons").html(content);
            $("#name").val(song.name);
            $("#musicFile")[0].files[0];
            $("#imageFile")[0].files[0];
            $("#description").val(song.description);

            $("#update-form").show();
        },
    })
}

$("#cancelUpdate").click(()=>{
    $("#update-form").hide();
})

function deleteSong(id){
    console.log("Successs")
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/songs/${id}`,
        success: function(){
            location.reload();
            console.log("Deleted")
        },
        error: function(xhr, status, error) {
            console.error("Error deleting song:", error);
            alert("Unable to delete song. Please ensure there are no dependencies.");
        }
    })
}
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

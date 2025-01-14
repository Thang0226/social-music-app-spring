const API_BASE_URL = 'http://localhost:8080';
let user_id = localStorage.getItem("user-id");
console.log("Hello");
$(function () {
    $("#update-form").hide();

    $.ajax({
        url: `http://localhost:8080/api/songs/by-user/${user_id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(result){
            console.log(result);

            let songsHtml = '';
            result.forEach(item => {
                console.log(item.songId);
                const localTime = item.uploadTime;
                songsHtml += `
                    <div class="d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate" data-aos="fade-up">
                        <img width="150" height="150" src="${API_BASE_URL}/images/${item.imageFile}" alt="Thumbnail Image" class="image">
                        <div class="text" >
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
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
                style="max-width: 80px; max-height: 80px; width: 100%; height: auto;">
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

function storeSongId(songId) {
    localStorage.setItem("song-id",songId)
}

function updateSong(id) {
    event.preventDefault();
    $.ajax({
        type: "GET", // fetching data
        url: `http://localhost:8080/api/songs/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
        success: function (song){
            console.log(song);
            $("#update-form").show();


            $("#name").val(song.name);
            $("#description").val(song.description);

            $("#update-form").data("current-music", song.musicFile);
            $("#update-form").data("current-image", song.imageFile);


            if (!$("#songId").length) {
                $("#update-form").append(`<input type="hidden" id="songId" value="${song.id}">`);
            } else {
                $("#songId").val(song.id);
            }

            let content = `
                <div class="col-md-12 mt-3">
                    <button type="button" class="btn btn-primary" onclick="updateSongData()">Update</button>
                    <button type="button" id="cancelUpdate" class="btn btn-danger">Cancel</button>
                </div>`;
            $("#buttons").html(content);
            $("#cancelUpdate").click(()=>{
                $("#update-form").hide();
            })
            // Show current file names
            if (song.musicFile) {
                $("#currentMusic").text(`Current audio: ${song.musicFile}`);
            }
            if (song.imageFile) {
                $("#currentImage").text(`Current image: ${song.imageFile}`);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching song:", error);
            alert("Error loading song data");
        }
    })
}

function updateSongData() {
    const songId = $("#songId").val();

    // Create FormData object
    const formData = new FormData();

    // Add basic fields
    formData.append('name', $("#name").val());
    formData.append('description', $("#description").val());

    // Add files only if new ones are selected
    const musicFile = $("#musicFile")[0].files[0];
    const imageFile = $("#imageFile")[0].files[0];

    if (musicFile) {
        formData.append('musicFile', musicFile);
    } else {
        // If no new file selected, send the current filename
        formData.append('musicFile', new File([], $("#update-form").data("current-music")));
    }

    if (imageFile) {
        formData.append('imageFile', imageFile);
    } else {
        // If no new file selected, send the current filename
        formData.append('imageFile', new File([], $("#update-form").data("current-image")));
    }

    // Add other fields (singers, genres) if they exist
    if ($("#selectedSingers").val()) {
        formData.append('singers', $("#selectedSingers").val());
    }
    if ($("#selectedGenres").val()) {
        formData.append('genres', $("#selectedGenres").val());
    }

    $.ajax({
        url: `${API_BASE_URL}/api/songs/${songId}`,
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(response) {
            console.log("Update successful:", response);
            $("#update-form").hide();
            location.reload(); // Refresh the page to show updated data
        },
        error: function(xhr, status, error) {
            console.error("Error updating song:", error);
            alert("Error updating song. Please try again.");
        }
    });
}

function deleteSong(id){
    console.log("Successs")
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/songs/${id}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
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

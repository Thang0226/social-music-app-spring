const apiUrl = "http://localhost:8080/api/songListen";
const audioPlayer = document.getElementById('audioPlayer');


const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get('keyword');


if (keyword) {
    $("#searchInput").val(keyword);
    fetchSearchResults(keyword);
}


function searchSongs() {
    const keyword = $("#searchInput").val();
    if (keyword) {
        window.location.href = `search_results.html?keyword=${encodeURIComponent(keyword)}`;
    }
}


function fetchSearchResults(keyword) {
    $.ajax({
        url: `${apiUrl}/search`,
        method: "GET",
        data: { keyword },
        success: function (data) {
            displaySongs(data);
        },
        error: function () {
            alert("Không tìm thấy bài hát.");
        }
    });
}


function displaySongs(data) {
    const songList = $("#songList");
    songList.empty();

    if (data.length === 0) {
        songList.append('<p class="text-center w-100">Không tìm thấy bài hát nào.</p>');
        return;
    }

    data.forEach(song => {
        const songCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${song.imageFile}" class="card-img-top" alt="${song.name}">
                    <div class="card-body">
                        <h5 class="card-title">${song.name}</h5>
                        <p class="card-text">${song.description}</p>
                        <button class="btn btn-primary" onclick="playSong('${song.musicFile}')">
                            <i class="fas fa-play"></i> Nghe ngay
                        </button>
                    </div>
                    <div class="card-footer text-muted">
                        <small>Nghe: ${song.listeningCount} | Thích: ${song.likeCount}</small>
                    </div>
                </div>
            </div>
        `;
        songList.append(songCard);
    });
}


function playSong(musicFile) {
    audioPlayer.src = musicFile;
    audioPlayer.play();
}


function getAllSongs() {
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        }
    });
}


function getLatestSongs() {
    $.ajax({
        url: `${apiUrl}/lastest`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        }
    });
}


function getMostPlayedSongs() {
    $.ajax({
        url: `${apiUrl}/most-played`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        }
    });
}


function getMostLikedSongs() {
    $.ajax({
        url: `${apiUrl}/most-liked`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        }
    });
}

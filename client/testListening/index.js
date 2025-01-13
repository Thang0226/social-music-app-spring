const apiUrl = "http://localhost:8080/api/songs";  // Thay đổi nếu cần thiết
const audioPlayer = document.getElementById("audio-player");
const songListDiv = document.getElementById("songList");

// Phát bài hát
function playSong(musicFile) {
    audioPlayer.src = musicFile;
    audioPlayer.play();
}

// Tạo giao diện hiển thị bài hát
function displaySongs(songs) {
    songListDiv.innerHTML = "";
    songs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.className = "song-item";

        const img = document.createElement("img");
        img.src = song.imageFile || "default.jpg";

        const infoDiv = document.createElement("div");
        infoDiv.className = "song-info";

        const title = document.createElement("h3");
        title.innerText = song.name;

        const description = document.createElement("p");
        description.innerText = song.description;

        const playButton = document.createElement("button");
        playButton.className = "btn";
        playButton.innerText = "Play";
        playButton.onclick = () => playSong(song.musicFile);

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);

        songItem.appendChild(img);
        songItem.appendChild(infoDiv);
        songItem.appendChild(playButton);

        songListDiv.appendChild(songItem);
    });
}

// Tìm kiếm bài hát (AJAX)
function searchSongs() {
    const keyword = $("#searchInput").val();
    $.ajax({
        url: `${apiUrl}/search`,
        method: "GET",
        data: { keyword: keyword },
        success: function (data) {
            displaySongs(data);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

// Lấy bài hát mới nhất (AJAX)
function getLatestSongs() {
    $.ajax({
        url: `${apiUrl}/latest`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

// Lấy bài hát nghe nhiều nhất (AJAX)
function getMostPlayedSongs() {
    $.ajax({
        url: `${apiUrl}/most-played`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

// Lấy tất cả bài hát (AJAX)
function getAllSongs() {
    $.ajax({
        url: `${apiUrl}`,
        method: "GET",
        success: function (data) {
            displaySongs(data);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}


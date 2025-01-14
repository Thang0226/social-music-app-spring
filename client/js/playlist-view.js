const API_BASE_URL = 'http://localhost:8080';

// Gọi API và hiển thị bài hát khi trang load (ví dụ với playlist ID là 1)
let id = localStorage.getItem("playlist-id");
let songs;
let song_ind = 0;
localStorage.setItem('song-num', song_ind.toString());
getInformation(id);

function getInformation(id) {
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/api/playlist/${id}`,
        success: function (data) {
            let playlist = data.playlist;
            songs = data.playlist.songs;
            let localTime = moment(playlist.createTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
            $("#playlist-details").html(
                `
                <div class="align-items-center justify-content-center">
                    <h1>
                        ${playlist.name}
                    </h1>
                    </span>Added on ${localTime} <span class="mx-2">&bullet;</span>
                    <span><i class="bi bi-eye"></i> <span id="listening-count">
                    ${parseInt(playlist.listeningCount, 10).toLocaleString('vi-VN')}</span>
                </span>
                </div>
                `
            );

            $("#like-count").text(playlist.likeCount);



            let songHtml = "";
            songs.forEach((song, index) => {
                songHtml += `
                    <tr>
                        <td>${index + 1}</td> <!-- Dùng index + 1 để hiển thị thứ tự -->
                        <td>${song.name}</td>
                        <td>${song.likeCount}</td>
                        <td>${song.listeningCount}</td>
                        <td>${song.description}</td>
                        <td class="action-icons">
                            <button class="play-song-btn">▶️</button>
                            <button class="delete-song-btn" onclick="deleteSong(${song.id}, ${id})">❌</button>
                        </td>
                    </tr>`;
            });
            $("#songList").html(songHtml);

            // song player
            $("#song-player").html(
                `
                <div style="color: #3ca59d" id="song_name">Song playing: ${songs[song_ind].name}</div>
                <div class="player mb-3">
                <audio id="player2" preload="none" controls style="width: 100%">
                <source src="${API_BASE_URL}/audios/${songs[song_ind].musicFile}" type="audio/mp3">
                </audio>
                </div>`
            );

            initializeMediaPlayers();
        }
    });
}

function listPlaylist(id) {
    event.preventDefault()
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/playlist/like-playlist/${id}`,
        type: 'PUT',
        success: function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}

function unlikePlaylist(id) {
    event.preventDefault()
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/playlist/unlike-playlist/${id}`,
        type: 'PUT',
        success: function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}

// Xóa bài hát
function deleteSong(songsId, playlistId) {
    if (confirm("Bạn có chắc muốn xóa bài hát này?")) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/api/playlist/songs/${songsId}`, // Sửa URL đúng với API
            success: function () {
                alert("Xóa bài hát thành công!");
                loadSongs(playlistId); // Tải lại danh sách bài hát sau khi xóa
            },
            error: function () {
                alert("Không thể xóa bài hát.");
            }
        });
    }
}


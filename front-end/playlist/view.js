// Load danh sách bài hát trong playlist
function loadSongs(playlistId) {
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/api/playlists/${id}`,
        success: function (data) {
            const playlistName = data.playlistName; // Lấy tên playlist từ API
            $("#playlistName").text(playlistName);

            let songHtml = "";
            data.songs.forEach((song, index) => {
                songHtml += `
                    <tr>
                        <td>${index.id}</td>
                        <td>${song.name}</td>
                        <td>${song.singers}</td>
                        <td>${song.genres}</td>
                        <td>${song.listeningCount}</td>
                        <td class="action-icons">
                            <i class="fas fa-play" title="Phát"></i>
                            <i class="fas fa-edit" title="Chỉnh sửa"></i>
                            <i class="fas fa-trash" title="Xóa" onclick="deleteSong(${song.id}, ${playlistId})"></i>
                        </td>
                    </tr>`;
            });

            $("#songList").html(songHtml);
        },
        error: function () {
            alert("Không thể tải danh sách bài hát.");
        }
    });
}

// Xóa bài hát
function deleteSong(songId, playlistId) {
    if (confirm("Bạn có chắc muốn xóa bài hát này?")) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/api/songs/${songId}`,
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

// Khi trang sẵn sàng, tải danh sách bài hát
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistId = urlParams.get("playlistId"); // Lấy playlistId từ URL

    if (playlistId) {
        loadSongs(playlistId);
    } else {
        alert("Playlist không hợp lệ.");
    }
});

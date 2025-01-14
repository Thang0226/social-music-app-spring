// Load danh sách bài hát trong playlist
function getSongsInPlaylist(id) {
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/api/playlist/${id}`,
        success: function (data) {
            const playlistName = data.playlist;
            $("#playlistName").text(playlistName);

            let songHtml = "";
            data.songs.forEach((songs, index) => {
                songHtml += `
                    <tr>
                        <td>${index + 1}</td> <!-- Dùng index + 1 để hiển thị thứ tự -->
                        <td>${songs.name}</td>
                        <td>${songs.likeCount}</td>
                        <td>${songs.listeningCount}</td>
                        <td>${songs.description}</td>
                        <td class="action-icons">
                            <button class="play-song-btn">▶️</button>
                            <button class="delete-song-btn" onclick="deleteSong(${songs.id}, ${id})">❌</button>
                        </td>
                    </tr>`;
            });
            $("#songList").html(songHtml);
        },
    });
}
// Gọi API và hiển thị bài hát khi trang load (ví dụ với playlist ID là 1)
getSongsInPlaylist(id);

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


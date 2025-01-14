// Sample function to load playlist
function loadPlaylists() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/playlist",
        success: function (data) {
            let playlistHtml = "";
            data.forEach(playlist => {
                playlistHtml += `
                        <tr>
                            <td>${playlist.name}</td>
                            <td>${playlist.likeCount}</td>
                            <td>${playlist.listeningCount}</td>
                            <td>${playlist.songs ? playlist.songs.length : 0}</td>
                            <td class="action-icons">
                                <button class="play-song-btn" onclick="getSongsInPlaylist(${playlist.id})">▶️</button>
                                <button class="delete-song-btn" onclick="deletePlaylist(${playlist.id})">❌</button>
                            </td>
                        </tr>`;
            });
            $("#playlist").html(playlistHtml);
        },
        error: function () {
            alert("Không thể tải danh sách playlist.");
        }
    });
}
loadPlaylists()

function deletePlaylist(id) {
    if (confirm("Bạn có chắc muốn xóa playlist này?")) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/api/playlist/${id}`,
            success: function () {
                alert("Xóa playlist thành công!");
                loadPlaylists(); // Reload playlists
            },
            error: function (xhr) {
                alert("Không thể xóa playlist.");
            }
        });
    }
}
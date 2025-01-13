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
                                <i class="fas fa-play" title="Phát"></i>
                                <i class="fas fa-edit" title="Chỉnh sửa"></i>
                                <i class="fas fa-trash" title="Xóa" onclick="deletePlaylist(${playlist.id})"></i>
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
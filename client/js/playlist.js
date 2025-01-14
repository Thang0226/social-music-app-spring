// Sample function to load playlist
function loadPlaylists() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/playlist",
        success: function (data) {
            let playlistHtml = "";
            data.forEach((playlist, index) => {
                playlistHtml += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${playlist.name}</td>
                            <td>${playlist.likeCount}</td>
                            <td>${playlist.listeningCount}</td>
                            <td>${playlist.songs ? playlist.songs.length : 0}</td>
                            <td class="action-icons">
                                <button class="play-song-btn" onclick="getSongsInPlaylist(id)">▶️</button>
                            </td>
                            <td class="action-icons">
                                <button class="play-song-btn" onclick="getSongsInPlaylist(id)">▶️</button>
                            </td>
                            <td class="action-icons">
                                <button class="delete-song-btn" onclick="deletePlaylist(${playlist.id})">❌</button>                            </td>
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
            error: function () {
                alert("Không thể xóa playlist.");
            }
        });
    }
}

function searchPlaylist(keyword) {
    if (!keyword) {
        keyword = $("#searchInput").val().trim();
    }
    if (!keyword) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }

    $("#sectionTitle").text(`Kết quả tìm kiếm cho: "${keyword}"`);

    $.ajax({
        url: `http://localhost:8080/api/playlist/search?keyword=${keyword}`,
        method: "GET",
        data: { keyword },
        success: displayplaylist,
        error: () => {
            $("#playlist").html("<p class='text-center'>Không tìm thấy bài hát.</p>");
        }
    });
}
$(document).ready(function () {
    const keyword = getQueryParam("keyword");

    if (keyword) {
        $("#searchInput").val(keyword);
        searchPlaylist(keyword);
    } else {
        searchPlaylist();
    }
});


$(".btn-search").click(function () {
    searchPlaylist();
});


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
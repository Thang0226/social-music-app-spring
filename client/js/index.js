function storeSongId(songId) {
    localStorage.setItem("song-id",songId)
}

function storeUserId(userId) {
    localStorage.setItem("user-id",userId)
}

function storeSingerId(singerId) {
    localStorage.setItem("singer-id",singerId)
}

function storePlaylistId(playlistId) {
    localStorage.setItem("playlist-id", playlistId)
}

$(document).ready(function () {
    const playlistContainer = $(".featured-user .list-unstyled");

    // Hàm gọi API để lấy danh sách playlist
    function fetchPlaylist() {
        $.ajax({
            url: "http://localhost:8080/api/playlist", // URL của API
            method: "GET",
            dataType: "json",
            success: function (data) {
                // Xóa nội dung cũ
                playlistContainer.empty();

                // Lặp qua danh sách và thêm vào HTML
                data.forEach(playlist => {
                    const listPlaylist = `
            <li>
              <a href="#" class="d-flex align-items-center">
<!--                <img src="${playlist.image}" alt="${playlist.name}" class="img-fluid mr-2">-->
                <div class="podcaster">
                  <span class="d-block">${playlist.name}</span>
                  <span class="small">${playlist.listeningCount} lượt nghe</span>
                </div>
              </a>
            </li>
          `;
                    playlistContainer.append(listPlaylist);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching playlist:", error);
                playlistContainer.html("<p>Unable to load playlist. Please try again later.</p>");
            }
        });
    }

    // Gọi hàm fetchPlaylist khi trang tải
    fetchPlaylist();
});

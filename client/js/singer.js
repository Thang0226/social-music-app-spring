let singerId = localStorage.getItem("singer-id");
const API_BASE_URL = 'http://localhost:8080';
let currentPage = 0;
let pageSize = 10; // Number of comments per load

function getSingerComment(singerId, isLoadMore = false) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `http://localhost:8080/api/comments/singer-comment/${singerId}?page=${currentPage}&size=${pageSize}`,
        type: 'GET',
        success: function (data) {
            console.log(data);
            let comment = data.content;
            let content = "";

            for (let i = 0; i < comment.length; i++) {
                let localTime = moment(comment[i].commentTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm");
                content += `<div class="w-100 p-3 rounded-4 bg-light mb-3">
                    <strong class="font-weight-bold text-primary">${comment[i].username}</strong><br>
                    <span class="text-muted">${localTime}</span><br>
                    <p class="mt-2 mb-0">${comment[i].content}</p>
                </div>`
            }

            // If loading more, append to existing content
            if (isLoadMore) {
                $("#comments").append(content);
            } else {
                $("#comments").html(content);
            }

            // Show/hide load more button based on whether there are more comments
            if (comment.length < pageSize) {
                $("#load-more").hide();
            } else {
                $("#load-more").show();
            }
        }
    })
}

// function to handle loading more comments
function loadMore() {
    currentPage++;
    getSingerComment(singerId, true);
}

getSingerComment(singerId, false);

function postComment() {
    event.preventDefault();
    let content = $("#comment-box").val().trim();
    if (content === "") {
        return;
    }
    let comment = {
        user: {
            id: userId
        },
        singer: {
            id: singerId
        },
        content: content
    };
    $.ajax({
        headers: {
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/comments',
        type: 'POST',
        data: JSON.stringify(comment),
        success: function (response) {
            console.log(response)
            getSingerComment(singerId, false);
            $("#comment-box").val("")
        }
    })
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

//  get singer information
function getSingerInfo(singerId) {
    $.ajax({
        url: `http://localhost:8080/api/singers/${singerId}`,
        type: 'GET',
        success: function (result) {
            console.log(result);
            let content =`<h1 class="mb-3">${result.singerName}</h1>`;
            $('#singer-info').html(content);
        }
    })
}
getSingerInfo(singerId);

// get singer popular songs
function getSingerPopularSongs(singerId) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `${API_BASE_URL}/api/songs/singer-popular-song/${singerId}`,
        type: 'GET',
        success: function (result) {
            console.log(result);
            let content = '';
            for (let i = 0; i < result.length; i++) {
                let singers = "";
                for (let j = 0; j < result[i].singers.length; j++) {
                    singers += `<a href="singer.html" onclick="storeSingerId(${result[i].singers[j].id})"> ${result[i].singers[j].singerName}</a>`
                    if (j < result[i].singers.length - 1) {
                        singers += `, `
                    }
                }
                let localDate = moment(result[i].uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
                content =`
                 <div class="d-block d-md-flex podcast-entry bg-white mb-3 col-6 mt-3 mb-3 rounded-4" data-aos="fade-up">
                  <div class="image-container">
                    <div
                      class="image"
                      style="background-image: url('${API_BASE_URL}/images/${result[i].imageFile}');">
                      <div class="play-button"
                      onclick="showMainPlayer('${API_BASE_URL}/audios/${result[i].musicFile}'); 
                      getSongInfoForMPC(${result[i].id})">
                        <i class="bi bi-play-circle"></i>
                      </div>
                    </div>
                  </div>
                  <div class="text w-100">
                    <h3 class="font-weight-light">
                      <a href="song.html" onclick="storeSongId(${result[i].id}); storeUserId(userId)">
                        ${result[i].name}
                      </a>
                    </h3>
                    <div class="text-white mb-3">
                      <span class="text-black-opacity-05">
                        <span>${singers} <span class="sep">&bullet;</span> ${localDate} <span class="sep">&bullet;</span>
                          <span> <i class="bi bi-eye"></i> <span id="listening-count">
                              ${parseInt(result[i].listeningCount, 10).toLocaleString('vi-VN')}</span>
                          </span>
                        </span>
                      </span>
                    </div>                     
                  </div>
                </div>`;
            }
            $('#featured-song').html(content);
        }
    })
}
getSingerPopularSongs(singerId);
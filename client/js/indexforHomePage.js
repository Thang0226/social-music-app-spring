const API_BASE_URL = 'http://localhost:8080';

/* ----------------NHIEM VU 40: HIỂN THỊ BÀI HÁT MỚI NHẤT ------------------------ */
function getNewSongs() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/new-songs',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(song => {
                content += `
                    <div>
                        <strong>${song.title}</strong><br>
                        <span>Lượt view: ${song.views}</span><br>
                        <p>${song.artist}</p>
                    </div>`;
            });
            $("#new-songs").html(content);
        }
    });
}

/* ---------------- NHIỆM VỤ 41: HIỂN THỊ BÀI HÁT CÓ LƯỢT VIEW NHIỀU NHẤT------------------------ */
function getTopPlayedSongs() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/top-played-songs',
        type: 'GET',
        success: function (data) {
            let content = "";
            for (let i = 0; i < 6 && i < data.length; i++) {
                content += `
          <div class="song-card col-2">
            <div class="card">
     
              <img src="${API_BASE_URL}/images/${data[i].imageFile}"
                   alt="${data[i].name}" class="card-img-top">

              <div class="card-body text-center">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">
                  ${data[i].singers.map(s => s.singerName).join(', ')}
                </p>
                <button class="btn btn-primary btn-sm " onclick="playSong('${data[i].musicFile}')">Play</button>
              </div>
            </div>
          </div>`;
            }
            $("#top-played-songs").html(content);
        },
        error: function (xhr, status, error) {
            console.error("Lỗi:", error);
        }
    });
}

/* ---------------- NHIỆM VỤ 41: HIỂN THỊ BÀI HÁT MỚI NHẤT <da fix thanh bai hat duoc nghe nhieu nhat> VỪA ĐƯỢC THÊM VÀO <da co> <done>------------------------ */
// function getNewSongs() {   //bản chất là để hien thi bai hát dược nghe nhiều nhất
//     $.ajax({
//         headers: {
//             'accept': 'application/json',
//             'content-type': 'application/json',
//         },
//         url: 'http://localhost:8080/api/homepage/top-played-songs',
//         type: 'GET',
//         success: function (data) {
//             let content = "";
//             for(let i=0; i < 6; i++) {
//                 content += `
//           <div class="song-card col-2">
//             <div class="card">
//
//
//               <img src="${data[i].imageFile}"
//                    alt="${data[i].name}" class="card-img-top">
//
//               <div class="card-body text-center">
//                 <h5 class="card-title">${data[i].name}</h5>
//                 <p class="card-text">
//                   ${data[i].singers.map(s => s.singerName).join(', ')}
//                 </p>
//                 <button class="btn btn-primary btn-sm " onclick="playSong('${data[i].musicFile}')">Play</button>
//               </div>
//             </div>
//           </div>`;
//             };
//             $("#new-songs-container").html(content);
//         },
//         error: function (xhr, status, error) {
//             console.error("Lỗi:", error);
//         }
//     });
// }

/* ----------------NHIEM VU 43: HIỂN THỊ BÀI HÁT CÓ LƯỢT LIKE NHIỀU NHẤT<da co> ------------------------ */
function getTopLikedSongs() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/top-liked-songs',
        type: 'GET',
        success: function (data) {

            let content = "";

            for (let i = 0; i < 8 && i < data.length; i++) {
                let singers = "";
                for (let j = 0; j < data[i].singers.length; j++) {
                    singers += `<a href="singer.html" onclick="storeSingerId(${data[i].singers[j].id})"> ${data[i].singers[j].singerName}</a>`
                    if (j < data[i].singers.length - 1) {
                        singers += `, `
                    }

                }
                content += `
                    <div class="music-card">
                        <img src="${API_BASE_URL}/images/${data[i].imageFile}" alt="${data[i].name}">
                        <div class="row">
                        <div class="music-card-content col-9">
                            <h3>${data[i].name}</h3>
                            <p>${singers}</p>
                            <div class="like-count">
                                <i class="bi bi-heart"></i>
                                <span>${data[i].likeCount} likes</span>
                            </div>
                        </div>
                        <div class="col-3"> 
                        <button class="btn btn-primary btn-sm " onclick="playSong('${data[i].musicFile}')">Play</button>
                        </div>
                        </div>
                    </div>`;
            }
            $("#top-liked-songs").html(content);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching songs:", error);
        }
    });
}


/* ----------------NHIỆM VỤ 39: HIỂN THỊ PLAYLIST ĐANG ĐƯỢC NGHE NHIỀU NHẤT ------------------------ */
function getTopPlayedPlaylists() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/top-played-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(playlist => {
                content += `
                    <div class="col-md-3">
                        <div class="playlist-card">                                         
                            <h3>${playlist.name}</h3>
                            <p>${playlist.songs.length} songs • ${playlist.listeningCount} views</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary btn-sm">Play</button>
                                <button class="btn btn-outline-primary btn-sm">Edit</button>
                            </div>
                        </div>
                    </div>`;
            });
            $("#top-played-playlists").html(content);
        }
    });
}

/* ---------------- NHIỆM VỤ 42: HIỂN THỊ PLAYLIST MỚI NHẤT VỪA ĐƯỢC THÊM VÀO ------------------------ */
function getNewPlaylists() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/new-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `
                    <div class="col-md-3">
                        <div class="playlist-card">                                         
                            <h3>${data[i].name}</h3>
                            <p>${data[i].songs.length} songs • ${data[i].listeningCount} views• ${data[i].likeCount} likes</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary btn-sm">Play</button>
                                <button class="btn btn-outline-primary btn-sm">Edit</button>
                            </div>
                        </div>
                    </div>`;
            }
            $("#new-playlists").html(content);
        }
    });
}

/* ---------------- NHIỆM VỤ 44: HIỂN THỊ PLAYLIST ĐƯỢC LIKE NHIỀU NHẤT <da co> ------------------------ */
function getTopLikedPlaylists() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/homepage/top-liked-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            for (let i = 0; i< 8 && i < data.length; i++) {
                content += `
                    <div class="music-card row">
                        <div class="music-card-content col-9">
                            <h3>${data[i].name}</h3>
                            <p>${data[i].listeningCount} views</p>
                            <div class="like-count">
                                <i class="bi bi-heart"></i>
                                <span>${data[i].likeCount} likes</span>
                            </div>
                        </div>
                        <div class="col-3">
                        <button class="btn btn-primary btn-sm " onclick="playSong('${data[i].musicFile}')">Play</button>
                        </div>
                    </div>`;
            }
            $("#top-liked-playlists").html(content);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching playlists:", error);
        }
    });
}



$(document).ready(function() {
    $(".nonloop-block-13").owlCarousel({
        items: 3,               // Hiển thị 3 mục mỗi lần
        loop: true,             // Lặp lại slider
        margin: 20,             // Khoảng cách giữa các mục
        nav: true,              // Hiển thị nút điều hướng
        autoplay: true,         // Tự động cuộn
        autoplayTimeout: 3000,  // Thời gian chờ trước khi chuyển (ms)
        responsive: {
            0: {
                items: 1            // Hiển thị 1 mục trên màn hình nhỏ
            },
            600: {
                items: 2            // Hiển thị 2 mục trên màn hình trung bình
            },
            1000: {
                items: 3            // Hiển thị 3 mục trên màn hình lớn
            }
        }
    });
});





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

// getTopPlayedSongs();

getNewSongs();
getTopLikedSongs();
getTopPlayedPlaylists();
getNewPlaylists();
getTopLikedPlaylists();

/* ----------------NHIEM VU 40: HIỂN THỊ BÀI HÁT CÓ LƯỢT VIEW NHIỀU NHẤT ------------------------ */
function getTopPlayedSongs() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/top-played-songs',
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
            $("#top-played-songs").html(content);
        }
    });
}

/* ---------------- NHIỆM VỤ 41: HIỂN THỊ BÀI HÁT MỚI NHẤT VỪA ĐƯỢC THÊM VÀO <da co>------------------------ */
// function getNewSongs() {
//     console.log("Bắt đầu chạy hàm getNewSongs...");
//
//     $.ajax({
//         headers: {
//             'accept': 'application/json',
//             'content-type': 'application/json',
//         },
//         url: 'http://localhost:8080/api/homepage/new-songs',
//         type: 'GET',
//         success: function (data) {
//             console.log("Yêu cầu AJAX thành công. Dữ liệu nhận được:", data);
//
//             // Kiểm tra dữ liệu có phải mảng không
//             if (!Array.isArray(data)) {
//                 console.error("Dữ liệu trả về không phải là mảng. Loại dữ liệu nhận được:", typeof data);
//                 return;
//             }
//
//             let content = "";
//             data.forEach((song, index) => {
//                 try {
//                     console.log(`Đang xử lý bài hát tại vị trí ${index}:`, song);
//                     content += `
//                         <div class="song-card mb-4">
//                             <div class="d-flex align-items-center">
//                                 <img src="http://localhost:8080/api/images/${song.imageFile}"
//                                      alt="${song.name}"
//                                      class="mr-3"
//                                      style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
//                                 <div>
//                                     <h3 class="mb-1">${song.name}</h3>
//                                     <p class="mb-0">
//                                         Ca sĩ: ${song.singers.map(s => s.singerName).join(', ')} •
//                                         Ngày tải lên: ${moment(song.uploadTime).format("DD/MM/YYYY")} •
//                                         Lượt nghe: ${song.listeningCount}
//                                     </p>
//                                 </div>
//                                 <div class="ml-auto">
//                                     <button class="btn btn-primary btn-sm" onclick="playSong('${song.musicFile}')">Phát</button>
//                                 </div>
//                             </div>
//                         </div>`;
//                 } catch (error) {
//                     console.error(`Lỗi khi xử lý bài hát tại vị trí ${index}:`, error);
//                 }
//             });
//
//             console.log("Nội dung HTML được tạo thành công:", content);
//             $("#new-songs-container").html(content);
//         },
//         error: function (xhr, status, error) {
//             console.error("Yêu cầu AJAX thất bại.");
//             console.error("Trạng thái:", status);
//             console.error("Lỗi:", error);
//             console.error("Phản hồi từ máy chủ:", xhr.responseText);
//         }
//     });
//
//     console.log("Hàm getNewSongs đã hoàn thành.");
// }






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
            for(let i=0; i < 10; i++) {
                content += `
          <div class="song-card">
            <div class="card">
              <img src="http://localhost:8080/api/images/${data[i].imageFile}" 
                   alt="${data[i].name}" class="card-img-top">
              <div class="card-body text-center">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">
                  ${data[i].singers.map(s => s.singerName).join(', ')}
                </p>
                <button class="btn btn-primary btn-sm" onclick="playSong('${data[i].musicFile}')">Phát</button>
              </div>
            </div>
          </div>`;
            };
            $("#new-songs-container").html(content);
        },
        error: function (xhr, status, error) {
            console.error("Lỗi:", error);
        }
    });
}






// Hàm play bài hát
function playSong(musicFile) {
    // Logic play nhạc, ví dụ:
    console.log(`Playing song: ${musicFile}`);
    alert(`Playing: ${musicFile}`);
}







/* ----------------NHIEM VU 43: HIỂN THỊ BÀI HÁT CÓ LƯỢT LIKE NHIỀU NHẤT<da co> ------------------------ */
function getTopLikedSongs() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/top-liked-songs',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(song => {
                content += `
                    <div>
                        <strong>${song.title}</strong><br>
                        <span>Lượt thích: ${song.likes}</span><br>
                        <p>${song.artist}</p>
                    </div>`;
            });
            $("#top-liked-songs").html(content);
        }
    });
}

/* ----------------NHIỆM VỤ 39: HIỂN THỊ PLAYLIST ĐANG ĐƯỢC NGHE NHIỀU NHẤT <da co> ------------------------ */
function getTopPlayedPlaylists() {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: 'http://localhost:8080/api/top-played-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(playlist => {
                content += `
                    <div>
                        <strong>${playlist.name}</strong><br>
                        <span>Lượt nghe: ${playlist.views}</span>
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
        url: 'http://localhost:8080/api/new-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(playlist => {
                content += `
                    <div>
                        <strong>${playlist.name}</strong><br>
                        <span>Ngày thêm: ${moment(playlist.addedDate).format("DD/MM/YYYY")}</span>
                    </div>`;
            });
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
        url: 'http://localhost:8080/api/top-liked-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(playlist => {
                content += `
                    <div>
                        <strong>${playlist.name}</strong><br>
                        <span>Lượt thích: ${playlist.likes}</span>
                    </div>`;
            });
            $("#top-liked-playlists").html(content);
        }
    });
}


getTopPlayedSongs();
getNewSongs();
getTopLikedSongs();
getTopPlayedPlaylists();
getNewPlaylists();
getTopLikedPlaylists();

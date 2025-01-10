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

/* ---------------- NHIỆM VỤ 41: HIỂN THỊ BÀI HÁT MỚI NHẤT VỪA ĐƯỢC THÊM VÀO <da co> <done>------------------------ */
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
            for(let i=0; i < 6; i++) {
                content += `
          <div class="song-card">
            <div class="card">


              <img src="${data[i].imageFile}" 
                   alt="${data[i].name}" class="card-img-top">     

              <div class="card-body text-center">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">
                  ${data[i].singers.map(s => s.singerName).join(', ')}
                </p>
                <button class="btn btn-primary btn-sm" onclick="playSong('${data[i].musicFile}')">Play</button>
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
        url: 'http://localhost:8080/api/homepage/top-liked-playlists',
        type: 'GET',
        success: function (data) {
            let content = "";
            data.forEach(playlist => {
                content += `
                    <div class="col-md-4">
                        <div class="playlist-card">                                         
                            <h3>${playlist.name}</h3>
                            <p>${playlist.songs.length} songs • ${playlist.listeningCount} views</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary btn-sm">Open</button>
                                <button class="btn btn-outline-primary btn-sm">Edit</button>
                            </div>
                        </div>
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

const apiUrl = "http://localhost:8080/api/songListen";
const audioPlayer = document.getElementById('audioPlayer');


function playSong(musicFile) {
    audioPlayer.src = musicFile;
    audioPlayer.play();
}

function displaySongs(data) {
    const songList = $("#songList");
    songList.empty();

    if (data.length === 0) {
        songList.append("<p class='text-center'>Không tìm thấy bài hát.</p>");
        return;
    }

    data.forEach(song => {
        const songCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${song.imageFile}" class="card-img-top" alt="${song.name}">
                    <div class="card-body">
                        <h5 class="card-title">${song.name}</h5>
                        <p class="card-text">${song.description}</p>
                        <button class="btn btn-primary" onclick="playSong('${song.musicFile}')">
                            <i class="fas fa-play"></i> Nghe ngay
                        </button>
                    </div>
                    <div class="card-footer text-muted">
                        <small>Nghe: ${song.listeningCount} | Thích: ${song.likeCount}</small>
                    </div>
                </div>
            </div>
        `;
        songList.append(songCard);
    });
}

function getAllSongs() {
    $("#sectionTitle").text("Tất cả bài hát");
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: displaySongs,
        error: () => alert("Không thể tải danh sách bài hát.")
    });
}

function getLatestSongs() {
    $("#sectionTitle").text("Bài hát mới nhất");
    $.ajax({
        url: `${apiUrl}/latest`,
        method: "GET",
        success: displaySongs
    });
}

function getMostPlayedSongs() {
    $("#sectionTitle").text("Bài hát nghe nhiều nhất");
    $.ajax({
        url: `${apiUrl}/most-played`,
        method: "GET",
        success: displaySongs
    });
}

function getMostLikedSongs() {
    $("#sectionTitle").text("Bài hát được yêu thích nhất");
    $.ajax({
        url: `${apiUrl}/most-liked`,
        method: "GET",
        success: displaySongs
    });
}

function searchSongs(keyword) {
    if (!keyword) {
        keyword = $("#searchInput").val().trim();
    }
    if (!keyword) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }

    $("#sectionTitle").text(`Kết quả tìm kiếm cho: "${keyword}"`);

    $.ajax({
        url: `${apiUrl}/search`,
        method: "GET",
        data: { keyword },
        success: displaySongs,
        error: () => {
            $("#songList").html("<p class='text-center'>Không tìm thấy bài hát.</p>");
        }
    });
}
$(document).ready(function () {
    const keyword = getQueryParam("keyword");

    if (keyword) {
        $("#searchInput").val(keyword);
        searchSongs(keyword);
    } else {
        getAllSongs();
    }
});


$(".btn-search").click(function () {
    searchSongs();
});


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function setActive(element) {
    $('.nav-link').removeClass('active');  // Xóa active ở tất cả các tab
    $(element).addClass('active');         // Thêm active vào tab được click
}

// $(document).ready(function () {
//     getAllSongs();
// });



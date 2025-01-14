function showAllPlaylist() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/playlist",
        success: function (data){
            let playlist ="";

            for (let i = 0; i < data.length; i++) {
                let index = 0;
                playlist += `<tr>
        <td>${index+1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].listeningCount}</td>
        <td>${data[i].songs ? data[i].songs.length : 0}</td>
        <td class="action-icons"><button class="play-song-btn" onclick="getSongsInPlaylist(id)">▶️</button></td>
        <td class="action-icons"><button class="play-song-btn" onclick="getSongsInPlaylist(id)">▶️</button></td>
        <td class="action-icons"><button class="delete-song-btn" onclick="deletePlaylist(${playlist.id})">❌</button> 
    </tr>`;
            }
            document.getElementById("playlist").innerHTML = playlist;
        }
    })
}
showAllPlaylist();

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
        success: playlist,
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
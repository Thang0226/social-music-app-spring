const API_BASE_URL = 'http://localhost:8080';

let song_id = localStorage.getItem("song-id");
let song = {};

$(document).ready(function(){
    $.ajax({
        url: `http://localhost:8080/api/songs/${song_id}`,
        method: 'GET',
        success: function(result){
            console.log(result);
            song = result;
            let singerList = song.singers;
            let listLength = singerList.length;
            let singers = "";
            for (let i = 0; i < listLength; i++) {
                singers += `<a href="singer.html" onclick="storeSingerId(${song.singers[i].id})"> ${song.singers[i].singerName}</a>`
                if (listLength > listLength - i) {
                    singers += `, `
                }
            }
            let localTime = moment(song.uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
            $("#song-details").html(
                `
                <h1 class="mb-3">
                    <img width="150" height="150" src="${API_BASE_URL}/images/${song.imageFile}" alt="No Image" class="img-thumbnail rounded-circle">
                    ${song.name}
                </h1>
                ${singers}<span class="mx-2">&bullet;</span> ${localTime} <span class="mx-2">&bullet;</span>
                `
            );

            $("#song-player").html(
                `<div class="player mb-5">
                <audio id="player2" preload="none" controls style="width: 100%">
                <source src="${API_BASE_URL}/audios/${song.musicFile}" type="audio/mp3">
                </audio>
                </div>`
            );
        }
    });
})

let songId = localStorage.getItem("song-id");
let userId = localStorage.getItem("user-id");

let currentPage = 0;
const pageSize = 10; // Number of comments per load

function getSongComment(songId, isLoadMore = false) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `http://localhost:8080/api/song-comment/${songId}?page=${currentPage}&size=${pageSize}`,
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
    getSongComment(songId, true);
}
getSongComment(songId, false);

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
        song: {
            id: songId
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
            getSongComment(songId, false);
            $("#comment-box").val("")
        }
    })

}

function storeSingerId(singerId) {
    localStorage.setItem("singer-id",singerId)
}
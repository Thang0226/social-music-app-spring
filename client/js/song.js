const API_BASE_URL = 'http://localhost:8080';

let song_id = localStorage.getItem("song-id");
console.log(song_id)
let song = {};

$(document).ready(function () {
    $.ajax({
        url: `http://localhost:8080/api/songs/${song_id}`,
        method: 'GET',
        success: function (result) {
            console.log(result);
            song = result;
            let singerList = song.singers;
            let singerListLength = singerList.length;
            let genreList = song.genres;
            let genreListLength = genreList.length;
            let singers = "";
            for (let i = 0; i < singerListLength; i++) {
                singers += `<a href="singer.html" onclick="storeSingerId(${song.singers[i].id})"> ${song.singers[i].singerName}</a>`
                if (i < singerListLength - 1) {
                    singers += `, `
                }
            }
            let genres = "";
            for (let i = 0; i < genreListLength; i++) {
                genres += `<span> ${song.genres[i].name}</span>`;
                if (genreListLength > genreListLength - i) {
                    genres += `, `
                }
            }
            // song details
            let localTime = moment(song.uploadTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
            $("#song-details").html(
                `
                <div class="d-flex align-items-center justify-content-center mb-2 gap-2">
                    <img src="${API_BASE_URL}/images/${song.imageFile}" alt="${song.name}" 
                    class="img-thumbnail rounded-circle"
                    style="max-width: 150px; max-height: 150px; width: 100%; height: auto;">
                    <h1>
                        ${song.name}
                    </h1>
                </div>
                
                ${singers}<span class="mx-2">&bullet;</span> ${localTime} <span class="mx-2">&bullet;</span><br>
                <span>${song.description}</span><br>
                ${genres}<br>
                <span> <i class="bi bi-headphones"></i> </i> <span id="listening-count">
                    ${parseInt(song.listeningCount, 10).toLocaleString('vi-VN')}</span>
                </span>
                `
            );

            // like
            $("#like-count").html(
                `${song.likeCount}`
            );

            // song player
            $("#song-player").html(
                `<div class="player mb-3">
                <audio id="player2" preload="none" controls style="width: 100%">
                <source src="${API_BASE_URL}/audios/${song.musicFile}" type="audio/mp3">
                </audio>
                </div>`
            );

            for (let i = 0; i < singerList.length; i++) {
                get3PopularSongOfSinger(singerList[i].id);
            }

            initializeMediaPlayers();
        }
    });
})

let songId = localStorage.getItem("song-id");
let currentPage = 0;
const pageSize = 10; // Number of comments per load

function getSongComment(songId, isLoadMore = false) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `${API_BASE_URL}/api/comments/song-comment/${songId}?page=${currentPage}&size=${pageSize}`,
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
        url: `${API_BASE_URL}/api/comments`,
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
    localStorage.setItem("singer-id", singerId)
}

// like/unlike song
function smashThatLikeButton() {
    liked = !liked; // Toggle the liked state
    if (liked) {
        heartIcon.classList.remove('bi-heart');
        heartIcon.classList.add('bi-heart-fill');
        likeButton.classList.add('liked');
        likeSong(songId);
    } else {
        heartIcon.classList.remove('bi-heart-fill');
        heartIcon.classList.add('bi-heart');
        likeButton.classList.remove('liked');
        unlikeSong(songId)
    }
}

function likeSong(songId) {
    event.preventDefault()
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/like-song/${songId}`,
        type: 'PUT',
        success: function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}

function unlikeSong(songId) {
    event.preventDefault()
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/unlike-song/${songId}`,
        type: 'PUT',
        success: function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}


function get3PopularSongOfSinger(singerID) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `${API_BASE_URL}/api/songs/singer-popular-song/${singerID}`,
        type: 'GET',
        success: function (result) {
            let song = result;
            let content = "";
            content += `<h3 class="mb-4">
                        <a href="singer.html" onclick="storeSingerId(${song[0].singers[0].id})">
                        ${song[0].singers[0].singerName}</a><span> popular song</span>
                    </h3>
                    <ul class="list-unstyled">`;
            for (let i = 0; i < song.length; i++) {
                if (i > 2) return;
                if (song[i].id !== parseInt(songId)) {
                    content += `                
                <li>
                    <a href="song.html" class="d-flex align-items-center" onclick="storeSongId(${song[i].id})">
                        <img src="${API_BASE_URL}/images/${song[i].imageFile}" alt=" No Image" class="img-fluid mr-2">
                        <div class="podcaster">
                            <span class="d-block">${song[i].name}</span>
                            <span class="small">
                                <i class="bi bi-headphones"></i> <span id="listening-count">
                                   ${parseInt(song[i].listeningCount, 10).toLocaleString('vi-VN')}</span>
                            </span>
                        </div>
                    </a>
                </li>`
                }
            }
            content += `</ul>`
            $('#singer-popular-songs').append(content);
        }
    })
}

function increaseViewCount(songId) {
    $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/update-listening-count/${songId}`,
        type: 'PUT',
        success: function (result) {
            $('#listening-count').html(`${parseInt(result, 10).toLocaleString('vi-VN')}`);
        }
    })
}

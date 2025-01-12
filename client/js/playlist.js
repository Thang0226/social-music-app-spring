let playlistId = localStorage.getItem("playlist-id");
let currentPage = 0;
const pageSize = 10; // Number of comments per load

function getPlaylistComment(playlistId, isLoadMore = false) {
    $.ajax({
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `http://localhost:8080/api/playlist-comment/${playlistId}?page=${currentPage}&size=${pageSize}`,
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
    getPlaylistComment(playlistId, true);
}
getPlaylistComment(playlistId, false);

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
        playlist: {
            id: playlistId
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
            console.log(response);
            getPlaylistComment(playlistId, false);
            $("#comment-box").val(null);
        }
    })
}

// like/unlike song
likeButton.addEventListener('click', () => {
    liked = !liked; // Toggle the liked state
    if (liked) {
        heartIcon.classList.remove('bi-heart');
        heartIcon.classList.add('bi-heart-fill');
        likeButton.classList.add('liked');
        likePlaylist(playlistId);
    } else {
        heartIcon.classList.remove('bi-heart-fill');
        heartIcon.classList.add('bi-heart');
        likeButton.classList.remove('liked');
        unlikePlaylist(playlistId)
    }
});

// like/unlike song
function likePlaylist(playlistId) {
    event.preventDefault()
    $.ajax({
        headers:{
            'content-type': 'application/json'
        },
        url: `http://localhost:8080/api/playlist/like-playlist/${playlistId}`,
        type: 'PUT',
        success : function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}

function unlikePlaylist(playlistId) {
    event.preventDefault()
    $.ajax({
        headers:{
            'content-type': 'application/json'
        },
        url: `http://localhost:8080/api/playlist/unlike-playlist/${playlistId}`,
        type: 'PUT',
        success : function (result) {
            console.log(result);
            $("#like-count").html(
                `${parseInt(result, 10).toLocaleString('vi-VN')}`
            );
        }
    })
}
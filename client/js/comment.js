let songId = localStorage.getItem("song-id");
let playlistId = localStorage.getItem("playlist-id");
let singerId = localStorage.getItem("singer-id");
let userId = localStorage.getItem("user-id");
let token = localStorage.getItem("token");

let textarea = document.getElementById('comment-box');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height to calculate the correct scroll height
    this.style.height = `${this.scrollHeight}px`; // Set height to scrollHeight
});

// like/unlike song
let likeButton = document.getElementById('like-button');
let heartIcon = document.getElementById('heart-icon');

let liked = false;
if (token != null) {
    heartIcon.classList.remove('bi-heart');
    heartIcon.classList.add('bi-heart-fill');
    likeButton.classList.add('liked');
    liked = !liked;
}

likeButton.addEventListener('click', () => {
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
});


function likeSong(songId) {
    event.preventDefault()
    $.ajax({
        headers:{
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/like-song/${songId}`,
        type: 'POST',
        success : function (result) {
            console.log(result);
            $("#like-count").html(
                `${result}`
            );
        }
    })
}

function unlikeSong(songId) {
    event.preventDefault()
    $.ajax({
        headers:{
            'content-type': 'application/json'
        },
        url: `${API_BASE_URL}/api/songs/unlike-song/${songId}`,
        type: 'POST',
        success : function (result) {
            console.log(result);
            $("#like-count").html(
                `${result}`
            );
        }
    })
}
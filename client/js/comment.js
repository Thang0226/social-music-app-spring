let userId = localStorage.getItem("user-id");
let token = localStorage.getItem("token");

let textarea = document.getElementById('comment-box');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height to calculate the correct scroll height
    this.style.height = `${this.scrollHeight}px`; // Set height to scrollHeight
});

// like/unlike
let likeButton = document.getElementById('like-button');
let heartIcon = document.getElementById('heart-icon');

let liked = false;
if (token != null) {
    heartIcon.classList.remove('bi-heart');
    heartIcon.classList.add('bi-heart-fill');
    likeButton.classList.add('liked');
    liked = !liked;
}
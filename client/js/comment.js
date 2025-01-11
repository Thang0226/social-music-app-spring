let textarea = document.getElementById('comment-box');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height to calculate the correct scroll height
    this.style.height = `${this.scrollHeight}px`; // Set height to scrollHeight
});



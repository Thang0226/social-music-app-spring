let songId = localStorage.getItem("song-id");
let userId = localStorage.getItem("user-id");

let currentPage = 0;
const pageSize = 10; // Number of comments per load

function getComment(songId, isLoadMore = false) {
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

// Add this function to handle loading more comments
function loadMore() {
    currentPage++;
    getComment(songId, true);
}
getComment(songId, false);

const textarea = document.getElementById('comment-box');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height to calculate the correct scroll height
    this.style.height = `${this.scrollHeight}px`; // Set height to scrollHeight
});

function postComment() {
    event.preventDefault();
    let comment = {
        user: {
            id: userId
        },
        song: {
            id: songId
        },
        content: $("#comment-box").val()
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
            getComment(songId);
            $("#comment-box").val("")
        }
    })
}


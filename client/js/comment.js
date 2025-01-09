function getComment(songId) {
    $.ajax({
        headers:{
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        url: `http://localhost:8080/api/song-comment/${songId}`,
        type: 'GET',
        success: function (data) {
            console.log(data);
            let comment = data.content;
            let content = "";
            for (let i = 0; i < comment.length; i++) {
                let localTime = moment(comment[i].commentTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm");
                content += `<div>
                    <strong>${comment[i].username}</strong><br>
                    <span>${localTime}</span><br>
                    <p>${comment[i].content}</p>
                </div>`
            }
            $("#comments").html(content);
        }
    })
}
getComment(localStorage.getItem("song-id"));
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
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<div>
                    <strong>${data[i].username}</strong><br>
                    <span>${data[i].commentTime}</span><br>
                    <p>${data[i].content}</p>
                </div>`
            }
            $("#comments").html(content);
        }
    })
}
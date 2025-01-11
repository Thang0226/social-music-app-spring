function showAllPlaylist() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/playlist",
        success: function (data){
            let playlist ="";
            for (let i = 0; i < data.length; i++) {
                playlist += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].likeCount}</td>
        <td>${data[i].listeningCount}</td>
        <td>${data[i].createTime}</td>
        <td>${data[i].userId}</td>
        <td>${data[i].songs ? data[i].songs.length : 0}</td>
    </tr>`;
            }
            document.getElementById("playlist").innerHTML = playlist;
            console.log(result);
        }
    })
}
showAllPlaylist();

// Xoa
function deleteById(id) {
    if (confirm("Bạn có chắc chắn muốn xóa playlist này không?")) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/api/playlist/${id}`,
            success: function () {
                alert("Xóa playlist thành công!");
                showAllPlaylist(); // Tải lại danh sách playlist sau khi xóa
            },
            error: function () {
                alert("Không thể xóa playlist. Vui lòng thử lại sau.");
            }
        });
    }
}
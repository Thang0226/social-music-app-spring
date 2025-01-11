// function showAllPlaylist() {
//     $.ajax({
//         method: "GET",
//         url: "http://localhost:8080/api/playlist",
//         success: function (data) {
//             console.log("Dữ liệu nhận được:", data);
//             let playlist = "";
//             for (let i = 0; i < data.length; i++) {
//                 playlist += `<tr>
//                     <td>${data[i].id}</td>
//                     <td>${data[i].name}</td>
//                     <td>${data[i].likeCount}</td>
//                     <td>${data[i].listeningCount}</td>
//                     <td>${data[i].createTime}</td>
//                     <td>${data[i].userId}</td>
//                     <td>${data[i].songs ? data[i].songs.length : 0}</td>
//                     <td class="action-icons">
//                         <i class="fas fa-play" title="Phát"></i>
//                         <i class="fas fa-edit" title="Chỉnh sửa"></i>
//                         <i class="fas fa-trash" title="Xóa"></i>
//                     </td>
//                 </tr>`;
//             }
//             document.getElementById("playlist").innerHTML = playlist;
//             // $("#playlist").html(playlist);
//         },
//         error: function (xhr, status, error) {
//             console.error("Lỗi AJAX:", status, error);
//         }
//     });
// }
//
// showAllPlaylist();
//
// // Xoa
// function deleteById(id) {
//     if (confirm("Bạn có chắc chắn muốn xóa playlist này không?")) {
//         $.ajax({
//             method: "DELETE",
//             url: `http://localhost:8080/api/playlist/${id}`,
//             success: function () {
//                 alert("Xóa playlist thành công!");
//                 showAllPlaylist(); // Tải lại danh sách playlist sau khi xóa
//             },
//             error: function () {
//                 alert("Không thể xóa playlist. Vui lòng thử lại sau.");
//             }
//         });
//     }
// }

    // Sample function to load playlist
    function loadPlaylists() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/playlist",
        success: function (data) {
            let playlistHtml = "";
            data.forEach(playlist => {
                playlistHtml += `
                        <tr>
                            <td>${playlist.id}</td>
                            <td>${playlist.name}</td>
                            <td>${playlist.likeCount}</td>
                            <td>${playlist.listeningCount}</td>
                            <td>${playlist.createTime}</td>
                            <td>${playlist.userId}</td>
                            <td>${playlist.songs ? playlist.songs.length : 0}</td>
                            <td class="action-icons">
                                <i class="fas fa-play" title="Phát"></i>
                                <i class="fas fa-edit" title="Chỉnh sửa"></i>
                                <i class="fas fa-trash" title="Xóa" onclick="deletePlaylist(${playlist.id})"></i>
                            </td>
                        </tr>`;
            });
            $("#playlist").html(playlistHtml);
        },
        error: function () {
            alert("Không thể tải danh sách playlist.");
        }
    });
}

    function deletePlaylist(id) {
    if (confirm("Bạn có chắc muốn xóa playlist này?")) {
    $.ajax({
    method: "DELETE",
    url: `http://localhost:8080/api/playlist/${id}`,
    success: function () {
    alert("Xóa playlist thành công!");
    loadPlaylists(); // Reload playlists
},
    error: function () {
    alert("Không thể xóa playlist.");
}
});
}
}

    $(document).ready(function () {
    loadPlaylists();

    // Show Add Playlist Form
    $("#addPlaylistBtn").click(function () {
    $("#formContainer").show();
});

    // Cancel form and hide
    $("#cancelBtn").click(function () {
    $("#formContainer").hide();
});

    // Add Playlist Form Submit
    $("#addPlaylistForm").submit(function (e) {
    e.preventDefault();

    const playlistData = {
    name: $("#name").val(),
    likeCount: $("#likeCount").val(),
    listeningCount: $("#listeningCount").val(),
    userId: $("#userId").val()
};

    $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/playlist",
    contentType: "application/json",
    data: JSON.stringify(playlistData),
    success: function () {
    $("#successMessage").text("Thêm playlist thành công!");
    loadPlaylists(); // Reload playlists
    $("#formContainer").hide();
},
    error: function () {
    $("#errorMessage").text("Đã có lỗi xảy ra khi thêm playlist.");
}
});
});
});
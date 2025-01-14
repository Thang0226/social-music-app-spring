function createSinger() {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const singerName = $("#singerName").val();

    // Kiểm tra nếu tên ca sĩ rỗng
    if (!singerName.trim()) {
        alert("Vui lòng nhập tên ca sĩ!");
        return;
    }

    // Gửi dữ liệu đến API
    $.ajax({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        url: `${API_BASE_URL}/api/singers`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            singerName: singerName
        }),
        success: function(response) {
            alert("Ca sĩ đã được tạo thành công!");
            $("#singerName").val(""); // Xóa dữ liệu trong input sau khi thành công
            window.location.href = "/social-music-app-spring/client/listsinger.html";

        },
        error: function(error) {
            alert("Tạo ca sĩ thất bại: " + error.responseText);
        }
    });
}

// Hàm render form




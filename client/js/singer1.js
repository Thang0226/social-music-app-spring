// function showAllSinger() {
//     $.ajax({
//         method: "GET",
//         url: "http://localhost:8080/api/singers",
//         success: function (data){
//             let singer ="";
//             for (let i = 0; i < data.length; i++) {
//                 singer += `<tr>
//         <td>${data[i].id}</td>
//         <td>${data[i].singerName}</td>
//     </tr>`;
//             }
//             document.getElementById("singer").innerHTML = singer;
//         }
//     })
// }
// showAllSinger();

// function searchSinger() {
//     const query = document.getElementById("searchInput").value.trim(); // Lấy giá trị từ input
//     if (!query) {
//         alert("Vui lòng nhập từ khóa tìm kiếm."); // Kiểm tra input rỗng
//         return;
//     }
//
//     $.ajax({
//         url: "http://localhost:8080/api/singers/findByName", // Endpoint API
//         method: "GET",
//         data: { singerName: query }, // Truyền tham số tìm kiếm
//         success: function (data) {
//             renderSingers(data); // Xử lý kết quả trả về
//         },
//         error: function () {
//             alert("Không thể tìm thấy ca sĩ."); // Hiển thị lỗi nếu xảy ra
//         }
//     });
// }
//
// // Gán sự kiện submit cho form
// document.getElementById("searchForm").addEventListener("submit", function (e) {
//     e.preventDefault(); // Ngăn reload trang
//     searchSinger(); // Gọi hàm tìm kiếm
// });

// Hiển thị danh sách ca sĩ khi tải trang
// $(document).ready(showAllSingers);*/
// function searchSinger(keyword) {
//     if (!keyword) {
//         keyword = $("#searchInput").val().trim();
//     }
//     if (!keyword) {
//         alert("Vui lòng nhập từ khóa tìm kiếm!");
//         return;
//     }
//
//     $("#sectionTitle").text(`Kết quả tìm kiếm cho: "${keyword}"`);
//
//     $.ajax({
//         url: `${apiUrl}/search`,
//         method: "GET",
//         data: { keyword },
//         success: displaySinger,
//         error: () => {
//             $("#singerList").html("<p class='text-center'>Không tìm thấy bài hát.</p>");
//         }
//     });
// }
// $(document).ready(function () {
//     const keyword = getQueryParam("keyword");
//
//     if (keyword) {
//         $("#searchInput").val(keyword);
//         searchSinger(keyword);
//     } else {
//         getAllSongs();
//     }
// });
//
//
// $(".btn-search").click(function () {
//     searchSinger();
// });
//
//
// function getQueryParam(param) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
// }

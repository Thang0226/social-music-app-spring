function showAllSinger() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/singers",
        success: function (data){
            let singer ="";
            for (let i = 0; i < data.length; i++) {
                singer += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].singerName}</td>
    </tr>`;
            }
            document.getElementById("singer").innerHTML = singer;
        }
    })
}
showAllSinger();
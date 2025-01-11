$(function (){
    $.ajax(
        {
            type: "GET",
            url: "http://localhost:8080/api/songs/by-user/2",
            success: function (data) {
                let content = `
                  <table id="display-list" border="1">
                    <tr>
                      <th>Name</th>
                      <th>User Name</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Music</th>
                      <th>Upload time</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                `;
                for (let i = 0; i < data.length; i++) {
                    content += getSongs(data[i]);
                }
                content += "</table>"
                document.getElementById('songList').innerHTML = content;
                document.getElementById('songList').style.display = "block";
            }
        }
    )
})

function getSongs(song){
    return `<tr>
                <td >${song.songName}</td>
                <td >${song.userName}</td>
                <td >${song.description}</td>
                <td >${song.imageFile}</td>
                <td >${song.musicFile}</td>
                <td >${song.uploadTime}</td>
                <td class="btn">
                    <button class="updateSmartphone" onclick="updateForm(${song.id})">Update</button>
                </td>
                <td class="btn">
                    <button class="deleteSmartphone" onclick="deleteSong(${song.id})">Delete</button>
                </td>
            </tr>`;
}

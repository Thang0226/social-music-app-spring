const API_BASE_URL = 'http://localhost:8080';
let user_id = localStorage.getItem("user-id");
$(document).ready(function() {
    $.ajax({
        url: `http://localhost:8080/api/songs/by-user/${user_id}`,
        method: 'GET',
        success: function(result){
            console.log(result);
            song = result;


            let singerList = song.singers;
            console.log("cac singers = " + singerList);
            let listLength = singerList.length;
            console.log("so luong singer = " + listLength)
            let singers = "";
            for (let i = 0; i < listLength; i++) {
                singers += `<a href="singer.html" onclick="storeSingerId(${song.singers[i].id})"> ${song.singers[i].singerName}</a>`
                if (i < listLength - 1) {
                    singers += `, `
                }
            }
            let genres = "";
            for (let i = 0; i < listLength; i++) {
                genres += `<span> ${song.genres[i].name}</span>`;
                if (listLength > listLength - i) {
                    genres += `, `
                }
            }



            let songsHtml = '';
            result.forEach(song => {
                const localTime = song.uploadTime;
                songsHtml += `
                    <div class="d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate" data-aos="fade-up">
                        <img width="150" height="150" src="${API_BASE_URL}/images/${song.imageFile}" alt="Thumbnail Image" class="image">
                        <div class="text">
                            <h3 class="font-weight-light"><a href="song.html">${song.songName}</a></h3>
                            <div class="text-white mb-3">
                                <span class="text-black-opacity-05">
                                    <small>
                                        By ${song.userName}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleDateString()}
                                        <span class="sep">/</span> ${new Date(localTime).toLocaleTimeString()}
                                    </small>
                                </span>
                            </div>
                            <p>${song.description}</p>
                            <div class="player">
                                <audio controls preload="none" style="width: 100%;">
                                    <source src="${API_BASE_URL}/music/${song.musicFile}" type="audio/mp3">
                                </audio>
                            </div>
                        </div>
                    </div>
                `;
            })
            $("#newCreatedSong").html(songsHtml);
            initializeMediaPlayers();
        },
        error: function (err) {
            console.error('Lỗi khi lấy danh sách bài hát:', err);
        }
    })
})

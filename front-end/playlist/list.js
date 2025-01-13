
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
                            <td>${playlist.name}</td>
                            <td>${playlist.likeCount}</td>
                            <td>${playlist.listeningCount}</td>
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
loadPlaylists()

    $(document).ready(function () {
        $.ajax({
            url: `http://localhost:8080/api/playlist/create`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            success: function (infor) {
                renderForm(infor);
            }
        })
    });

    function renderForm(infor) {
        let songs = infor.songs;
        let songsDropdown = `<option value="" selected>Select a songs</option>`;
        for (let i = 0; i < songs.length; i++) {
            songsDropdown += `<option value="${song[i].songName}">${song[i].songName}</option>`;
        }
        $("#singers").html(songsDropdown);
    }

    const songSelect = document.getElementById('songs');
    const selectedSongsInput = document.getElementById('selectedSongs');
    let genres = [];

    songSelect.addEventListener('change', function () {
        const selectedSong = this.value;

        // Avoid duplicate entries
        if (!genres.includes(selectedSong)) {
            genres.push(selectedSong);
            updateSongsInputField();
        }

        this.value = "";
    });

    function updateSongsInputField() {
        // Join selected singers with commas and update the input field
        selectedSongsInput.value = songs.join(', ');
    }

    function createPlaylist() {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', $("#name").val());
        formData.append('songs', songs);
        formData.append('user_id', localStorage.getItem('user-id'));

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        $.ajax({
            url: `http://localhost:8080/api/playlist`,
            type: 'POST',
            data: formData,
            processData: false,  // Don't process the files
            contentType: false,  // Set content type to false as jQuery will tell the server it's a query string request
            success: function(response) {
                alert('Song has been created!');
            },
            error: function(error) {
                alert('Failed: ' + error);
            }
        })
    }
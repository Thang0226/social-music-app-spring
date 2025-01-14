const API_BASE_URL = 'http://localhost:8080';

$(document).ready(function () {
    $.ajax({
        url: `${API_BASE_URL}/api/playlist/create`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        success: function (data) {
            renderForm(data);
        }
    })
});

function renderForm(infor) {
    let songs = infor.songs;
    let songsDropdown = `<option value="" selected>Select Songs</option>`;
    for (let i = 0; i < songs.length; i++) {
        songsDropdown += `<option value="${songs[i].name}">${songs[i].name}</option>`;
    }
    $("#songs").html(songsDropdown);

}


const songsSelect = document.getElementById('songs');
const selectedSongsInput = document.getElementById('selectedSongs');
let songs = [];

songsSelect.addEventListener('change', function () {
    const selectedSongs = this.value;

    // Avoid duplicate entries
    if (!songs.includes(selectedSongs)) {
        songs.push(selectedSongs);
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
        url: `${API_BASE_URL}/api/playlist/save`,
        type: 'POST',
        data: formData,
        processData: false,  // Don't process the files
        contentType: false,  // Set content type to false as jQuery will tell the server it's a query string request
        success: function(response) {
            alert('Playlist has been created!');
        },
        error: function(error) {
            alert('Failed: ' + error);
        }
    })
}
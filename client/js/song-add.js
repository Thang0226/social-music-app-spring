const API_BASE_URL = 'http://localhost:8080';

$(document).ready(function () {
    $.ajax({
        url: `${API_BASE_URL}/api/songs/create`,
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
    let singers = infor.singers;
    let singerDropdown = `<option value="" selected>Select a singer</option>`;
    for (let i = 0; i < singers.length; i++) {
        singerDropdown += `<option value="${singers[i].singerName}">${singers[i].singerName}</option>`;
    }
    $("#singers").html(singerDropdown);

    let genres = infor.genres;
    let genreDropdown = `<option value="" selected>Select a genre</option>`;
    for (let i = 0; i < genres.length; i++) {
        genreDropdown += `<option value="${genres[i].name}">${genres[i].name}</option>`;
    }
    $("#genres").html(genreDropdown);
}





const singersSelect = document.getElementById('singers');
const selectedSingersInput = document.getElementById('selectedSingers');
let singers = [];
const genresSelect = document.getElementById('genres');
const selectedGenresInput = document.getElementById('selectedGenres');
let genres = [];

singersSelect.addEventListener('change', function () {
    const selectedSinger = this.value;

    // Avoid duplicate entries
    if (!singers.includes(selectedSinger)) {
        singers.push(selectedSinger);
        updateSingersInputField();
    }

    this.value = "";
});

function updateSingersInputField() {
    // Join selected singers with commas and update the input field
    selectedSingersInput.value = singers.join(', ');
}

genresSelect.addEventListener('change', function () {
    const selectedGenre = this.value;

    // Avoid duplicate entries
    if (!genres.includes(selectedGenre)) {
        genres.push(selectedGenre);
        updateGenresInputField();
    }

    this.value = "";
});

function updateGenresInputField() {
    // Join selected singers with commas and update the input field
    selectedGenresInput.value = genres.join(', ');
}





function createSong() {
    event.preventDefault();

    let formData = new FormData();
    formData.append('name', $("#name").val());
    formData.append('description', $("#description").val());
    formData.append('musicFile', $("#musicFile")[0].files[0]);
    formData.append('imageFile', $("#imageFile")[0].files[0]);
    formData.append('singers', singers);
    formData.append('genres', genres);
    formData.append('user_id', localStorage.getItem('user-id'));

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: `${API_BASE_URL}/api/songs/save`,
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

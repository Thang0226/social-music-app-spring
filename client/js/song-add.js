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
let selectedSingers = [];
const genresSelect = document.getElementById('genres');
const selectedGenresInput = document.getElementById('selectedGenres');
let selectedGenres = [];

singersSelect.addEventListener('change', function () {
    const selectedSinger = this.value;

    // Avoid duplicate entries
    if (!selectedSingers.includes(selectedSinger)) {
        selectedSingers.push(selectedSinger);
        updateSingersInputField();
    }

    this.value = "";
});

function updateSingersInputField() {
    // Join selected singers with commas and update the input field
    selectedSingersInput.value = selectedSingers.join(', ');
}

genresSelect.addEventListener('change', function () {
    const selectedGenre = this.value;

    // Avoid duplicate entries
    if (!selectedGenres.includes(selectedGenre)) {
        selectedGenres.push(selectedGenre);
        updateGenresInputField();
    }

    this.value = "";
});

function updateGenresInputField() {
    // Join selected singers with commas and update the input field
    selectedGenresInput.value = selectedGenres.join(', ');
}
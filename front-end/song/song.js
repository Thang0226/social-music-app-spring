// $(function() {
//     // Initially hide the form
//     $("#createSongForm").hide();
//
//     // Load songs when page loads
//     loadSongs();
//
//     // Show form when add button is clicked
//     $("#addBtn").click(function() {
//         $("#createSongForm").slideDown();
//         $(this).hide();
//     });
//
//     // Hide form when cancel is clicked
//     $("#cancelBtn").click(function(e) {
//         e.preventDefault();
//         $("#createSongForm").slideUp();
//         $("#addBtn").show();
//     });
// });
//
// // function loadSongs(){
// //     $.ajax(
// //         {
// //             type: "GET",
// //             url: "http://localhost:8080/api/songs",
// //             success: function (data) {
// //                 let content = `
// //                   <table id="display-list" border="1" class="table table-striped">
// //                     <thead>
// //                         <tr>
// //                           <th>Name</th>
// //                           <th>Description</th>
// //                           <th>Image</th>
// //                           <th>Music</th>
// //                           <th>Upload time</th>
// //                           <th>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                 `;
// //                 for (let song of data) {
// //                     content += getSongs(song);
// //                 }
// //                 content += "</tbody></table>"
// //                 $("#songList").html(content);
// //             },
// //             error: function(){
// //                 $("#errorMessage").text("Cannot load songs");
// //             }
// //         }
// //     )
// // }
// //
// // function getSongs(song){
// //     const uploadTime = new Date(song.uploadTime).toLocaleString();
// //     return `<tr>
// //                 <td >${song.name}</td>
// //                 <td >${song.description}</td>
// //                 <td>
// //                     <img src="/images/${song.imageFile}" alt="${song.name}" style="max-width: 100px;">
// //                 </td>
// //                 <td>
// //                     <audio controls>
// //                         <source src="/music/${song.musicFile}" type="audio/mpeg">
// //                         Your browser does not support the audio element.
// //                     </audio>
// //                 </td>
// //                 <td>${uploadTime}</td>
// //                 <td>
// //                     <button class="btn btn-primary btn-sm" onclick="updateForm(${song.id})">Update</button>
// //                     <button class="btn btn-danger btn-sm" onclick="deleteSong(${song.id})">Delete</button>
// //                 </td>
// //             </tr>`;
// // }
// //
// //
// // $("#createSongForm").submit((e) => {
// //     e.preventDefault();
// //
// //     // FormData object
// //     const formData = new FormData();
// //     formData.append('name', $("#name").val());
// //     formData.append('description', $("#description").val());
// //     formData.append('imageFile', $("#imageFile")[0].files[0]);
// //     formData.append('musicFile', $("#musicFile")[0].files[0]);
// //
// //     $.ajax({
// //         method: "POST",
// //         url: "http://localhost:8080/api/songs",
// //         contentType: "application/json",
// //         data: JSON.stringify(songData),
// //         processData: false, // Required for FormData
// //         contentType: false, // Required for FormData
// //         success: function (response) {
// //             $("#successMessage").text("Added a song!");
// //             $("#successMessage").show().delay(3000).fadeOut();
// //             loadSongs(); // Reload playlists
// //             $("#createSongForm").hide();
// //             $("#addBtn").show();
// //             $("#createSongForm")[0].reset();
// //         },
// //         error: function () {
// //             $("#errorMessage").text("Failed to add song");
// //             $("#errorMessage").text("Failed to add song: " + xhr.responseText);
// //             $("#errorMessage").show().delay(3000).fadeOut();
// //         }
// //     });
// // })
// // Constants
// const API_URL = 'http://localhost:8080/api/songs';
//
// // Form submission handler
// $("#createSongForm").submit(function(e) {
//     e.preventDefault();
//
//     const formData = new FormData();
//     // Use .val() method correctly
//     formData.append('name', $("#name").val());
//     formData.append('description', $("#description").val());
//     // Get files correctly from the input elements
//     const imageFile = document.getElementById('imageFile').files[0];
//     const musicFile = document.getElementById('musicFile').files[0];
//     formData.append('imageFile', imageFile);
//     formData.append('musicFile', musicFile);
//
//     // Validate form data
//     if (!validateForm(formData)) {
//         return;
//     }
//
//     // Submit form data
//     submitSong(formData);
// });
//
// // Form validation
// function validateForm(formData) {
//     // Clear previous error messages
//     $("#errorMessage").hide();
//
//     // Check if all required fields are filled
//     if (!formData.get('name').trim()) {
//         showError("Song name is required");
//         return false;
//     }
//     if (!formData.get('description').trim()) {
//         showError("Description is required");
//         return false;
//     }
//     if (!formData.get('imageFile')) {
//         showError("Please select an image file");
//         return false;
//     }
//     if (!formData.get('musicFile')) {
//         showError("Please select a music file");
//         return false;
//     }
//
//     return true;
// }
//
// // Submit song to server
// function submitSong(formData) {
//     // Log the formData contents for debugging
//     for (let pair of formData.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//     }
//
//     $.ajax({
//         method: "POST",
//         url: API_URL,
//         data: formData,
//         processData: false,  // Don't process the files
//         contentType: false,  // Set content type to false as jQuery will tell the server
//         cache: false,
//         success: function(response) {
//             console.log('Success:', response);
//             showSuccess("Song added successfully!");
//             resetForm();
//             loadSongs();
//         },
//         error: function(xhr, status, error) {
//             console.error('Error:', error);
//             showError("Failed to add song: " + (xhr.responseText || "Unknown error"));
//         }
//     });
// }
//
// // Load all songs from server
// function loadSongs() {
//     $.ajax({
//         type: "GET",
//         url: API_URL,
//         success: function(data) {
//             renderSongList(data);
//         },
//         error: function() {
//             showError("Failed to load songs");
//         }
//     });
// }
//
// // Render song list
// function renderSongList(songs) {
//     if (!songs || !songs.length) {
//         $("#songList").html('<div class="alert alert-info">No songs available</div>');
//         return;
//     }
//
//     let content = `
//         <table class="table table-hover">
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Description</th>
//                     <th>Cover</th>
//                     <th>Music</th>
//                     <th>Upload Time</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;
//
//     songs.forEach(song => {
//         content += generateSongRow(song);
//     });
//
//     content += '</tbody></table>';
//     $("#songList").html(content);
// }
//
// // Generate HTML for a single song row
// function generateSongRow(song) {
//     const uploadTime = new Date(song.uploadTime).toLocaleString();
//     return `
//         <tr>
//             <td>${escapeHtml(song.name)}</td>
//             <td>${escapeHtml(song.description)}</td>
//             <td>
//                 <img src="/images/${escapeHtml(song.imageFile)}"
//                      alt="${escapeHtml(song.name)}"
//                      class="song-thumbnail">
//             </td>
//             <td>
//                 <audio controls class="audio-player">
//                     <source src="/music/${escapeHtml(song.musicFile)}" type="audio/mpeg">
//                     Your browser does not support the audio element.
//                 </audio>
//             </td>
//             <td>${uploadTime}</td>
//             <td>
//                 <div class="btn-group">
//                     <button class="btn btn-sm btn-primary" onclick="updateSong(${song.id})">
//                         <i class="fas fa-edit"></i>
//                     </button>
//                     <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </div>
//             </td>
//         </tr>
//     `;
// }
//
// // Delete song
// function deleteSong(id) {
//     if (!confirm('Are you sure you want to delete this song?')) {
//         return;
//     }
//
//     $.ajax({
//         method: "DELETE",
//         url: `${API_URL}/${id}`,
//         success: function() {
//             showSuccess("Song deleted successfully");
//             loadSongs();
//         },
//         error: function() {
//             showError("Failed to delete song");
//         }
//     });
// }
//
// // Update song (placeholder for future implementation)
// function updateSong(id) {
//     // TODO: Implement update functionality
//     console.log("Update song with ID:", id);
// }
//
// // Utility functions
// function resetForm() {
//     $("#createSongForm")[0].reset();
//     $("#createSongForm").hide();
//     $("#addBtn").show();
// }
//
// function showSuccess(message) {
//     $("#successMessage")
//         .text(message)
//         .show()
//         .delay(3000)
//         .fadeOut();
// }
//
// function showError(message) {
//     $("#errorMessage")
//         .text(message)
//         .show()
//         .delay(3000)
//         .fadeOut();
// }
//
// // HTML escape function for security
// function escapeHtml(unsafe) {
//     return unsafe
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }
//
// // Initialize on page load
// $(document).ready(function() {
//     loadSongs();
// });
// Load songs on page load
$(document).ready(() => loadSongs());

// Add button toggle
$("#addBtn").click(() => {
    $("#createSongForm").slideDown();
    $("#addBtn").hide();
});

$("#cancelBtn").click((e) => {
    e.preventDefault();
    $("#createSongForm").slideUp();
    $("#addBtn").show();
});

// Form submission handler
$("#createSongForm").submit((e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', $("#name").val());
    formData.append('description', $("#description").val());
    formData.append('imageFile', $("#imageFile")[0].files[0]);
    formData.append('musicFile', $("#musicFile")[0].files[0]);

    // Basic validation
    if (!formData.get('name') || !formData.get('description') ||
        !formData.get('imageFile') || !formData.get('musicFile')) {
        $("#errorMessage").text("All fields are required").show().delay(3000).fadeOut();
        return;
    }

    // Submit song
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/songs",
        data: formData,
        processData: false,
        contentType: false,
        success: () => {
            $("#successMessage").text("Song added successfully!").show().delay(3000).fadeOut();
            loadSongs();
            $("#createSongForm").slideUp()[0].reset();
            $("#addBtn").show();
        },
        error: (xhr) => {
            $("#errorMessage").text("Failed to add song: " + xhr.responseText).show().delay(3000).fadeOut();
        }
    });
});

// Load and render songs
function loadSongs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/songs",
        success: (data) => {
            const content = `
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Music</th>
                            <th>Upload Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(getSongs).join('')}
                    </tbody>
                </table>`;
            $("#songList").html(content);
        },
        error: () => {
            $("#errorMessage").text("Cannot load songs").show().delay(3000).fadeOut();
        }
    });
}

// Generate HTML for a song row
function getSongs(song) {
    const uploadTime = new Date(song.uploadTime).toLocaleString();
    return `
        <tr>
            <td>${song.name}</td>
            <td>${song.description}</td>
            <td><img src="/images/${song.imageFile}" style="max-width: 100px;"></td>
            <td>
                <audio controls>
                    <source src="/music/${song.musicFile}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </td>
            <td>${uploadTime}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="updateSong(${song.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSong(${song.id})">Delete</button>
            </td>
        </tr>`;
}

// Delete song
function deleteSong(id) {
    if (!confirm("Are you sure you want to delete this song?")) return;

    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/songs/${id}`,
        success: () => {
            $("#successMessage").text("Song deleted successfully").show().delay(3000).fadeOut();
            loadSongs();
        },
        error: () => {
            $("#errorMessage").text("Failed to delete song").show().delay(3000).fadeOut();
        }
    });
}

// Placeholder for updating songs
function updateSong(id) {
    console.log("Update song with ID:", id);
}

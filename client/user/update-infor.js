$(function() {
    $.ajax({
        url: 'http://localhost:8080/api/music/update',
        method: 'POST',
        contentType: 'text/plain',
        data: localStorage.getItem('username'),
        success: function(userDTO) {
            $('#username').val(userDTO.username);
            $('#fullName').val(userDTO.fullName);
            $('#email').val(userDTO.email);
            $('#phoneNumber').val(userDTO.phoneNumber);
        },
        error: function(xhr) {
            alert('Failed: ' + xhr.responseText);
            // Handle error
        }
    })
})

function updateInfor() {
    event.preventDefault();
    let infor = {
        'username': $('#username').val(),
        'fullName': $('#fullName').val(),
        'email': $('#email').val(),
        'phoneNumber': $('#phoneNumber').val()
    };
    $.ajax({
        url: 'http://localhost:8080/api/music/update',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(infor),
        success: function(message) {
            alert(message);
        },
        error: function(xhr) {
            alert('Failed: ' + xhr.responseText);
            // Handle error
        }
    })
}

function login() {
    event.preventDefault();
    window.location.href = 'login.html';
}


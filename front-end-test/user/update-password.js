$(function() {
    let username = localStorage.getItem('username');
    $("#username").val(username);
})

function updatePassword() {
    event.preventDefault();
    let infor = {
        'username': $('#username').val(),
        'oldPassword': $('#oldPassword').val(),
        'newPassword': $('#newPassword').val(),
        'confirmPassword': $('#confirmPassword').val()
    };
    $.ajax({
        url: 'http://localhost:8080/api/music/update4password',
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
    window.location.href = './login.html';
}
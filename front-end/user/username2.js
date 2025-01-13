function showChangeForm() {
    event.preventDefault();
    let username = $('#username').val();
    $.ajax({
        url: 'http://localhost:8080/api/music/username4password',
        method: 'POST',
        contentType: 'text/plain',
        data: username,
        success: function(username) {
            localStorage.setItem('username', username);
            window.location.href = './update-password.html'
        },
        error: function(xhr) {
            alert('Failed: ' + xhr.responseText);
            // Handle error
        }
    });
}

function login() {
    event.preventDefault();
    window.location.href = './login.html';
}
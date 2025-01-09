function showUpdateForm() {
    event.preventDefault();
    let username = $('#username').val();
    $.ajax({
        url: 'http://localhost:8080/api/music/username',
        method: 'POST',
        contentType: 'text/plain',
        data: username,
        success: function(username) {
            localStorage.setItem('username', username);
            window.location.href = './update-infor.html'
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
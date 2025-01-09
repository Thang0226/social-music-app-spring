$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8080/api/music/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function(jwtResponse) {
                alert('Login successful!');
                // Redirect or handle success
                localStorage.setItem('token', jwtResponse.token);
            },
            error: function(xhr) {
                alert('Login failed: ' + xhr.responseText);
                // Handle error
            }
        });
    });
});

function signUp() {
    event.preventDefault();
    window.location.href = "./sign-up.html";
}

function update() {
    event.preventDefault();
    window.location.href = "./username.html";
}
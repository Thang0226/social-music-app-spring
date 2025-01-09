$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const email = $('#user').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8080/api/music/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                alert('Login successful!');
                // Redirect or handle success
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
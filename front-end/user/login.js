$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: '/login',
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
$(document).ready(function() {
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();

        const signupData = {
            username: $('#username').val(),
            password: $('#password').val(),
            re_password: $('#re-password').val(),
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/music/signup',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(signupData),
            success: function(response) {
                alert('Signup successful!');
                // Redirect or handle success
            },
            error: function(xhr) {
                alert('Signup failed: ' + xhr.responseText);
                // Handle error
            }
        });
    });
});
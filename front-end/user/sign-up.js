$(document).ready(function() {
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();

        const signupData = {
            username: $('#username').val(),
            password: $('#password').val(),
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val()
        };

        $.ajax({
            url: '/signup',
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
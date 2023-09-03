var currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    var welcomeMessage = "Hi, " + currentUser.user_name + "! You have successfully logged in.";
    document.getElementById('welcome-message').innerHTML = welcomeMessage;

    // Add an event listener to the logout button
    var logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = './index.html';
    });
} else {
    console.log("No currentUser found in local storage.");
}
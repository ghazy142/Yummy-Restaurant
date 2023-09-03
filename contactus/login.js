var userEmail = document.getElementById('email');
var userPass = document.getElementById('pass');
var nameUser = document.getElementById('name_');
var userList = [];

function createList() {
    var name = document.getElementById('name_').value;
    var email = document.getElementById('email_').value;
    var password = document.getElementById('pass_').value;
    
    // Check if the email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
        alert("Please enter your email and password.");
        return;
    }

    // Check if the user email is valid
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email address! Please enter a valid email address.");
        return;
    }

    // Check if the email already exists in the userList
    var isDuplicate = false;
    var storedUserList = localStorage.getItem("userList");
    if (storedUserList) {
        userList = JSON.parse(storedUserList);
        for (var i = 0; i < userList.length; i++) {
            if (userList[i].user_mail === email) {
                isDuplicate = true;
                break;
            }
        }
    }

    if (isDuplicate) {
        alert("This email is already registered before!");
        return;
    } else {
        var user = {
            user_name: name,
            user_mail: email,
            user_pass: password
        };
        console.log(user);
        userList.push(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("userList", JSON.stringify(userList));
        alert("Registration successful!");

        // Redirect to the login page
        window.location.href = "./index.html";
    }
}

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    
    // Check if the email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
        alert("Please enter your email and password.");
        return;
    }
    
    // Retrieve the userList array from local storage
    var storedUserList = localStorage.getItem("userList");
    if (!storedUserList) {
        alert("No registered users found. Please sign up first.");
        return;
    }
    
    // Parse the storedUserList string back to an array
    var userList = JSON.parse(storedUserList);
    
    // Check if the email exists in the userList
    var isFound = false;
    var user;
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].user_mail === email) {
            isFound = true;
            user = userList[i];
            // Check if the password matches
            if (userList[i].user_pass === password) {
                var user = {
                    user_name: userList[i].user_name,
                    user_mail: email,
                    user_pass: password
                };
                console.log(user);
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert("Login successful!");
                // Redirect to the welcome page and pass the user's name as a parameter
                window.location.href = "./home.html?name=" + encodeURIComponent(user.user_name);
                return;
            } else {
                alert("Incorrect password!");
                return;
            }
        }
    }
    if (!isFound) {
        alert("Email not found! Please sign up first.");
        return;
    }
}
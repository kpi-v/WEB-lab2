function login(username, password) {
   return fetch('/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 'success') {
            localStorage.setItem('loginStatus', 'logged_in');
            localStorage.setItem('username', username);
            window.location.href = '/profile.html';
        } else {
            return data.message;
        }
    });
}

function logout() {
    fetch('/logout.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 'success') {
            localStorage.removeItem('loginStatus');
            localStorage.removeItem('username');
            window.location.href = '/';
        }
    });
}

function checkLoginStatus() {
    return fetch('./check.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 'logged_in') {
            localStorage.setItem('loginStatus', 'logged_in');
            localStorage.setItem('username', data.username);
        } else {
            localStorage.removeItem('loginStatus');
            localStorage.removeItem('username');
        }
        return data;
    });
}

function updateUIBasedOnLoginStatus() {
    const loginStatus = localStorage.getItem('loginStatus');
    const username = localStorage.getItem('username');

    const updateUI = (username) => {
        const loginLink = document.getElementById('login-btn');
        const signupLink = document.getElementById('signup-btn');
        const helloUser = document.getElementById('hello-user');

        if (loginLink) loginLink.classList.add('d-none');
        if (signupLink) signupLink.classList.add('d-none');
        if (helloUser) {
            helloUser.textContent = ` ${username}`;
            helloUser.classList.remove('d-none');
        }
    };

    if (loginStatus === 'logged_in' && username) {
        updateUI(username);
    }

    // Verify with the server
    checkLoginStatus().then(data => {
        if (data.status === 'logged_in') {
            const localUsername = localStorage.getItem('username');
            if (localUsername !== data.username) {
                updateUI(data.username);
            }
        } else {
            const loginLink = document.getElementById('login-btn');
            const signupLink = document.getElementById('signup-btn');
            const helloUser = document.getElementById('hello-user');

            if (loginLink) loginLink.classList.remove('d-none');
            if (signupLink) signupLink.classList.remove('d-none');
            if (helloUser) helloUser.classList.add('d-none');
        }
    });
}

// Call the function to update the UI on page load
document.addEventListener('DOMContentLoaded', updateUIBasedOnLoginStatus);

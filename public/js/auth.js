
const SESSION_KEY = 'ticketr_session';

function isAuthenticated() {
    return localStorage.getItem(SESSION_KEY) !== null;
}

function getCurrentUser() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

function login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return fetch('/auth/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
            window.location.href = '/dashboard';
        } else {
            throw new Error(data.message);
        }
    });
}

function signup(name, email, password, confirmPassword) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    return fetch('/auth/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
            window.location.href = '/dashboard';
        } else {
            throw new Error(data.message);
        }
    });
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/';
}

function protectRoute() {
    if (!isAuthenticated() && window.location.pathname !== '/auth/login' && window.location.pathname !== '/auth/signup' && window.location.pathname !== '/') {
        window.location.href = '/auth/login';
    }
}

// Protect routes on page load
protectRoute();

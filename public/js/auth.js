
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

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 animate-slide-in bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md flex items-center justify-between`;
    toast.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 focus:outline-none" aria-label="Close notification"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function displayError(field, message) {
    const errorElement = document.getElementById(field + '-error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    document.getElementById(field).classList.add('border-red-500');
    document.getElementById(field).classList.remove('border-gray-300', 'dark:border-gray-600');
}

function clearError(field) {
    const errorElement = document.getElementById(field + '-error');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    document.getElementById(field).classList.remove('border-red-500');
    document.getElementById(field).classList.add('border-gray-300', 'dark:border-gray-600');
}

function validateLoginForm() {
    let isValid = true;
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    clearError('email');
    clearError('password');

    if (!emailInput.value.trim()) {
        displayError('email', 'Email is required');
        isValid = false;
    } else if (!emailInput.value.includes('@')) {
        displayError('email', 'Invalid email format');
        isValid = false;
    }

    if (!passwordInput.value) {
        displayError('password', 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        displayError('password', 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

function validateSignupForm() {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    clearError('name');
    clearError('email');
    clearError('password');
    clearError('confirmPassword');

    if (!nameInput.value.trim()) {
        displayError('name', 'Name is required');
        isValid = false;
    }

    if (!emailInput.value.trim()) {
        displayError('email', 'Email is required');
        isValid = false;
    } else if (!emailInput.value.includes('@')) {
        displayError('email', 'Invalid email format');
        isValid = false;
    }

    if (!passwordInput.value) {
        displayError('password', 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        displayError('password', 'Password must be at least 6 characters');
        isValid = false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        displayError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function protectRoute() {
    if (!isAuthenticated() && window.location.pathname !== '/auth/login' && window.location.pathname !== '/auth/signup' && window.location.pathname !== '/') {
        window.location.href = '/auth/login';
    }
}

// Protect routes on page load
protectRoute();

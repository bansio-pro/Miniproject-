/* ============================================
   BUILDEASY — Login Page Scripts
   Connected to Express Backend API
   ============================================ */

const API_BASE = 'http://localhost:5000/api';
let selectedRole = 'customer';

/* -------- ROLE TOGGLE -------- */
function selectRole(role) {
    selectedRole = role;
    const slider = document.getElementById('roleSlider');
    const btns = document.querySelectorAll('.role-btn');

    btns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.role-btn[data-role="${role}"]`).classList.add('active');

    if (role === 'admin') {
        slider.classList.add('admin');
    } else {
        slider.classList.remove('admin');
    }
}

/* -------- TOGGLE PASSWORD VISIBILITY -------- */
function togglePassword() {
    const input = document.getElementById('loginPassword');
    const btn = input.parentElement.querySelector('.toggle-pass');
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁';
    }
}

/* -------- HANDLE LOGIN -------- */
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('btnLogin');

    if (!email || !password) {
        showToast('Please fill in all fields.', 'error');
        return false;
    }

    // Show loading spinner
    btn.classList.add('loading');

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role: selectedRole }),
        });

        const result = await res.json();
        btn.classList.remove('loading');

        if (!res.ok || !result.success) {
            showToast(result.message || 'Login failed. Please try again.', 'error');
            return false;
        }

        // Store JWT token and user data in localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data));

        showToast(result.message || 'Login successful! Redirecting...', 'success');

        // Redirect based on role
        setTimeout(() => {
            if (result.data.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 1200);
    } catch (error) {
        btn.classList.remove('loading');
        console.error('Login error:', error);
        showToast('Server unavailable. Please try again later.', 'error');
    }

    return false;
}

/* -------- HANDLE SIGNUP -------- */
async function signupUser() {
    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const password = document.getElementById('signupPassword')?.value;

    if (!name || !email || !password) {
        showToast('Please fill in all fields.', 'error');
        return false;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: selectedRole }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            showToast(result.message || 'Signup failed.', 'error');
            return false;
        }

        // Store token and user data immediately after signup
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data));

        showToast('Account created! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1200);
    } catch (error) {
        console.error('Signup error:', error);
        showToast('Server unavailable. Please try again later.', 'error');
    }

    return false;
}

/* -------- TOAST NOTIFICATIONS -------- */
function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/* -------- SIGNUP PLACEHOLDER (for show link) -------- */
function showSignup() {
    showToast('Signup coming soon!', 'success');
}

/* Legacy compat */
function loginUser() {
    return handleLogin(new Event('submit'));
}

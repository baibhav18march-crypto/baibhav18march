// app.js - simple client-side auth using localStorage (demo)
(function () {
  const onLoginPage = location.pathname.endsWith('index.html') || document.body.classList.contains('auth-page');

  function isLoggedIn() {
    return localStorage.getItem('lab_logged_in') === '1';
  }

  function setLoggedIn(username) {
    localStorage.setItem('lab_logged_in', '1');
    localStorage.setItem('lab_user', username || 'User');
  }

  function logout() {
    localStorage.removeItem('lab_logged_in');
    localStorage.removeItem('lab_user');
    // redirect to login page
    location.href = 'index.html';
  }

  // On login page: handle submit
  if (onLoginPage) {
    const form = document.getElementById('loginForm');
    if (isLoggedIn()) {
      // already logged in -> go to index
      location.href = 'dashboard.html';
    }
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        // Simple demo rule: accept any non-empty credentials
        if (!username || !password) {
          alert('Please enter username and password.');
          return;
        }
        setLoggedIn(username);
        // open index.html in the same tab
        location.href = 'dashboard.html';
      });
    }
    return;
  }

  // On index (protected) page: redirect to login if not logged in
  if (!isLoggedIn()) {
    location.href = 'index.html';
    return;
  }

  // Populate greeting
  const user = localStorage.getItem('lab_user') || 'User';
  const greeting = document.getElementById('greeting');
  if (greeting) greeting.textContent = `Hello, ${user}`;

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Confirm logout?')) {
        logout();
      }
    });
  }
})();

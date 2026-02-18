const $ = id => document.getElementById(id);

async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const user = await res.json();
      $('userDisplay').textContent = `Welcome, ${user.email}`;
      $('loginLink').style.display = 'none';
      $('logoutBtn').style.display = 'inline-block';
      return user;
    } else {
      $('userDisplay').textContent = 'Not logged in';
      $('loginLink').style.display = 'inline-block';
      $('logoutBtn').style.display = 'none';
    }
  } catch (e) {
    console.error('Auth check failed:', e);
    $('loginLink').style.display = 'inline-block';
    $('logoutBtn').style.display = 'none';
  }
}

async function logout() {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      window.location.href = '/fronted_dashbaord/longin%20page/index.html';
    }
  } catch (e) {
    alert('Logout failed: ' + e.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  $('logoutBtn').addEventListener('click', logout);
});

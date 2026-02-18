const $ = id => document.getElementById(id);

async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const user = await res.json();
      $('userDisplay').textContent = `Welcome, ${user.email} (${user.role || 'user'})`;
      $('loginLink').style.display = 'none';
      $('logoutBtn').style.display = 'inline-block';
      
      // Show/hide dashboard cards based on user role
      showDashboardsForRole(user.role);
      return user;
    } else {
      $('userDisplay').textContent = 'Not logged in';
      $('loginLink').style.display = 'inline-block';
      $('logoutBtn').style.display = 'none';
      
      // Hide all restricted dashboards for non-authenticated users
      const adminCard = document.querySelector('.admin-card');
      const ferwafaCard = document.querySelector('.ferwafa-card');
      const academyCard = document.querySelector('.academy-card');
      if (adminCard) adminCard.style.display = 'none';
      if (ferwafaCard) ferwafaCard.style.display = 'none';
      if (academyCard) academyCard.style.display = 'none';
    }
  } catch (e) {
    console.error('Auth check failed:', e);
    $('loginLink').style.display = 'inline-block';
    $('logoutBtn').style.display = 'none';
    
    // Hide restricted dashboards on error
    const academyCard = document.querySelector('.academy-card');
    if (adminCard) adminCard.style.display = 'none';
    if (ferwafaCard) ferwafaCard.style.display = 'none';
    if (academyCard) academyment.querySelector('.ferwafa-card');
    if (adminCard) adminCard.style.display = 'none';
    if (ferwafaCard) ferwafaCard.style.display = 'none';
  }
}

function showDashboardsForRole(role) {
  const adminCard = document.querySelector('.admin-card');
  const ferwafaCard = document.querySelector('.ferwafa-card');
  const academyCard = document.querySelector('.academy-card');
  
  // Hide all restricted dashboards by default
  if (adminCard) adminCard.style.display = 'none';
  if (ferwafaCard) ferwafaCard.style.display = 'none';
  if (academyCard) academyCard.style.display = 'none';
  
  // Show based on role
  if (role === 'admin') {
    // Admin can see everything
    if (adminCard) adminCard.style.display = 'block';
    if (ferwafaCard) ferwafaCard.style.display = 'block';
    if (academyCard) academyCard.style.display = 'block';
  } else if (role === 'ferwafa') {
    // Ferwafa can only see players dashboard
    if (ferwafaCard) ferwafaCard.style.display = 'block';
  } else if (role === 'manager') {
    // Manager can see academy and ferwafa
    if (academyCard) academyCard.style.display = 'block';
    if (ferwafaCard) ferwafaCard.style.display = 'block';
  }
  // Other roles (viewer) see only generic dashboards
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

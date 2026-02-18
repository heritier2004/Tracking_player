let currentUser = null;
let isAdminUser = false;

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      try {
        // Call your backend API to authenticate
        const response = await authenticateUser(username, password);
        
        if (response.success) {
          currentUser = response.user;
          isAdminUser = response.user.role === 'admin';
          
          // Store user info in localStorage
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('userRole', response.user.role);
          localStorage.setItem('token', response.user.token);
          
          // Show role selection screen
          showRoleSelection(response.user.name);
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
});

// Authenticate User (Replace with your actual API call)
async function authenticateUser(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (response.ok) {
      return {
        success: true,
        user: await response.json()
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    // Demo mode - allow any login
    console.log('Backend not available, using demo mode...');
    
    // Demo users
    const demoUsers = {
      'admin': { id: 'admin1', name: 'Admin User', role: 'admin', token: 'admin-token' },
      'scout': { id: 'scout1', name: 'Scout User', role: 'scout', token: 'scout-token' },
      'academy': { id: 'acad1', name: 'Academy User', role: 'academy', token: 'academy-token' },
      'school': { id: 'sch1', name: 'School User', role: 'school', token: 'school-token' },
      'club': { id: 'club1', name: 'Club User', role: 'club', token: 'club-token' }
    };
    
    if (demoUsers[username]) {
      return {
        success: true,
        user: demoUsers[username]
      };
    }
    
    return { success: false };
  }
}

// Show Role Selection Screen
function showRoleSelection(userName) {
  // Hide login screen
  document.getElementById('loginScreen').classList.remove('active');
  
  // Show role selection screen
  document.getElementById('roleSelectionScreen').classList.add('active');
  
  // Set greeting
  document.getElementById('userGreeting').textContent = `Welcome, ${userName}! Select your dashboard:`;
  
  // Show/hide admin cards based on user role
  if (isAdminUser) {
    document.getElementById('adminCard').style.display = 'block';
    document.getElementById('ferwafaCard').style.display = 'block';
  } else {
    document.getElementById('adminCard').style.display = 'none';
    document.getElementById('ferwafaCard').style.display = 'none';
  }
}

// Go Back to Login
function goBackToLogin() {
  currentUser = null;
  isAdminUser = false;
  
  document.getElementById('roleSelectionScreen').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
  
  // Clear form
  document.getElementById('loginForm').reset();
  
  // Clear localStorage
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('token');
}

// Select Role and Navigate
function selectRole(role) {
  // Store selected role
  localStorage.setItem('selectedRole', role);
  
  // Redirect to respective dashboard
  redirectToDashboard(role);
}

// Redirect to Dashboard
function redirectToDashboard(role) {
  const dashboardPaths = {
    'scout': '../scouting_dashboard/index.html',
    'academy': '../academy_dashboard/index.html',
    'school': '../school_dashboard/index.html',
    'club': '../club_dashboard/index.html',
    'admin': '../admin_dashbaord/ondex.html',
    'ferwafa': '../ferwafa_dashboard/index.html'
  };
  
  if (dashboardPaths[role]) {
    window.location.href = dashboardPaths[role];
  } else {
    alert('Dashboard not found');
  }
}
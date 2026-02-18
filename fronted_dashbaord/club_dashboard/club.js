const API = {
  teams: '/api/club/teams',
  roster: '/api/club/roster',
  matches: '/api/club/matches',
  staff: '/api/club/staff',
  me: '/api/auth/me'
};

const $ = id => document.getElementById(id);

// TAB SWITCHING
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    switchTab(tabName);
  });
});

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  
  // Remove active class
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + '-tab').style.display = 'block';
  
  // Add active class to button
  event.target.classList.add('active');
  
  // Load data for tab
  if (tabName === 'teams') loadTeams();
  else if (tabName === 'roster') loadRoster();
  else if (tabName === 'matches') loadMatches();
  else if (tabName === 'staff') loadStaff();
  else if (tabName === 'stats') loadStats();
}

// TEAMS
async function loadTeams() {
  try {
    const res = await fetch(API.teams, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const teams = await res.json();
    renderTeams(teams);
  } catch (e) {
    alert('Failed to load teams: ' + e.message);
  }
}

function renderTeams(teams) {
  const tbody = document.querySelector('#teamsTable tbody');
  tbody.innerHTML = '';
  (teams || []).forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(t.name)}</strong></td>
      <td>${escapeHtml(t.category || '—')}</td>
      <td>${escapeHtml(t.coach || '—')}</td>
      <td>${t.playerCount || 0}</td>
      <td>${t.founded || '—'}</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function showAddTeamModal() {
  $('addTeamModal').style.display = 'block';
}

function closeModal(modalId) {
  $(modalId).style.display = 'none';
}

function saveTeam() {
  const name = $('teamName').value.trim();
  const category = $('teamCategory').value.trim();
  const coach = $('teamCoach').value.trim();
  
  if (!name || !category) {
    alert('Please fill in required fields');
    return;
  }
  
  const team = {
    name, category, coach,
    playerCount: 0,
    founded: new Date().getFullYear().toString()
  };
  
  fetch(API.teams, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team)
  }).then(res => {
    if (res.ok) {
      closeModal('addTeamModal');
      loadTeams();
      alert('Team added successfully');
    }
  }).catch(e => alert('Error: ' + e.message));
}

// ROSTER
async function loadRoster() {
  try {
    const res = await fetch(API.roster, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const roster = await res.json();
    renderRoster(roster);
  } catch (e) {
    alert('Failed to load roster: ' + e.message);
  }
}

function renderRoster(roster) {
  const tbody = document.querySelector('#rosterTable tbody');
  tbody.innerHTML = '';
  (roster || []).forEach(p => {
    const tr = document.createElement('tr');
    const statusColor = p.status === 'active' ? '#10b981' : '#ef4444';
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.name)}</strong></td>
      <td>${escapeHtml(p.position || '—')}</td>
      <td>${p.number || '—'}</td>
      <td>${p.age || '—'}</td>
      <td><span style="background:${statusColor};color:#fff;padding:4px 8px;border-radius:4px;font-size:0.8rem">${p.status || 'active'}</span></td>
      <td>${p.joined || '—'}</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// MATCHES
async function loadMatches() {
  try {
    const res = await fetch(API.matches, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const matches = await res.json();
    renderMatches(matches);
  } catch (e) {
    alert('Failed to load matches: ' + e.message);
  }
}

function renderMatches(matches) {
  const tbody = document.querySelector('#matchesTable tbody');
  tbody.innerHTML = '';
  (matches || []).forEach(m => {
    const tr = document.createElement('tr');
    const statusColor = m.status === 'completed' ? '#6b7280' : m.status === 'ongoing' ? '#f59e0b' : '#3b82f6';
    tr.innerHTML = `
      <td>${m.date || '—'}</td>
      <td>${escapeHtml(m.homeTeam || '—')}</td>
      <td>${escapeHtml(m.awayTeam || '—')}</td>
      <td>${escapeHtml(m.venue || '—')}</td>
      <td><strong>${m.result || '—'}</strong></td>
      <td><span style="background:${statusColor};color:#fff;padding:4px 8px;border-radius:4px;font-size:0.8rem">${m.status || 'scheduled'}</span></td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Details</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// STAFF
async function loadStaff() {
  try {
    const res = await fetch(API.staff, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const staff = await res.json();
    renderStaff(staff);
  } catch (e) {
    alert('Failed to load staff: ' + e.message);
  }
}

function renderStaff(staff) {
  const tbody = document.querySelector('#staffTable tbody');
  tbody.innerHTML = '';
  (staff || []).forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(s.name)}</strong></td>
      <td>${escapeHtml(s.position || '—')}</td>
      <td>${escapeHtml(s.department || '—')}</td>
      <td>${escapeHtml(s.contact || '—')}</td>
      <td>${s.since || '—'}</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// STATS
function loadStats() {
  fetch(API.teams, { credentials: 'include' })
    .then(res => res.json())
    .then(teams => {
      $('totalTeams').textContent = teams.length;
      const totalPlayers = teams.reduce((sum, t) => sum + (t.playerCount || 0), 0);
      $('totalPlayers').textContent = totalPlayers;
    })
    .catch(e => console.error('Error loading stats:', e));
}

// BUTTON EVENTS
$('addTeamBtn').addEventListener('click', showAddTeamModal);
$('addPlayerRosterBtn').addEventListener('click', () => alert('Add player feature coming soon'));
$('addMatchBtn').addEventListener('click', () => alert('Schedule match feature coming soon'));
$('addStaffBtn').addEventListener('click', () => alert('Add staff feature coming soon'));

$('applyRosterBtn').addEventListener('click', () => {
  loadRoster();
});

$('clearRosterBtn').addEventListener('click', () => {
  $('teamFilter').value = '';
  $('playerSearchFilter').value = '';
  loadRoster();
});

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  }[c]));
}

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
  loadTeams();
});

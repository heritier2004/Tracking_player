const API = {
  academies: '/api/academies',
  players: '/api/academy/players',
  coaches: '/api/academy/coaches',
  tournaments: '/api/academy/tournaments',
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
  if (tabName === 'players') loadPlayers();
  else if (tabName === 'coaches') loadCoaches();
  else if (tabName === 'tournaments') loadTournaments();
  else if (tabName === 'development') loadStats();
}

// PLAYERS
async function loadPlayers() {
  try {
    const res = await fetch(API.players, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const players = await res.json();
    renderPlayers(players);
  } catch (e) {
    alert('Failed to load players: ' + e.message);
  }
}

function renderPlayers(players) {
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  (players || []).forEach(p => {
    const tr = document.createElement('tr');
    const gradeColor = p.grade === 'A' ? '#10b981' : p.grade === 'B' ? '#f59e0b' : '#ef4444';
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.name)}</strong></td>
      <td>${escapeHtml(p.position || '—')}</td>
      <td>${p.age || '—'}</td>
      <td><span style="background:${gradeColor};color:#fff;padding:4px 8px;border-radius:4px;font-weight:600">${p.grade || '—'}</span></td>
      <td>${p.height || '—'} cm / ${p.weight || '—'} kg</td>
      <td>${p.joined || '—'}</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem" onclick="editPlayer('${p.id}')">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function showAddPlayerModal() {
  $('addPlayerModal').style.display = 'block';
}

function closeModal(modalId) {
  $(modalId).style.display = 'none';
}

function savePlayer() {
  const name = $('playerName').value.trim();
  const position = $('playerPosition').value.trim();
  const age = $('playerAge').value;
  const height = $('playerHeight').value;
  const weight = $('playerWeight').value;
  const grade = $('playerGrade').value;
  
  if (!name || !position || !age) {
    alert('Please fill in all required fields');
    return;
  }
  
  const player = {
    name, position, age: parseInt(age), height, weight, grade,
    joined: new Date().toISOString().split('T')[0]
  };
  
  fetch(API.players, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player)
  }).then(res => {
    if (res.ok) {
      closeModal('addPlayerModal');
      loadPlayers();
      alert('Player added successfully');
    }
  }).catch(e => alert('Error: ' + e.message));
}

function editPlayer(id) {
  alert('Edit player ' + id + ' (Coming soon)');
}

// COACHES
async function loadCoaches() {
  try {
    const res = await fetch(API.coaches, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const coaches = await res.json();
    renderCoaches(coaches);
  } catch (e) {
    alert('Failed to load coaches: ' + e.message);
  }
}

function renderCoaches(coaches) {
  const tbody = document.querySelector('#coachesTable tbody');
  tbody.innerHTML = '';
  (coaches || []).forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(c.name)}</strong></td>
      <td>${escapeHtml(c.role || '—')}</td>
      <td>${escapeHtml(c.specialization || '—')}</td>
      <td>${c.experience || '—'} years</td>
      <td>${escapeHtml(c.contact || '—')}</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// TOURNAMENTS
async function loadTournaments() {
  try {
    const res = await fetch(API.tournaments, { credentials: 'include' });
    if (!res.ok) throw new Error(res.statusText);
    const tournaments = await res.json();
    renderTournaments(tournaments);
  } catch (e) {
    alert('Failed to load tournaments: ' + e.message);
  }
}

function renderTournaments(tournaments) {
  const tbody = document.querySelector('#tournamentsTable tbody');
  tbody.innerHTML = '';
  (tournaments || []).forEach(t => {
    const tr = document.createElement('tr');
    const statusColor = t.status === 'active' ? '#10b981' : t.status === 'upcoming' ? '#f59e0b' : '#6b7280';
    tr.innerHTML = `
      <td><strong>${escapeHtml(t.name)}</strong></td>
      <td>${t.date || '—'}</td>
      <td>${escapeHtml(t.location || '—')}</td>
      <td><span style="background:${statusColor};color:#fff;padding:4px 8px;border-radius:4px;font-size:0.8rem">${t.status || '—'}</span></td>
      <td>${t.matches || 0} matches</td>
      <td><button class="btn" style="padding:6px 12px;font-size:0.8rem">Details</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// STATS
function loadStats() {
  fetch(API.players, { credentials: 'include' })
    .then(res => res.json())
    .then(players => {
      const total = players.length;
      const gradeA = players.filter(p => p.grade === 'A').length;
      const gradeB = players.filter(p => p.grade === 'B').length;
      const gradeC = players.filter(p => p.grade === 'C').length;
      
      $('totalPlayers').textContent = total;
      $('gradeA').textContent = gradeA;
      $('gradeB').textContent = gradeB;
      $('gradeC').textContent = gradeC;
    })
    .catch(e => console.error('Error loading stats:', e));
}

// BUTTON EVENTS
$('addPlayerBtn').addEventListener('click', showAddPlayerModal);
$('addCoachBtn').addEventListener('click', () => alert('Add coach feature coming soon'));
$('addTournamentBtn').addEventListener('click', () => alert('Register tournament feature coming soon'));

$('applyPlayersBtn').addEventListener('click', () => {
  const grade = $('filterGrade').value.trim().toUpperCase();
  const position = $('filterPosition').value.trim();
  const age = $('filterAge').value;
  
  fetch(API.players, { credentials: 'include' })
    .then(res => res.json())
    .then(players => {
      let filtered = players;
      if (grade) filtered = filtered.filter(p => p.grade === grade);
      if (position) filtered = filtered.filter(p => p.position && p.position.toLowerCase().includes(position.toLowerCase()));
      if (age) filtered = filtered.filter(p => parseInt(p.age) === parseInt(age));
      renderPlayers(filtered);
    });
});

$('clearPlayersBtn').addEventListener('click', () => {
  $('filterGrade').value = '';
  $('filterPosition').value = '';
  $('filterAge').value = '';
  loadPlayers();
});

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  }[c]));
}

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
  loadPlayers();
});

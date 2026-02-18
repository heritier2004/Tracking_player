/* ========================================
   SCHOOL DASHBOARD - COMPLETE JAVASCRIPT
   Players & Matches Management System
   ======================================== */

// ========================================
// GLOBAL VARIABLES & DATA
// ========================================

let playersData = [];
let matchesData = [];
let currentEditingPlayerId = null;
let currentMatchSetup = {
  id: '',
  opponent: '',
  date: '',
  location: '',
  selectedPlayers: [],
  startingLineup: {},
  benchPlayers: []
};

// Sample Players Data
const samplePlayers = [
  { id: 1, name: 'Jean Claude Munyandamutsa', position: 'Goalkeeper', dateOfBirth: '1998-05-15', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 1, bio: 'Excellent goalkeeper' },
  { id: 2, name: 'Eric Mutesi', position: 'Defender', dateOfBirth: '1999-08-22', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 4, bio: 'Strong defender' },
  { id: 3, name: 'Patrick Kamanzi', position: 'Defender', dateOfBirth: '2000-03-10', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 5, bio: 'Aggressive defense' },
  { id: 4, name: 'David Rwego', position: 'Defender', dateOfBirth: '1999-11-05', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 3, bio: 'Quick defender' },
  { id: 5, name: 'Samuel Habimana', position: 'Midfielder', dateOfBirth: '1998-07-18', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 7, bio: 'Creative midfielder' },
  { id: 6, name: 'Joseph Kamali', position: 'Midfielder', dateOfBirth: '2000-02-14', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 8, bio: 'Physical midfielder' },
  { id: 7, name: 'Moses Ingabire', position: 'Midfielder', dateOfBirth: '1999-09-28', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 6, bio: 'Skilled passer' },
  { id: 8, name: 'Alex Muhire', position: 'Forward', dateOfBirth: '2000-06-12', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 9, bio: 'Clinical finisher' },
  { id: 9, name: 'Philip Nkurunziza', position: 'Forward', dateOfBirth: '1999-01-30', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 10, bio: 'Pace and power' },
  { id: 10, name: 'Thierry Irakoze', position: 'Forward', dateOfBirth: '1998-12-08', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 11, bio: 'Lethal striker' },
  { id: 11, name: 'Robert Mwiseneza', position: 'Goalkeeper', dateOfBirth: '2001-04-20', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 23, bio: 'Young talent' },
  { id: 12, name: 'Pierre Muyombano', position: 'Defender', dateOfBirth: '2000-10-15', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 2, bio: 'Solid defender' },
  { id: 13, name: 'Henry Nkunda', position: 'Midfielder', dateOfBirth: '1999-05-22', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 12, bio: 'Box to box' },
  { id: 14, name: 'Anthony Turoshe', position: 'Forward', dateOfBirth: '2000-08-09', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 14, bio: 'Super sub' },
  { id: 15, name: 'Vincent Kayungirizi', position: 'Defender', dateOfBirth: '1999-03-17', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 15, bio: 'Left back' },
  { id: 16, name: 'Lewis Mfizi', position: 'Midfielder', dateOfBirth: '2000-11-25', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 16, bio: 'Playmaker' },
  { id: 17, name: 'Frank Nkosi', position: 'Forward', dateOfBirth: '1998-09-03', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 17, bio: 'Winger' },
  { id: 18, name: 'Simon Mugwaneza', position: 'Midfielder', dateOfBirth: '1999-06-19', school: 'Green Hills School', location: 'Kigali', jerseyNumber: 18, bio: 'Defensive mid' }
];

// Pitch Positions (11 starting players)
const pitchPositions = {
  'gk': { label: 'GK', count: 1 },
  'def': { label: 'DEF', count: 4, positions: ['pos-1', 'pos-2', 'pos-3', 'pos-4'] },
  'mid': { label: 'MID', count: 4, positions: ['pos-5', 'pos-6', 'pos-7', 'pos-8'] },
  'fwd': { label: 'FWD', count: 3, positions: ['pos-9', 'pos-10', 'pos-11'] }
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  loadPlayersFromStorage();
  loadMatchesFromStorage();
  initializeDashboard();
  initializePlayersSection();
  initializeMatchesSection();
  setupEventListeners();
});

function loadPlayersFromStorage() {
  const stored = localStorage.getItem('playersData');
  if (stored) {
    playersData = JSON.parse(stored);
  } else {
    playersData = [...samplePlayers];
    savePlayersToStorage();
  }
}

function savePlayersToStorage() {
  localStorage.setItem('playersData', JSON.stringify(playersData));
}

function loadMatchesFromStorage() {
  const stored = localStorage.getItem('matchesData');
  if (stored) {
    matchesData = JSON.parse(stored);
  } else {
    matchesData = [];
  }
}

function saveMatchesToStorage() {
  localStorage.setItem('matchesData', JSON.stringify(matchesData));
}

// ========================================
// SECTION NAVIGATION
// ========================================

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const selectedSection = document.getElementById(sectionName);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }

  // Update sidebar active state
  document.querySelectorAll('.sidebar .menu li').forEach(li => {
    li.classList.remove('active');
  });
  event.target.closest('li').classList.add('active');
}

// ========================================
// DASHBOARD SECTION
// ========================================

function initializeDashboard() {
  // Dashboard initialization code here
  console.log('Dashboard initialized with', playersData.length, 'players');
}

// ========================================
// PLAYERS SECTION
// ========================================

function initializePlayersSection() {
  renderPlayersGrid();
}

function renderPlayersGrid() {
  const grid = document.getElementById('playersGrid');
  if (!grid) return;

  grid.innerHTML = playersData.map(player => `
    <div class="player-card" onclick="viewPlayerDetails(${player.id})">
      <div class="player-image">
        ${player.image ? `<img src="${player.image}" alt="${player.name}">` : '<i class="fas fa-user-circle"></i>'}
      </div>
      <div class="player-info">
        <h3>${player.name}</h3>
        <p class="player-position">${player.position}</p>
        <div class="player-meta">
          <span><strong>#${player.jerseyNumber || '-'}</strong></span>
          <span>${player.dateOfBirth ? calculateAge(player.dateOfBirth) + ' yrs' : '-'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function openAddPlayerModal() {
  currentEditingPlayerId = null;
  document.getElementById('modalTitle').textContent = 'Add New Player';
  document.getElementById('playerForm').reset();
  document.getElementById('profilePreview').innerHTML = '<i class="fas fa-user-circle"></i><p>Upload Photo</p>';
  openModal('playerModal');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('modalOverlay');
  if (modal) {
    modal.classList.add('active');
  }
  if (overlay) {
    overlay.classList.add('active');
  }
}

function closePlayerModal() {
  closeModal('playerModal');
}

function closeDetailModal() {
  closeModal('playerDetailModal');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('modalOverlay');
  if (modal) {
    modal.classList.remove('active');
  }
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.getElementById('modalOverlay').classList.remove('active');
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('profilePreview');
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const playerForm = document.getElementById('playerForm');
  if (playerForm) {
    playerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      savePlayer();
    });
  }
});

function savePlayer() {
  const name = document.getElementById('playerName').value;
  const position = document.getElementById('playerPosition').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const school = document.getElementById('school').value;
  const location = document.getElementById('location').value;
  const jerseyNumber = document.getElementById('playerJerseyNumber').value;
  const bio = document.getElementById('playerBio').value;

  if (!name || !position || !dateOfBirth || !location) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (currentEditingPlayerId) {
    // Update existing player
    const player = playersData.find(p => p.id === currentEditingPlayerId);
    if (player) {
      player.name = name;
      player.position = position;
      player.dateOfBirth = dateOfBirth;
      player.school = school;
      player.location = location;
      player.jerseyNumber = jerseyNumber || player.jerseyNumber;
      player.bio = bio;
      showNotification('Player updated successfully', 'success');
    }
  } else {
    // Add new player
    const newPlayer = {
      id: Date.now(),
      name,
      position,
      dateOfBirth,
      school,
      location,
      jerseyNumber: jerseyNumber || playersData.length + 1,
      bio
    };
    playersData.push(newPlayer);
    showNotification('Player added successfully', 'success');
  }

  savePlayersToStorage();
  renderPlayersGrid();
  closePlayerModal();
}

function viewPlayerDetails(playerId) {
  const player = playersData.find(p => p.id === playerId);
  if (!player) return;

  currentEditingPlayerId = playerId;
  const detailContent = document.getElementById('playerDetailContent');

  detailContent.innerHTML = `
    <div class="player-detail-content">
      <div class="player-detail-image">
        ${player.image ? `<img src="${player.image}" alt="${player.name}">` : '<i class="fas fa-user-circle"></i>'}
      </div>
      <div class="player-detail-info">
        <h3>${player.name}</h3>
        <div class="detail-item">
          <span class="detail-label">Position:</span>
          <span class="detail-value">${player.position}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Age:</span>
          <span class="detail-value">${calculateAge(player.dateOfBirth)} years</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Jersey:</span>
          <span class="detail-value">#${player.jerseyNumber || '-'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${player.location}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Bio:</span>
          <span class="detail-value">${player.bio || 'N/A'}</span>
        </div>
      </div>
    </div>
  `;

  openModal('playerDetailModal');
}

function editPlayer() {
  const player = playersData.find(p => p.id === currentEditingPlayerId);
  if (!player) return;

  closeDetailModal();
  document.getElementById('modalTitle').textContent = 'Edit Player';
  document.getElementById('playerName').value = player.name;
  document.getElementById('playerPosition').value = player.position;
  document.getElementById('dateOfBirth').value = player.dateOfBirth;
  document.getElementById('school').value = player.school;
  document.getElementById('location').value = player.location;
  document.getElementById('playerJerseyNumber').value = player.jerseyNumber || '';
  document.getElementById('playerBio').value = player.bio || '';

  if (player.image) {
    document.getElementById('profilePreview').innerHTML = `<img src="${player.image}" alt="Preview">`;
  }

  openModal('playerModal');
}

function deletePlayer() {
  if (confirm('Are you sure you want to delete this player?')) {
    playersData = playersData.filter(p => p.id !== currentEditingPlayerId);
    savePlayersToStorage();
    renderPlayersGrid();
    closeDetailModal();
    showNotification('Player deleted successfully', 'success');
  }
}

// ========================================
// MATCHES SECTION
// ========================================

function initializeMatchesSection() {
  generateMatchId();
  loadAvailablePlayersForMatch();
}

function generateMatchId() {
  const matchId = 'MATCH-' + String(matchesData.length + 1).padStart(3, '0');
  document.getElementById('matchId').value = matchId;
  currentMatchSetup.id = matchId;
}

function createNewMatch() {
  const opponent = document.getElementById('opponentTeam').value;
  const date = document.getElementById('matchDate').value;
  const location = document.getElementById('matchLocation').value;

  if (!opponent || !date || !location) {
    showNotification('Please fill in all match details', 'error');
    return;
  }

  currentMatchSetup.opponent = opponent;
  currentMatchSetup.date = date;
  currentMatchSetup.location = location;

  showNotification('Match info saved! Now select 18 players', 'success');
}

function loadAvailablePlayersForMatch() {
  const list = document.getElementById('availablePlayersList');
  list.innerHTML = playersData.map(player => `
    <div class="player-item" onclick="togglePlayerSelection(this, ${player.id})">
      <div class="player-item-checkbox">✓</div>
      <span>${player.name} (${player.position})</span>
    </div>
  `).join('');
}

function togglePlayerSelection(element, playerId) {
  const player = playersData.find(p => p.id === playerId);
  if (!player) return;

  element.classList.toggle('selected');

  if (element.classList.contains('selected')) {
    if (currentMatchSetup.selectedPlayers.length < 18) {
      currentMatchSetup.selectedPlayers.push(player);
      showNotification(`${player.name} selected (${currentMatchSetup.selectedPlayers.length}/18)`, 'success');
    } else {
      element.classList.remove('selected');
      showNotification('Maximum 18 players allowed', 'error');
    }
  } else {
    currentMatchSetup.selectedPlayers = currentMatchSetup.selectedPlayers.filter(p => p.id !== playerId);
    showNotification(`${player.name} removed`, 'success');
  }

  updateBenchPlayers();
}

function updateBenchPlayers() {
  const benchContainer = document.getElementById('benchPlayers');
  const benchPlayers = currentMatchSetup.selectedPlayers.slice(11); // 7 bench players

  benchContainer.innerHTML = benchPlayers.map((player, index) => `
    <div class="bench-player" onclick="addPlayerToLineup(${player.id})">
      <strong>${player.name}</strong>
      <small>${player.position}</small>
    </div>
  `).join('');

  // If less than 7 bench, show empty slots
  for (let i = benchPlayers.length; i < 7; i++) {
    benchContainer.innerHTML += `<div class="bench-player" style="opacity: 0.5; border-style: dashed;">Empty Slot</div>`;
  }
}

function addPlayerToLineup(playerId) {
  const player = playersData.find(p => p.id === playerId);
  if (!player) return;

  // Find first available position for the player's position
  const position = findAvailablePosition(player.position);
  if (!position) {
    showNotification('No available position for this player', 'warning');
    return;
  }

  addPlayerToPosition(position, player);
}

function findAvailablePosition(playerPosition) {
  const allPositions = document.querySelectorAll('.pitch-position');
  
  for (let pos of allPositions) {
    const slot = pos.querySelector('.player-slot');
    if (!slot.classList.contains('filled')) {
      return pos.id;
    }
  }
  return null;
}

function addPlayerToPosition(positionId, player) {
  const positionElement = document.getElementById(positionId);
  if (!positionElement) return;

  const playerSlot = positionElement.querySelector('.player-slot');
  playerSlot.classList.add('filled');
  playerSlot.setAttribute('data-name', player.name);
  playerSlot.innerHTML = '<i class="fas fa-user-circle"></i>';
  
  // Store player data in the element
  playerSlot.dataset.playerId = player.id;
  playerSlot.dataset.playerName = player.name;
  playerSlot.dataset.playerPosition = player.position;
  
  currentMatchSetup.startingLineup[positionId] = player;
  showNotification(`${player.name} added to lineup`, 'success');
  updateLineupDisplay();
}

function removePlayerFromLineup(positionId) {
  const positionElement = document.getElementById(positionId);
  if (!positionElement) return;

  const playerSlot = positionElement.querySelector('.player-slot');
  const playerName = playerSlot.dataset.playerName;
  
  playerSlot.classList.remove('filled');
  playerSlot.removeAttribute('data-name');
  playerSlot.removeAttribute('data-playerId');
  playerSlot.removeAttribute('data-playerName');
  playerSlot.removeAttribute('data-playerPosition');
  playerSlot.innerHTML = '<i class="fas fa-user-circle"></i>';
  
  delete currentMatchSetup.startingLineup[positionId];
  showNotification(`${playerName} removed from lineup`, 'success');
  updateLineupDisplay();
}

function updateLineupDisplay() {
  // Update visual representation of lineup
  const filledPositions = Object.keys(currentMatchSetup.startingLineup).length;
  console.log(`Current lineup: ${filledPositions}/11 players`);
}

function saveMatchLineup() {
  const filledPositions = Object.keys(currentMatchSetup.startingLineup).length;

  if (filledPositions !== 11) {
    showNotification(`Please fill all 11 starting positions (${filledPositions}/11)`, 'error');
    return;
  }

  if (currentMatchSetup.selectedPlayers.length < 18) {
    showNotification(`Please select at least 18 players (${currentMatchSetup.selectedPlayers.length}/18)`, 'error');
    return;
  }

  if (!currentMatchSetup.opponent || !currentMatchSetup.date || !currentMatchSetup.location) {
    showNotification('Please fill in match details first', 'error');
    return;
  }

  // Create match object
  const match = {
    id: currentMatchSetup.id,
    opponent: currentMatchSetup.opponent,
    date: currentMatchSetup.date,
    location: currentMatchSetup.location,
    selectedPlayers: currentMatchSetup.selectedPlayers,
    startingLineup: currentMatchSetup.startingLineup,
    benchPlayers: currentMatchSetup.selectedPlayers.slice(11),
    createdAt: new Date().toISOString()
  };

  matchesData.push(match);
  saveMatchesToStorage();
  showNotification('Match lineup saved successfully!', 'success');
  resetLineup();
}

function resetLineup() {
  // Clear all pitch positions
  document.querySelectorAll('.player-slot.filled').forEach(slot => {
    slot.classList.remove('filled');
    slot.removeAttribute('data-name');
    slot.removeAttribute('data-playerId');
    slot.removeAttribute('data-playerName');
    slot.removeAttribute('data-playerPosition');
    slot.innerHTML = '<i class="fas fa-user-circle"></i>';
  });

  // Clear selected players
  document.querySelectorAll('.player-item.selected').forEach(item => {
    item.classList.remove('selected');
  });

  // Reset match setup
  currentMatchSetup = {
    id: '',
    opponent: '',
    date: '',
    location: '',
    selectedPlayers: [],
    startingLineup: {},
    benchPlayers: []
  };

  // Clear form
  document.getElementById('opponentTeam').value = '';
  document.getElementById('matchDate').value = '';
  document.getElementById('matchLocation').value = '';
  document.getElementById('benchPlayers').innerHTML = '';

  // Generate new match ID
  generateMatchId();
  showNotification('Match setup cleared', 'success');
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = '../longin page/index.html';
  }
}

// Auto-save every 30 seconds
setInterval(() => {
  savePlayersToStorage();
  saveMatchesToStorage();
}, 30000);

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  // Ctrl+N: New player
  if (event.ctrlKey && event.key === 'n') {
    event.preventDefault();
    openAddPlayerModal();
  }
  // Escape: Close modals
  if (event.key === 'Escape') {
    closeAllModals();
  }
});

// Setup event listeners
function setupEventListeners() {
  // Player form submission
  const playerForm = document.getElementById('playerForm');
  if (playerForm) {
    playerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      savePlayer();
    });
  }

  // Pitch position click handlers
  document.querySelectorAll('.pitch-position').forEach(pos => {
    pos.addEventListener('click', function(e) {
      const playerSlot = this.querySelector('.player-slot');
      if (playerSlot.classList.contains('filled')) {
        removePlayerFromLineup(this.id);
      }
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
  setupEventListeners();
}
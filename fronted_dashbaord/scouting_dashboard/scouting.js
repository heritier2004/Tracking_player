// ============================================
// SCOUT DASHBOARD - MAIN JAVASCRIPT FILE
// ============================================

// ============================================
// SAMPLE DATA INITIALIZATION
// ============================================

const samplePlayers = [
  {
    id: 1,
    name: 'Karim Benzema',
    position: 'Striker',
    age: 24,
    height: '185cm',
    weight: '81kg',
    rating: 4.8,
    team: 'Green Hills School',
    school: 'Green Hills',
    location: 'Kigali',
    jerseyNumber: 9,
    bio: 'Explosive striker with excellent finishing ability',
    status: 'rising-star',
    technicalSkills: {
      passing: 8.2,
      dribbling: 8.8,
      shooting: 9.5,
      ballControl: 8.6,
      positioning: 8.3
    },
    physicalAttributes: {
      speed: 8.9,
      strength: 8.4,
      stamina: 8.1,
      agility: 8.7,
      jumping: 8.3
    },
    matchPerformance: [8.5, 8.2, 8.8, 8.1, 8.9, 8.4, 8.7, 8.3],
    weeklyProgress: [7.8, 8.0, 8.2, 8.1, 8.3, 8.5, 8.6],
    scoutNotes: []
  },
  {
    id: 2,
    name: 'Mohamed Salah',
    position: 'Winger',
    age: 22,
    height: '175cm',
    weight: '73kg',
    rating: 4.7,
    team: 'Stars Academy',
    school: 'Stars Academy',
    location: 'Kigali',
    jerseyNumber: 7,
    bio: 'Pacey winger with excellent crossing ability',
    status: 'top-talent',
    technicalSkills: {
      passing: 8.4,
      dribbling: 9.1,
      shooting: 8.2,
      ballControl: 8.9,
      positioning: 8.5
    },
    physicalAttributes: {
      speed: 9.3,
      strength: 7.8,
      stamina: 8.8,
      agility: 9.2,
      jumping: 7.5
    },
    matchPerformance: [8.6, 8.4, 8.7, 8.5, 8.8, 8.3, 8.9],
    weeklyProgress: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8],
    scoutNotes: []
  },
  {
    id: 3,
    name: 'Virgil van Dijk',
    position: 'Defender',
    age: 23,
    height: '193cm',
    weight: '87kg',
    rating: 4.9,
    team: 'Kigali FC',
    school: 'Kigali FC',
    location: 'Kigali',
    jerseyNumber: 4,
    bio: 'Commanding center-back with excellent leadership',
    status: 'top-talent',
    technicalSkills: {
      passing: 8.1,
      dribbling: 7.2,
      shooting: 6.8,
      ballControl: 8.0,
      positioning: 9.2
    },
    physicalAttributes: {
      speed: 8.3,
      strength: 9.4,
      stamina: 8.9,
      agility: 8.1,
      jumping: 9.3
    },
    matchPerformance: [8.8, 8.7, 8.9, 8.6, 8.8, 8.7, 8.9],
    weeklyProgress: [8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0],
    scoutNotes: []
  },
  {
    id: 4,
    name: 'Joshua Kimmich',
    position: 'Midfielder',
    age: 21,
    height: '178cm',
    weight: '77kg',
    rating: 4.6,
    team: 'Patriots Club',
    school: 'Patriots Club',
    location: 'Kigali',
    jerseyNumber: 6,
    bio: 'Versatile midfielder with great tactical awareness',
    status: 'rising-star',
    technicalSkills: {
      passing: 8.9,
      dribbling: 8.3,
      shooting: 7.8,
      ballControl: 8.7,
      positioning: 8.8
    },
    physicalAttributes: {
      speed: 8.4,
      strength: 8.1,
      stamina: 8.6,
      agility: 8.5,
      jumping: 7.8
    },
    matchPerformance: [8.2, 8.4, 8.3, 8.5, 8.4, 8.6, 8.5],
    weeklyProgress: [8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6],
    scoutNotes: []
  },
  {
    id: 5,
    name: 'Jorginho',
    position: 'Midfielder',
    age: 20,
    height: '177cm',
    weight: '75kg',
    rating: 4.4,
    team: 'Masters Academy',
    school: 'Masters Academy',
    location: 'Kigali',
    jerseyNumber: 5,
    bio: 'Defensive midfielder with excellent pressing skills',
    status: 'monitor',
    technicalSkills: {
      passing: 8.6,
      dribbling: 7.9,
      shooting: 6.5,
      ballControl: 8.4,
      positioning: 8.5
    },
    physicalAttributes: {
      speed: 8.1,
      strength: 8.3,
      stamina: 8.7,
      agility: 8.2,
      jumping: 7.6
    },
    matchPerformance: [8.0, 8.2, 8.1, 8.3, 8.2, 8.4, 8.3],
    weeklyProgress: [7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4],
    scoutNotes: []
  },
  {
    id: 6,
    name: 'Ederson',
    position: 'Goalkeeper',
    age: 23,
    height: '188cm',
    weight: '82kg',
    rating: 4.7,
    team: 'Green Hills School',
    school: 'Green Hills',
    location: 'Kigali',
    jerseyNumber: 1,
    bio: 'Modern goalkeeper with excellent ball-playing skills',
    status: 'top-talent',
    technicalSkills: {
      passing: 8.7,
      dribbling: 7.1,
      shooting: 6.0,
      ballControl: 8.5,
      positioning: 8.9
    },
    physicalAttributes: {
      speed: 8.0,
      strength: 8.6,
      stamina: 8.3,
      agility: 8.4,
      jumping: 8.8
    },
    matchPerformance: [8.4, 8.5, 8.3, 8.6, 8.4, 8.5, 8.4],
    weeklyProgress: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8],
    scoutNotes: []
  }
];

// More players to reach total count
const additionalPlayers = Array.from({ length: 242 }, (_, i) => ({
  id: i + 7,
  name: `Player ${i + 1}`,
  position: ['Striker', 'Winger', 'Midfielder', 'Defender', 'Goalkeeper'][Math.floor(Math.random() * 5)],
  age: Math.floor(Math.random() * 10) + 18,
  height: Math.floor(Math.random() * 20) + 165 + 'cm',
  weight: Math.floor(Math.random() * 30) + 65 + 'kg',
  rating: (Math.random() * 2 + 3.5).toFixed(1),
  team: ['Green Hills School', 'Stars Academy', 'Kigali FC', 'Patriots Club', 'Masters Academy'][Math.floor(Math.random() * 5)],
  school: ['Green Hills', 'Stars Academy', 'Kigali FC', 'Patriots Club', 'Masters Academy'][Math.floor(Math.random() * 5)],
  location: 'Kigali',
  jerseyNumber: Math.floor(Math.random() * 99) + 1,
  bio: 'Talented young player with potential for growth',
  status: Math.random() > 0.7 ? 'rising-star' : (Math.random() > 0.5 ? 'top-talent' : 'monitor'),
  technicalSkills: {
    passing: (Math.random() * 3 + 6.5).toFixed(1),
    dribbling: (Math.random() * 3 + 6.5).toFixed(1),
    shooting: (Math.random() * 3 + 6.5).toFixed(1),
    ballControl: (Math.random() * 3 + 6.5).toFixed(1),
    positioning: (Math.random() * 3 + 6.5).toFixed(1)
  },
  physicalAttributes: {
    speed: (Math.random() * 3 + 6.5).toFixed(1),
    strength: (Math.random() * 3 + 6.5).toFixed(1),
    stamina: (Math.random() * 3 + 6.5).toFixed(1),
    agility: (Math.random() * 3 + 6.5).toFixed(1),
    jumping: (Math.random() * 3 + 6.5).toFixed(1)
  },
  matchPerformance: Array.from({ length: 8 }, () => (Math.random() * 3 + 6.5).toFixed(1)),
  weeklyProgress: Array.from({ length: 7 }, () => (Math.random() * 3 + 6.5).toFixed(1)),
  scoutNotes: []
}));

const allPlayers = [...samplePlayers, ...additionalPlayers];

// ============================================
// GLOBAL STATE & INITIALIZATION
// ============================================

let currentFilter = '';
let currentSortType = 'rating';
let communicationHistory = [];
let selectedPlayerForPerformance = null;
let charts = {};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
});

function initializeDashboard() {
  loadCommunicationHistory();
  updateKPICards();
  initializeCharts();
  populatePlayerSelects();
  renderPlayersGrid();
  showNotification('Dashboard loaded successfully', 'success');
}

// ============================================
// KPI CARDS - UPDATE STATISTICS
// ============================================

function updateKPICards() {
  const totalPlayers = allPlayers.length;
  const topRatedPlayers = allPlayers.filter(p => p.rating >= 4.7).length;
  const risingStars = allPlayers.filter(p => p.status === 'rising-star').length;
  const targetPlayers = allPlayers.filter(p => p.rating >= 4.8).length;

  document.getElementById('totalPlayers').textContent = totalPlayers;
  document.getElementById('topRatedPlayers').textContent = topRatedPlayers;
  document.getElementById('risingStars').textContent = risingStars;
  document.getElementById('targetPlayers').textContent = targetPlayers;
}

// ============================================
// CHARTS INITIALIZATION - CHART.JS INTEGRATION
// ============================================

function initializeCharts() {
  // Performance Distribution Chart
  const performanceCtx = document.getElementById('performanceChart')?.getContext('2d');
  if (performanceCtx) {
    const performanceData = {
      excellent: allPlayers.filter(p => p.rating >= 4.7).length,
      good: allPlayers.filter(p => p.rating >= 4.3 && p.rating < 4.7).length,
      average: allPlayers.filter(p => p.rating >= 3.8 && p.rating < 4.3).length,
      needsImprovement: allPlayers.filter(p => p.rating < 3.8).length
    };

    charts.performance = new Chart(performanceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Excellent (4.7+)', 'Good (4.3-4.7)', 'Average (3.8-4.3)', 'Needs Improvement'],
        datasets: [{
          data: [performanceData.excellent, performanceData.good, performanceData.average, performanceData.needsImprovement],
          backgroundColor: ['#00897b', '#1565c0', '#ff6f00', '#d32f2f'],
          borderColor: ['#fff', '#fff', '#fff', '#fff'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 12 } }
          }
        }
      }
    });
  }

  // Position Analysis Chart
  const positionCtx = document.getElementById('positionChart')?.getContext('2d');
  if (positionCtx) {
    const positions = ['Striker', 'Winger', 'Midfielder', 'Defender', 'Goalkeeper'];
    const positionCounts = positions.map(pos => allPlayers.filter(p => p.position === pos).length);

    charts.position = new Chart(positionCtx, {
      type: 'bar',
      data: {
        labels: positions,
        datasets: [{
          label: 'Player Count',
          data: positionCounts,
          backgroundColor: ['#00897b', '#1565c0', '#ff6f00', '#7b1fa2', '#0d47a1'],
          borderColor: ['#00897b', '#1565c0', '#ff6f00', '#7b1fa2', '#0d47a1'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { beginAtZero: true }
        }
      }
    });
  }

  // Skills Chart
  const skillsCtx = document.getElementById('skillsChart')?.getContext('2d');
  if (skillsCtx) {
    const avgSkills = {
      passing: (allPlayers.reduce((sum, p) => sum + parseFloat(p.technicalSkills.passing), 0) / allPlayers.length).toFixed(1),
      dribbling: (allPlayers.reduce((sum, p) => sum + parseFloat(p.technicalSkills.dribbling), 0) / allPlayers.length).toFixed(1),
      shooting: (allPlayers.reduce((sum, p) => sum + parseFloat(p.technicalSkills.shooting), 0) / allPlayers.length).toFixed(1),
      ballControl: (allPlayers.reduce((sum, p) => sum + parseFloat(p.technicalSkills.ballControl), 0) / allPlayers.length).toFixed(1),
      positioning: (allPlayers.reduce((sum, p) => sum + parseFloat(p.technicalSkills.positioning), 0) / allPlayers.length).toFixed(1)
    };

    charts.skills = new Chart(skillsCtx, {
      type: 'radar',
      data: {
        labels: ['Passing', 'Dribbling', 'Shooting', 'Ball Control', 'Positioning'],
        datasets: [{
          label: 'Average Rating',
          data: Object.values(avgSkills).map(v => parseFloat(v)),
          borderColor: '#00897b',
          backgroundColor: 'rgba(0, 137, 123, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#00897b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });
  }

  // Team Distribution Chart
  const teamCtx = document.getElementById('teamDistributionChart')?.getContext('2d');
  if (teamCtx) {
    const teams = ['Green Hills School', 'Stars Academy', 'Kigali FC', 'Patriots Club', 'Masters Academy'];
    const teamCounts = teams.map(team => allPlayers.filter(p => p.team === team).length);

    charts.teamDistribution = new Chart(teamCtx, {
      type: 'doughnut',
      data: {
        labels: teams,
        datasets: [{
          data: teamCounts,
          backgroundColor: ['#0d47a1', '#1565c0', '#00897b', '#7b1fa2', '#ff6f00'],
          borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: { font: { size: 11 } }
          }
        }
      }
    });
  }
}

// ============================================
// SECTION NAVIGATION
// ============================================

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Remove active class from menu items
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.remove('active');
  });

  // Show selected section
  document.getElementById(sectionId)?.classList.add('active');

  // Add active class to clicked menu item
  event.target.closest('li')?.classList.add('active');
}

// ============================================
// PLAYER MANAGEMENT & DISPLAY
// ============================================

function populatePlayerSelects() {
  // Populate player detail select
  const playerDetailSelect = document.getElementById('playerDetailSelect');
  if (playerDetailSelect) {
    playerDetailSelect.innerHTML = '<option value="">Choose a player...</option>';
    allPlayers.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id;
      option.textContent = `${player.name} - ${player.position}`;
      playerDetailSelect.appendChild(option);
    });
  }

  // Populate player for recommendation select
  const playerForRec = document.getElementById('playerForRecommendation');
  if (playerForRec) {
    playerForRec.innerHTML = '<option value="">Choose player...</option>';
    allPlayers.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id;
      option.textContent = `${player.name} (${player.position})`;
      playerForRec.appendChild(option);
    });
  }
}

function renderPlayersGrid(players = allPlayers) {
  const grid = document.getElementById('playersGrid');
  if (!grid) return;

  grid.innerHTML = '';

  players.slice(0, 12).forEach(player => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="player-card-header">
        <div class="player-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="player-status ${player.status}">
          ${player.status === 'top-talent' ? '⭐ Top' : player.status === 'rising-star' ? '🔥 Rising' : '📊 Monitor'}
        </div>
      </div>
      <div class="player-card-body">
        <h4>${player.name}</h4>
        <p class="position">${player.position}</p>
        <p class="team">${player.team}</p>
        <div class="rating">
          <span class="rating-number">${player.rating}</span>
          <div class="stars">${'★'.repeat(Math.round(player.rating))}</div>
        </div>
      </div>
      <div class="player-card-footer">
        <small>Age: ${player.age} | #${player.jerseyNumber}</small>
        <button class="btn btn-small" onclick="viewPlayerDetails(${player.id})">
          <i class="fas fa-eye"></i> View
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function viewPlayerDetails(playerId) {
  const player = allPlayers.find(p => p.id === playerId);
  if (!player) return;

  selectedPlayerForPerformance = player;
  document.getElementById('detailedStatsContainer').style.display = 'block';
  
  // Update player header
  document.getElementById('playerStatsName').textContent = player.name;
  document.getElementById('playerStatsPosition').textContent = `${player.position} | Age: ${player.age} | Height: ${player.height} | Weight: ${player.weight}`;
  document.getElementById('playerOverallRating').textContent = player.rating;
  
  // Update stars
  const starsContainer = document.getElementById('playerStars');
  starsContainer.innerHTML = '★'.repeat(Math.round(player.rating)) + '☆'.repeat(5 - Math.round(player.rating));

  loadPlayerPerformanceCharts(player);
  updateStatsTable(player);
  loadScoutNotes(player.id);

  // Scroll to stats container
  document.getElementById('detailedStatsContainer').scrollIntoView({ behavior: 'smooth' });
}

function loadPlayerPerformanceCharts(player) {
  // Technical Skills Radar
  const technicalCtx = document.getElementById('technicalSkillsChart')?.getContext('2d');
  if (technicalCtx) {
    if (charts.technicalSkills) charts.technicalSkills.destroy();
    charts.technicalSkills = new Chart(technicalCtx, {
      type: 'radar',
      data: {
        labels: ['Passing', 'Dribbling', 'Shooting', 'Ball Control', 'Positioning'],
        datasets: [{
          label: player.name,
          data: [
            player.technicalSkills.passing,
            player.technicalSkills.dribbling,
            player.technicalSkills.shooting,
            player.technicalSkills.ballControl,
            player.technicalSkills.positioning
          ],
          borderColor: '#00897b',
          backgroundColor: 'rgba(0, 137, 123, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#00897b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: { r: { beginAtZero: true, max: 10 } }
      }
    });
  }

  // Physical Attributes Radar
  const physicalCtx = document.getElementById('physicalAttributesChart')?.getContext('2d');
  if (physicalCtx) {
    if (charts.physicalAttributes) charts.physicalAttributes.destroy();
    charts.physicalAttributes = new Chart(physicalCtx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Strength', 'Stamina', 'Agility', 'Jumping'],
        datasets: [{
          label: player.name,
          data: [
            player.physicalAttributes.speed,
            player.physicalAttributes.strength,
            player.physicalAttributes.stamina,
            player.physicalAttributes.agility,
            player.physicalAttributes.jumping
          ],
          borderColor: '#1565c0',
          backgroundColor: 'rgba(21, 101, 192, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#1565c0'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: { r: { beginAtZero: true, max: 10 } }
      }
    });
  }

  // Match Performance Line Chart
  const matchCtx = document.getElementById('matchPerformanceChart')?.getContext('2d');
  if (matchCtx) {
    if (charts.matchPerformance) charts.matchPerformance.destroy();
    charts.matchPerformance = new Chart(matchCtx, {
      type: 'line',
      data: {
        labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6', 'Match 7', 'Match 8'],
        datasets: [{
          label: 'Performance Rating',
          data: player.matchPerformance.map(v => parseFloat(v)),
          borderColor: '#00897b',
          backgroundColor: 'rgba(0, 137, 123, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#00897b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: { beginAtZero: true, max: 10 }
        }
      }
    });
  }

  // Weekly Progress Line Chart
  const weeklyCtx = document.getElementById('weeklyProgressChart')?.getContext('2d');
  if (weeklyCtx) {
    if (charts.weeklyProgress) charts.weeklyProgress.destroy();
    charts.weeklyProgress = new Chart(weeklyCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        datasets: [{
          label: 'Weekly Progress',
          data: player.weeklyProgress.map(v => parseFloat(v)),
          borderColor: '#ff6f00',
          backgroundColor: 'rgba(255, 111, 0, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#ff6f00'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: { beginAtZero: true, max: 10 }
        }
      }
    });
  }
}

function updateStatsTable(player) {
  const tbody = document.getElementById('statsTableBody');
  if (!tbody) return;

  const stats = [
    { metric: 'Total Matches', value: 8, avg: 6, vsTeam: '+2' },
    { metric: 'Goals', value: 12, avg: 5, vsTeam: '+7' },
    { metric: 'Assists', value: 4, avg: 2, vsTeam: '+2' },
    { metric: 'Pass Accuracy', value: '87%', avg: '78%', vsTeam: '+9%' },
    { metric: 'Tackles', value: 28, avg: 15, vsTeam: '+13' },
    { metric: 'Interceptions', value: 12, avg: 8, vsTeam: '+4' }
  ];

  tbody.innerHTML = stats.map(stat => `
    <tr>
      <td>${stat.metric}</td>
      <td class="value">${stat.value}</td>
      <td class="avg">${stat.avg}</td>
      <td class="vs-team positive">${stat.vsTeam}</td>
    </tr>
  `).join('');
}

function searchPlayers() {
  const searchTerm = document.getElementById('playerSearchInput')?.value.toLowerCase() || '';
  const filtered = allPlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.position.toLowerCase().includes(searchTerm) ||
    p.team.toLowerCase().includes(searchTerm)
  );
  renderPlayersGrid(filtered);
}

function sortPlayers() {
  const sortType = document.getElementById('playerSortSelect')?.value || 'rating';
  let sorted = [...allPlayers];

  switch (sortType) {
    case 'rating':
      sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'position':
      sorted.sort((a, b) => a.position.localeCompare(b.position));
      break;
    case 'age':
      sorted.sort((a, b) => a.age - b.age);
      break;
  }

  renderPlayersGrid(sorted);
}

function filterDashboardData() {
  const filterType = document.getElementById('dashboardFilter')?.value || '';
  
  if (!filterType) {
    updateKPICards();
  } else {
    const teamTypes = {
      school: ['Green Hills', 'Stars Academy', 'Masters Academy'],
      club: ['Kigali FC', 'Patriots Club'],
      academy: ['Stars Academy', 'Masters Academy']
    };

    const filtered = allPlayers.filter(p => 
      teamTypes[filterType]?.includes(p.school)
    );

    // Update KPI cards with filtered data
    document.getElementById('totalPlayers').textContent = filtered.length;
    document.getElementById('topRatedPlayers').textContent = filtered.filter(p => p.rating >= 4.7).length;
    document.getElementById('risingStars').textContent = filtered.filter(p => p.status === 'rising-star').length;
    document.getElementById('targetPlayers').textContent = filtered.filter(p => p.rating >= 4.8).length;
  }
}

// ============================================
// COMMUNICATION & RECOMMENDATIONS
// ============================================

function sendCommunication(event) {
  event.preventDefault();

  const recipientType = document.querySelector('input[name="recipientType"]:checked')?.value;
  const team = document.getElementById('teamSelect')?.value;
  const contactPerson = document.getElementById('contactPerson')?.value;
  const playerId = document.getElementById('playerForRecommendation')?.value;
  const recommendationLevel = document.querySelector('input[name="recommendationLevel"]:checked')?.value;
  const messageBody = document.getElementById('messageBody')?.value;

  if (!recipientType || !team || !contactPerson || !playerId || !recommendationLevel || !messageBody) {
    showNotification('Please fill all fields', 'error');
    return;
  }

  const player = allPlayers.find(p => p.id === parseInt(playerId));
  const communication = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    recipientType,
    team,
    contactPerson,
    playerName: player.name,
    playerId,
    recommendationLevel: parseInt(recommendationLevel),
    message: messageBody
  };

  communicationHistory.push(communication);
  saveCommunicationHistory();

  // Reset form
  document.getElementById('communicationForm').reset();
  displayCommunicationHistory();
  showNotification('Recommendation sent successfully', 'success');
}

function saveCommunicationHistory() {
  localStorage.setItem('scoutCommunications', JSON.stringify(communicationHistory));
}

function loadCommunicationHistory() {
  const saved = localStorage.getItem('scoutCommunications');
  communicationHistory = saved ? JSON.parse(saved) : [];
  displayCommunicationHistory();
}

function displayCommunicationHistory(filterType = 'all') {
  const list = document.getElementById('communicationList');
  if (!list) return;

  let filtered = communicationHistory;
  if (filterType !== 'all') {
    filtered = communicationHistory.filter(c => c.recipientType === filterType);
  }

  list.innerHTML = filtered.length === 0 ? '<p class="empty-state">No communications yet</p>' : '';

  filtered.reverse().forEach(comm => {
    const stars = '★'.repeat(comm.recommendationLevel) + '☆'.repeat(5 - comm.recommendationLevel);
    const item = document.createElement('div');
    item.className = 'communication-item';
    item.innerHTML = `
      <div class="comm-header">
        <div>
          <h4>${comm.playerName}</h4>
          <p class="recipient">${comm.contactPerson} at ${comm.team}</p>
        </div>
        <div class="comm-meta">
          <span class="rating">${stars}</span>
          <small>${comm.timestamp}</small>
        </div>
      </div>
      <p class="comm-message">${comm.message}</p>
    `;
    list.appendChild(item);
  });
}

function filterCommunication(type) {
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  displayCommunicationHistory(type);
}

// ============================================
// SCOUT NOTES MANAGEMENT
// ============================================

function saveScoutNotes() {
  if (!selectedPlayerForPerformance) {
    showNotification('Please select a player first', 'error');
    return;
  }

  const notes = document.getElementById('scoutNotes')?.value;
  if (!notes.trim()) {
    showNotification('Please enter some notes', 'error');
    return;
  }

  const note = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    content: notes
  };

  selectedPlayerForPerformance.scoutNotes.push(note);
  document.getElementById('scoutNotes').value = '';
  loadScoutNotes(selectedPlayerForPerformance.id);
  showNotification('Notes saved successfully', 'success');
}

function loadScoutNotes(playerId) {
  const player = allPlayers.find(p => p.id === playerId);
  const notesDisplay = document.getElementById('notesDisplay');
  
  if (!notesDisplay) return;
  if (!player?.scoutNotes?.length) {
    notesDisplay.innerHTML = '<p class="empty-state">No notes yet</p>';
    return;
  }

  notesDisplay.innerHTML = player.scoutNotes.map(note => `
    <div class="note-item">
      <small class="note-date">${note.timestamp}</small>
      <p>${note.content}</p>
    </div>
  `).join('');
}

function loadPlayerPerformance() {
  const playerId = document.getElementById('playerDetailSelect')?.value;
  if (!playerId) {
    showNotification('Please select a player', 'error');
    return;
  }
  const player = allPlayers.find(p => p.id === parseInt(playerId));
  if (player) {
    viewPlayerDetails(player.id);
  }
}

// ============================================
// REPORTS GENERATION
// ============================================

function generateFullReport() {
  const report = `
    SCOUT DASHBOARD - COMPREHENSIVE TALENT REPORT
    Generated: ${new Date().toLocaleString()}
    
    EXECUTIVE SUMMARY
    Total Players Analyzed: ${allPlayers.length}
    Top Rated (4.7+): ${allPlayers.filter(p => p.rating >= 4.7).length}
    Rising Stars: ${allPlayers.filter(p => p.status === 'rising-star').length}
    Target Players: ${allPlayers.filter(p => p.rating >= 4.8).length}
    
    COMMUNICATIONS SENT: ${communicationHistory.length}
    
    Report generated for: Football Talent Management System
  `;

  downloadReport(report, 'Scout_Full_Report.txt');
  showNotification('Full report generated', 'success');
}

function generateTopTalentReport() {
  const topTalent = allPlayers.filter(p => p.rating >= 4.7).sort((a, b) => b.rating - a.rating);
  
  const report = `
    TOP TALENT REPORT
    Generated: ${new Date().toLocaleString()}
    
    Total Top Talent Players: ${topTalent.length}
    
    ${topTalent.map(p => `
    ${p.name} - ${p.position}
    Rating: ${p.rating}/5
    Team: ${p.team}
    Age: ${p.age}
    Status: ${p.status}
    `).join('\n---\n')}
  `;

  downloadReport(report, 'Top_Talent_Report.txt');
  showNotification('Top Talent report generated', 'success');
}

function generatePositionReport() {
  const positions = ['Striker', 'Winger', 'Midfielder', 'Defender', 'Goalkeeper'];
  const report = `
    POSITION-SPECIFIC TALENT REPORT
    Generated: ${new Date().toLocaleString()}
    
    ${positions.map(pos => {
      const posPlayers = allPlayers.filter(p => p.position === pos);
      const topPos = posPlayers.sort((a, b) => b.rating - a.rating)[0];
      return `
${pos.toUpperCase()}
Total Players: ${posPlayers.length}
Average Rating: ${(posPlayers.reduce((sum, p) => sum + parseFloat(p.rating), 0) / posPlayers.length).toFixed(2)}
Top Player: ${topPos.name} (${topPos.rating})
      `;
    }).join('\n')}
  `;

  downloadReport(report, 'Position_Report.txt');
  showNotification('Position report generated', 'success');
}

function generateRisingStarsReport() {
  const risingStars = allPlayers.filter(p => p.status === 'rising-star').sort((a, b) => b.rating - a.rating);
  
  const report = `
    RISING STARS TALENT REPORT
    Generated: ${new Date().toLocaleString()}
    
    Total Rising Stars: ${risingStars.length}
    
    ${risingStars.map(p => `
    ${p.name} - ${p.position}
    Current Rating: ${p.rating}/5
    Team: ${p.team}
    Age: ${p.age}
    Improvement Trend: +0.3/5 this season
    `).join('\n---\n')}
  `;

  downloadReport(report, 'Rising_Stars_Report.txt');
  showNotification('Rising Stars report generated', 'success');
}

function generateTeamComparisonReport() {
  const teams = ['Green Hills School', 'Stars Academy', 'Kigali FC', 'Patriots Club', 'Masters Academy'];
  
  const report = `
    TEAM COMPARISON TALENT REPORT
    Generated: ${new Date().toLocaleString()}
    
    ${teams.map(team => {
      const teamPlayers = allPlayers.filter(p => p.team === team);
      const avgRating = (teamPlayers.reduce((sum, p) => sum + parseFloat(p.rating), 0) / teamPlayers.length).toFixed(2);
      return `
${team.toUpperCase()}
Total Players: ${teamPlayers.length}
Average Rating: ${avgRating}
Top Talent: ${teamPlayers.sort((a, b) => b.rating - a.rating)[0]?.name}
Top Rating: ${teamPlayers.sort((a, b) => b.rating - a.rating)[0]?.rating}
      `;
    }).join('\n')}
  `;

  downloadReport(report, 'Team_Comparison_Report.txt');
  showNotification('Team Comparison report generated', 'success');
}

function downloadReport(content, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function exportPerformanceData() {
  if (!selectedPlayerForPerformance) {
    showNotification('Please select a player first', 'error');
    return;
  }

  const player = selectedPlayerForPerformance;
  const data = `
    PLAYER PERFORMANCE EXPORT
    ${player.name} - ${player.position}
    
    PERSONAL DETAILS
    Age: ${player.age}
    Height: ${player.height}
    Weight: ${player.weight}
    Jersey Number: ${player.jerseyNumber}
    Team: ${player.team}
    Overall Rating: ${player.rating}/5
    
    TECHNICAL SKILLS
    Passing: ${player.technicalSkills.passing}
    Dribbling: ${player.technicalSkills.dribbling}
    Shooting: ${player.technicalSkills.shooting}
    Ball Control: ${player.technicalSkills.ballControl}
    Positioning: ${player.technicalSkills.positioning}
    
    PHYSICAL ATTRIBUTES
    Speed: ${player.physicalAttributes.speed}
    Strength: ${player.physicalAttributes.strength}
    Stamina: ${player.physicalAttributes.stamina}
    Agility: ${player.physicalAttributes.agility}
    Jumping: ${player.physicalAttributes.jumping}
    
    SCOUT NOTES: ${player.scoutNotes.length || 'None'}
    Generated: ${new Date().toLocaleString()}
  `;

  downloadReport(data, `${player.name}_Performance.txt`);
  showNotification('Performance data exported', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    ${message}
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = '/longin page/index.html';
  }
}

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

window.addEventListener('resize', () => {
  Object.values(charts).forEach(chart => {
    if (chart) chart.resize();
  });
});

// Initialize dashboard on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
  initializeDashboard();
}
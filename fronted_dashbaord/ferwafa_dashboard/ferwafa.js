const API_TOP = '/api/players/top';
const $ = id => document.getElementById(id);

async function loadTop(){
  const school = (($('filterSchool').value||'').trim());
  const academy = (($('filterAcademy').value||'').trim());
  const min_goals = (($('minGoals').value||'').trim());
  
  // Show loading spinner
  $('loadingSpinner').style.display = 'block';
  $('noResults').style.display = 'none';
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  
  const qs = new URLSearchParams();
  if(school) qs.set('school', school);
  if(academy) qs.set('academy', academy);
  if(min_goals) qs.set('min_goals', min_goals);
  qs.set('limit', '100');
  
  try{
    const res = await fetch(API_TOP + '?' + qs.toString(), {credentials:'include'});
    if(!res.ok) throw new Error(res.statusText);
    const players = await res.json();
    
    // Hide loading spinner
    $('loadingSpinner').style.display = 'none';
    
    if(players.length === 0){
      $('noResults').style.display = 'block';
    }
    
    render(players);
  }catch(e){ 
    $('loadingSpinner').style.display = 'none';
    alert('Failed to load players: '+e.message); 
  }
}

function render(players){
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  players.forEach((p,i)=>{
    const tr = document.createElement('tr');
    const rank = i + 1;
    tr.innerHTML = `
      <td>${rank}</td>
      <td><strong>${escapeHtml(p.name)}</strong></td>
      <td>${escapeHtml(p.team||'—')}</td>
      <td>${escapeHtml(p.school||'—')}</td>
      <td>${escapeHtml(p.academy||'—')}</td>
      <td style="font-weight:600;color:#667eea">${p.stats?.goals||0}</td>
      <td style="color:#764ba2">${p.stats?.minutes||0}</td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){
  return String(s||'').replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

document.addEventListener('DOMContentLoaded', ()=>{
  $('applyBtn').addEventListener('click', loadTop);
  $('clearBtn').addEventListener('click', ()=>{ 
    $('filterSchool').value=''; 
    $('filterAcademy').value=''; 
    $('minGoals').value=''; 
    loadTop(); 
  });
  loadTop();
});

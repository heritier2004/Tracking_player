const API_TOP = '/api/players/top';
const $ = id => document.getElementById(id);

async function loadTop(){
  const school = (($('filterSchool').value||'').trim());
  const academy = (($('filterAcademy').value||'').trim());
  const min_goals = (($('minGoals').value||'').trim());
  const qs = new URLSearchParams();
  if(school) qs.set('school', school);
  if(academy) qs.set('academy', academy);
  if(min_goals) qs.set('min_goals', min_goals);
  qs.set('limit', '100');
  try{
    const res = await fetch(API_TOP + '?' + qs.toString(), {credentials:'include'});
    if(!res.ok) throw new Error(res.statusText);
    const players = await res.json();
    render(players);
  }catch(e){ alert('Failed to load players: '+e.message); }
}

function render(players){
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  players.forEach((p,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.team||'')}</td><td>${escapeHtml(p.school||'')}</td><td>${escapeHtml(p.academy||'')}</td><td>${p.stats?.goals||0}</td><td>${p.stats?.minutes||0}</td>`;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){return String(s||'').replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

document.addEventListener('DOMContentLoaded', ()=>{
  $('applyBtn').addEventListener('click', loadTop);
  $('clearBtn').addEventListener('click', ()=>{ $('filterSchool').value=''; $('filterAcademy').value=''; $('minGoals').value=''; loadTop(); });
  loadTop();
});

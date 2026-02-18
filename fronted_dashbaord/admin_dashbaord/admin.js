// Admin dashboard front-end logic extracted from ondex.html
// Update `API` endpoints to match your backend routes if necessary.
const API = {
  users: '/api/users',
  diagnostics: '/api/admin/diag',
  update: '/api/admin/update',
  backup: '/api/admin/backup',
  login: '/api/login',
  logout: '/api/logout',
  me: '/api/me'
};

const $ = id => document.getElementById(id);
const usersTableBody = document.querySelector('#usersTable tbody');
const logsEl = $('logs');

function log(msg){
  const now = new Date().toLocaleString();
  logsEl.textContent = `[${now}] ${msg}\n` + logsEl.textContent;
}

async function fetchUsers(){
  try{
    const res = await fetch(API.users, {credentials:'include'});
    if(!res.ok) throw new Error(res.statusText);
    const users = await res.json();
    renderUsers(users);
    log('Loaded users');
  }catch(e){
    log('Error loading users: '+e.message);
  }
}

function renderUsers(users){
  usersTableBody.innerHTML = '';
  (users||[]).forEach(u=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(u.name||'—')}</td><td>${escapeHtml(u.email||'—')}</td><td>${escapeHtml(u.role||'—')}</td><td><div class="actions"><button class="btn small" data-id="${u.id}" onclick="editUser(this)">Edit</button> <button class="btn small" data-id="${u.id}" onclick="setPassword(this)">Set password</button> <button class="btn danger small" data-id="${u.id}" onclick="removeUser(this)">Remove</button></div></td>`;
    usersTableBody.appendChild(tr);
  });
}

function escapeHtml(str){return String(str).replace(/[&<>\\\"]/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"})[s]);}

async function addUser(){
  const name = $('newUserName').value.trim();
  const email = $('newUserEmail').value.trim();
  const password = $('newUserPassword') ? $('newUserPassword').value : '';
  const role = $('newUserRole').value;
  if(!name || !email){ alert('Name and email required'); return; }
  try{
    const body = {name,email,role};
    if(password) body.password = password;
    const res = await fetch(API.users, {method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!res.ok) throw new Error(res.statusText);
    const created = await res.json();
    log('Added user: '+created.email);
    fetchUsers();
    $('newUserName').value='';$('newUserEmail').value='';
    if($('newUserPassword')) $('newUserPassword').value='';
  }catch(e){ log('Add user failed: '+e.message); }
}

async function removeUser(button){
  const id = button.getAttribute('data-id');
  if(!confirm('Remove user?')) return;
  try{
    const res = await fetch(API.users+'/'+encodeURIComponent(id), {method:'DELETE',credentials:'include'});
    if(!res.ok) throw new Error(res.statusText);
    log('Removed user '+id);
    fetchUsers();
  }catch(e){ log('Remove failed: '+e.message); }
}

window.editUser = function(btn){
  const id = btn.getAttribute('data-id');
  const name = prompt('New name');
  const role = prompt('New role (admin/manager/viewer)');
  if(name==null) return;
  fetch(API.users+'/'+encodeURIComponent(id),{method:'PUT',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,role})})
    .then(r=>{ if(!r.ok) throw new Error(r.statusText); return r.json(); })
    .then(()=>{ log('Updated user '+id); fetchUsers(); })
    .catch(e=>log('Update failed: '+e.message));
}

window.setPassword = function(btn){
  const id = btn.getAttribute('data-id');
  const pwd = prompt('Enter new password for user');
  if(pwd==null) return;
  fetch(API.users+'/'+encodeURIComponent(id)+'/password',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pwd})})
    .then(r=>{ if(!r.ok) throw new Error(r.statusText); return r.json(); })
    .then(()=>{ log('Password set for '+id); })
    .catch(e=>log('Set password failed: '+e.message));
}

async function runDiagnostics(){
  log('Running diagnostics...');
  try{
    const res = await fetch(API.diagnostics, {credentials:'include'});
    const text = await res.text();
    log('Diagnostics result:\n'+text);
  }catch(e){ log('Diagnostics failed: '+e.message); }
}

async function checkUpdate(){
  log('Checking for updates...');
  try{
    const res = await fetch(API.update, {method:'POST',credentials:'include'});
    const json = await res.json();
    log('Update check: '+JSON.stringify(json));
  }catch(e){ log('Update failed: '+e.message); }
}

async function createBackup(){
  log('Creating backup...');
  try{
    const res = await fetch(API.backup, {method:'POST',credentials:'include'});
    const json = await res.json();
    log('Backup: '+(json.message||'done'));
  }catch(e){ log('Backup failed: '+e.message); }
}

// Wire up buttons
async function checkAuth(){
  try{
    const res = await fetch(API.me, {credentials:'include'});
    if(!res.ok) throw new Error('auth check failed');
    const user = await res.json();
    if(user && user.email){
      hideLogin();
      fetchUsers();
    }else{
      showLogin();
    }
  }catch(e){
    showLogin();
  }
}

async function login(){
  const email = $('loginEmail').value.trim();
  const password = $('loginPassword').value;
  if(!email || !password){ alert('Email and password required'); return; }
  try{
    const res = await fetch(API.login, {method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    if(!res.ok) throw new Error('invalid credentials');
    await res.json();
    hideLogin();
    await fetchUsers();
    log('Signed in');
  }catch(e){ alert('Login failed: '+e.message); }
}

async function logout(){
  try{
    await fetch(API.logout, {method:'POST',credentials:'include'});
  }catch(e){}
  showLogin();
}

function showLogin(){
  const overlay = $('loginOverlay');
  if(overlay) overlay.style.display = 'flex';
}
function hideLogin(){
  const overlay = $('loginOverlay');
  if(overlay) overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded',()=>{
  $('addUserBtn').addEventListener('click',addUser);
  $('refreshBtn').addEventListener('click',fetchUsers);
  $('debugBtn').addEventListener('click',runDiagnostics);
  $('updateBtn').addEventListener('click',checkUpdate);
  $('backupBtn').addEventListener('click',createBackup);
  $('logoutBtn').addEventListener('click',logout);
  $('loginBtn').addEventListener('click',login);
  checkAuth();
});

from flask import Blueprint, jsonify, request, current_app, send_file, session
import os, json, uuid, shutil, datetime, sys
from functools import wraps

bp = Blueprint('admin_api', __name__)

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data_store')
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
BACKUP_DIR = os.path.join(DATA_DIR, 'backups')

def ensure_dirs():
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(BACKUP_DIR, exist_ok=True)

def load_users():
    ensure_dirs()
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
        return []
    with open(USERS_FILE, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_users(users):
    ensure_dirs()
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2)

def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = session.get('user')
        if not user or user.get('role') != 'admin':
            return jsonify({'error': 'unauthorized'}), 401
        return f(*args, **kwargs)
    return wrapper

@bp.route('/api/users', methods=['GET'])
@admin_required
def get_users():
    users = load_users()
    return jsonify(users)

@bp.route('/api/users', methods=['POST'])
@admin_required
def create_user():
    data = request.get_json() or {}
    users = load_users()
    new_user = {
        'id': str(uuid.uuid4()),
        'name': data.get('name'),
        'email': data.get('email'),
        'role': data.get('role', 'viewer'),
        'created_at': datetime.datetime.utcnow().isoformat()+'Z'
    }
    users.append(new_user)
    save_users(users)
    return jsonify(new_user), 201

@bp.route('/api/users/<user_id>', methods=['PUT'])
@admin_required
def update_user(user_id):
    data = request.get_json() or {}
    users = load_users()
    for u in users:
        if u.get('id') == user_id:
            u['name'] = data.get('name', u.get('name'))
            u['role'] = data.get('role', u.get('role'))
            save_users(users)
            return jsonify(u)
    return jsonify({'error':'not found'}), 404

@bp.route('/api/users/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    users = load_users()
    new = [u for u in users if u.get('id') != user_id]
    if len(new) == len(users):
        return jsonify({'error':'not found'}), 404
    save_users(new)
    return jsonify({'ok':True})

@bp.route('/api/admin/diag', methods=['GET'])
@admin_required
def diag():
    info = {
        'platform': sys.platform,
        'python': sys.version,
        'cwd': os.getcwd(),
        'time': datetime.datetime.utcnow().isoformat()+'Z'
    }
    return jsonify(info)

@bp.route('/api/admin/update', methods=['POST'])
@admin_required
def update():
    # For safety we do not run arbitrary git pull here; simulate update check
    result = {'update': 'no updates available', 'checked_at': datetime.datetime.utcnow().isoformat()+'Z'}
    return jsonify(result)

@bp.route('/api/admin/backup', methods=['POST'])
@admin_required
def backup():
    ensure_dirs()
    timestamp = datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S')
    archive_name = f'backup_{timestamp}.zip'
    archive_path = os.path.join(BACKUP_DIR, archive_name)
    # create a zip of the data_store directory
    base = os.path.join(os.path.dirname(__file__), '..')
    data_src = os.path.join(base, 'data_store')
    shutil.make_archive(archive_path.replace('.zip',''), 'zip', data_src)
    return jsonify({'message':'backup created','file':os.path.relpath(archive_path)})

@bp.route('/api/admin/backups', methods=['GET'])
@admin_required
def list_backups():
    ensure_dirs()
    files = sorted(os.listdir(BACKUP_DIR), reverse=True)
    return jsonify(files)

@bp.route('/api/admin/backups/<name>', methods=['GET'])
@admin_required
def download_backup(name):
    ensure_dirs()
    path = os.path.join(BACKUP_DIR, name)
    if not os.path.exists(path):
        return jsonify({'error':'not found'}), 404
    return send_file(path, as_attachment=True)

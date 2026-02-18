from flask import Blueprint, request, session, jsonify
import os
from backed_server.api.admin import load_users
from werkzeug.security import check_password_hash

bp = Blueprint('auth_api', __name__)

# Fallback admin credential (only used if no user matches). Set via env for initial login.
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')

@bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error':'email and password required'}), 400

    users = load_users()
    # find user by email
    user = None
    for u in users:
        if u.get('email') == email:
            user = u
            break

    # If found and has password_hash, verify it
    if user and 'password_hash' in user:
        if check_password_hash(user['password_hash'], password):
            session.clear()
            session['user'] = {'id': user.get('id'), 'email': user.get('email'), 'role': user.get('role', 'viewer')}
            return jsonify({'ok': True, 'role': session['user']['role']})
        return jsonify({'error':'invalid credentials'}), 401

    # fallback: if env admin credentials set, allow login
    if ADMIN_EMAIL and ADMIN_PASSWORD and email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
        session.clear()
        session['user'] = {'email': email, 'role': 'admin'}
        return jsonify({'ok': True, 'role':'admin'})

    return jsonify({'error':'invalid credentials'}), 401


@bp.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'ok': True})


@bp.route('/api/me', methods=['GET'])
def me():
    user = session.get('user')
    if not user:
        return jsonify({'error': 'not authenticated'}), 401
    return jsonify({
        'email': user.get('email'),
        'id': user.get('id'),
        'role': user.get('role', 'viewer')
    }), 200

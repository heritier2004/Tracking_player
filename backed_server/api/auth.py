from flask import Blueprint, request, session, jsonify
import os

bp = Blueprint('auth_api', __name__)

# For simplicity this login checks against environment variables.
# Set ADMIN_EMAIL and ADMIN_PASSWORD in env for production. Defaults provided for development.
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'inshutiangeheritier@gmail.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'adminpass')

@bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error':'email and password required'}), 400
    # simple check
    if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
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
        return jsonify({'user': None}), 200
    return jsonify({'user': user}), 200

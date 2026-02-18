from flask import Blueprint, jsonify, request, session
import os, json
from functools import wraps

bp = Blueprint('players_api', __name__)

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data_store')
PLAYERS_FILE = os.path.join(DATA_DIR, 'players.json')

def ensure_dirs():
    os.makedirs(DATA_DIR, exist_ok=True)

def load_players():
    ensure_dirs()
    if not os.path.exists(PLAYERS_FILE):
        with open(PLAYERS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
        return []
    with open(PLAYERS_FILE, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_players(players):
    ensure_dirs()
    with open(PLAYERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(players, f, indent=2)

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get('user'):
            return jsonify({'error':'unauthorized'}), 401
        return f(*args, **kwargs)
    return wrapper

def role_allowed(roles):
    def deco(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            user = session.get('user') or {}
            if user.get('role') not in roles:
                return jsonify({'error':'forbidden'}), 403
            return f(*args, **kwargs)
        return wrapper
    return deco


@bp.route('/api/players', methods=['GET'])
@login_required
@role_allowed(['admin','manager','ferwafa'])
def list_players():
    """List all players. Ferwafa can see full stats."""
    players = load_players()
    # optional filters
    school = request.args.get('school')
    academy = request.args.get('academy')
    if school:
        players = [p for p in players if p.get('school') == school]
    if academy:
        players = [p for p in players if p.get('academy') == academy]
    return jsonify(players)


@bp.route('/api/players/<player_id>', methods=['GET'])
@login_required
@role_allowed(['admin','manager','ferwafa'])
def get_player(player_id):
    players = load_players()
    for p in players:
        if p.get('id') == player_id:
            return jsonify(p)
    return jsonify({'error':'not found'}), 404


@bp.route('/api/players/top', methods=['GET'])
@login_required
@role_allowed(['admin','manager','ferwafa'])
def top_players():
    """Return top players by goals, supports filters: school, academy, min_goals, limit"""
    players = load_players()
    school = request.args.get('school')
    academy = request.args.get('academy')
    try:
        min_goals = int(request.args.get('min_goals') or 0)
    except ValueError:
        min_goals = 0
    try:
        limit = int(request.args.get('limit') or 20)
    except ValueError:
        limit = 20

    if school:
        players = [p for p in players if p.get('school') == school]
    if academy:
        players = [p for p in players if p.get('academy') == academy]

    players = [p for p in players if (p.get('stats',{}).get('goals',0) >= min_goals)]
    players.sort(key=lambda p: p.get('stats',{}).get('goals',0), reverse=True)
    return jsonify(players[:limit])

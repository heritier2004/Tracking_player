from flask import Blueprint, request, jsonify, session
import json
import os

bp = Blueprint('academy_api', __name__)

DATA_DIR = 'backed_server/data_store'

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except:
        return []

def save_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

# Check admin/academy role
def require_academy_role(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = session.get('user')
        if not user or user.get('role') not in ['admin', 'manager']:
            return jsonify({'error': 'unauthorized'}), 403
        return f(*args, **kwargs)
    return decorated_function

# PLAYERS
@bp.route('/api/academy/players', methods=['GET'])
def get_players():
    players = load_json('academy_players.json')
    return jsonify(players), 200

@bp.route('/api/academy/players', methods=['POST'])
@require_academy_role
def create_player():
    data = request.get_json() or {}
    players = load_json('academy_players.json')
    
    player = {
        'id': str(len(players) + 1),
        'name': data.get('name'),
        'position': data.get('position'),
        'age': data.get('age'),
        'grade': data.get('grade'),
        'height': data.get('height'),
        'weight': data.get('weight'),
        'joined': data.get('joined')
    }
    
    players.append(player)
    save_json('academy_players.json', players)
    return jsonify(player), 201

# COACHES
@bp.route('/api/academy/coaches', methods=['GET'])
def get_coaches():
    coaches = load_json('academy_coaches.json')
    return jsonify(coaches), 200

@bp.route('/api/academy/coaches', methods=['POST'])
@require_academy_role
def create_coach():
    data = request.get_json() or {}
    coaches = load_json('academy_coaches.json')
    
    coach = {
        'id': str(len(coaches) + 1),
        'name': data.get('name'),
        'role': data.get('role'),
        'specialization': data.get('specialization'),
        'experience': data.get('experience'),
        'contact': data.get('contact')
    }
    
    coaches.append(coach)
    save_json('academy_coaches.json', coaches)
    return jsonify(coach), 201

# TOURNAMENTS
@bp.route('/api/academy/tournaments', methods=['GET'])
def get_tournaments():
    tournaments = load_json('academy_tournaments.json')
    return jsonify(tournaments), 200

@bp.route('/api/academy/tournaments', methods=['POST'])
@require_academy_role
def create_tournament():
    data = request.get_json() or {}
    tournaments = load_json('academy_tournaments.json')
    
    tournament = {
        'id': str(len(tournaments) + 1),
        'name': data.get('name'),
        'date': data.get('date'),
        'location': data.get('location'),
        'status': data.get('status', 'upcoming'),
        'matches': data.get('matches', 0)
    }
    
    tournaments.append(tournament)
    save_json('academy_tournaments.json', tournaments)
    return jsonify(tournament), 201

from flask import Blueprint, request, jsonify, session
import json
import os

bp = Blueprint('club_api', __name__)

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

# Check admin/manager role
def require_club_role(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = session.get('user')
        if not user or user.get('role') not in ['admin', 'manager']:
            return jsonify({'error': 'unauthorized'}), 403
        return f(*args, **kwargs)
    return decorated_function

# TEAMS
@bp.route('/api/club/teams', methods=['GET'])
def get_teams():
    teams = load_json('club_teams.json')
    return jsonify(teams), 200

@bp.route('/api/club/teams', methods=['POST'])
@require_club_role
def create_team():
    data = request.get_json() or {}
    teams = load_json('club_teams.json')
    
    team = {
        'id': str(len(teams) + 1),
        'name': data.get('name'),
        'category': data.get('category'),
        'coach': data.get('coach'),
        'playerCount': data.get('playerCount', 0),
        'founded': data.get('founded')
    }
    
    teams.append(team)
    save_json('club_teams.json', teams)
    return jsonify(team), 201

# ROSTER
@bp.route('/api/club/roster', methods=['GET'])
def get_roster():
    roster = load_json('club_roster.json')
    return jsonify(roster), 200

@bp.route('/api/club/roster', methods=['POST'])
@require_club_role
def create_roster_player():
    data = request.get_json() or {}
    roster = load_json('club_roster.json')
    
    player = {
        'id': str(len(roster) + 1),
        'name': data.get('name'),
        'position': data.get('position'),
        'number': data.get('number'),
        'age': data.get('age'),
        'status': data.get('status', 'active'),
        'joined': data.get('joined')
    }
    
    roster.append(player)
    save_json('club_roster.json', roster)
    return jsonify(player), 201

# MATCHES
@bp.route('/api/club/matches', methods=['GET'])
def get_matches():
    matches = load_json('club_matches.json')
    return jsonify(matches), 200

@bp.route('/api/club/matches', methods=['POST'])
@require_club_role
def create_match():
    data = request.get_json() or {}
    matches = load_json('club_matches.json')
    
    match = {
        'id': str(len(matches) + 1),
        'date': data.get('date'),
        'homeTeam': data.get('homeTeam'),
        'awayTeam': data.get('awayTeam'),
        'venue': data.get('venue'),
        'result': data.get('result'),
        'status': data.get('status', 'scheduled')
    }
    
    matches.append(match)
    save_json('club_matches.json', matches)
    return jsonify(match), 201

# STAFF
@bp.route('/api/club/staff', methods=['GET'])
def get_staff():
    staff = load_json('club_staff.json')
    return jsonify(staff), 200

@bp.route('/api/club/staff', methods=['POST'])
@require_club_role
def create_staff():
    data = request.get_json() or {}
    staff = load_json('club_staff.json')
    
    member = {
        'id': str(len(staff) + 1),
        'name': data.get('name'),
        'position': data.get('position'),
        'department': data.get('department'),
        'contact': data.get('contact'),
        'since': data.get('since')
    }
    
    staff.append(member)
    save_json('club_staff.json', staff)
    return jsonify(member), 201

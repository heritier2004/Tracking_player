from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__, static_folder=None)
# session secret
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-change-me')
CORS(app, supports_credentials=True)

# register API blueprints
from backed_server.api.admin import bp as admin_bp
from backed_server.api.auth import bp as auth_bp
app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)

@app.route('/')
def index():
    return 'Tracking Player backend running.'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

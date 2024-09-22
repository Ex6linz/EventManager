from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import os


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/event_manager_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'supersecretkey'

    
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'

    # Ustawienie JWT token location na headers
    app.config['JWT_TOKEN_LOCATION'] = ['headers']  
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False  
    app.config['JWT_COOKIE_SECURE'] = False  

    jwt = JWTManager(app)

    
    db.init_app(app)
    migrate.init_app(app, db)

    
    from .routes import main_bp
    app.register_blueprint(main_bp)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from .routes.events import events_bp
    app.register_blueprint(events_bp)

    from .routes.organizations import organizations_bp
    app.register_blueprint(organizations_bp)

    return app

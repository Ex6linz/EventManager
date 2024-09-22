from flask import Blueprint, request, jsonify
from app import db
from app.models.event import Event
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

from app.models.membership import Membership

events_bp = Blueprint('events', __name__)


@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user = get_jwt_identity()  # Pobieranie tożsamości użytkownika z tokenu JWT
    data = request.get_json()
    new_event = Event(
        title=data['title'],
        date=data['date'],
        description=data['description'],
        user_id=current_user  # Przypisanie wydarzenia do zalogowanego użytkownika
    )
    db.session.add(new_event)
    db.session.commit()

    return jsonify(new_event.to_dict()), 201

@events_bp.route('/events', methods=['GET'])
@jwt_required()
def get_events():
    # Pobieramy id zalogowanego użytkownika
    user_id = get_jwt_identity()

    # Pobieranie wydarzeń powiązanych z użytkownikiem
    events = Event.query.filter_by(user_id=user_id).all()

    events_list = []
    for event in events:
        events_list.append({
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify(events_list), 200

@events_bp.route('/organizations/<int:org_id>/events', methods=['GET'])
@jwt_required()
def get_organization_events(org_id):
    user_id = get_jwt_identity()

    # Sprawdzamy, czy użytkownik jest członkiem tej organizacji
    membership = Membership.query.filter_by(user_id=user_id, organization_id=org_id).first()
    if not membership:
        return jsonify({'message': 'You are not a member of this organization'}), 403

    # Sprawdzamy rolę użytkownika
    if membership.role == 'admin':
        # Admin widzi wszystkie wydarzenia
        events = Event.query.filter_by(organization_id=org_id).all()
    elif membership.role == 'coordinator':
        # Koordynator widzi tylko wybrane wydarzenia (np. te, do których ma dostęp)
        events = Event.query.filter(Event.organization_id == org_id, Event.coordinator_id == user_id).all()
    else:
        # Inne role mają ograniczony dostęp
        return jsonify({'message': 'You do not have permission to view these events'}), 403

    events_list = []
    for event in events:
        events_list.append({
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify(events_list), 200
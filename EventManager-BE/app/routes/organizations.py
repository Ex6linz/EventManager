from flask import Blueprint, request, jsonify
from app import db
from app.models.organization import Organization
from app.models.membership import Membership
from flask_jwt_extended import jwt_required, get_jwt_identity

organizations_bp = Blueprint('organizations', __name__)

@organizations_bp.route('/organizations', methods=['POST'])
@jwt_required()
def create_organization():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')

    # Pobieramy id zalogowanego użytkownika
    user_id = get_jwt_identity()

    # Tworzymy nową organizację
    new_org = Organization(name=name, description=description)
    db.session.add(new_org)
    db.session.commit()

    # Dodajemy użytkownika jako administratora tej organizacji
    membership = Membership(user_id=user_id, organization_id=new_org.id, role='admin')
    db.session.add(membership)
    db.session.commit()

    return jsonify({'message': 'Organization created successfully'}), 201


@organizations_bp.route('/organizations/<int:org_id>/add_member', methods=['POST'])
@jwt_required()
def add_member(org_id):
    data = request.get_json()
    user_id_to_add = data.get('user_id')
    role = data.get('role')

    # Pobieramy id zalogowanego użytkownika
    user_id = get_jwt_identity()

    # Sprawdzamy, czy zalogowany użytkownik jest adminem tej organizacji
    membership = Membership.query.filter_by(user_id=user_id, organization_id=org_id, role='admin').first()
    if not membership:
        return jsonify({'message': 'Only admins can add members to this organization'}), 403

    # Dodajemy nowego członka do organizacji
    new_membership = Membership(user_id=user_id_to_add, organization_id=org_id, role=role)
    db.session.add(new_membership)
    db.session.commit()

    return jsonify({'message': 'Member added successfully'}), 201
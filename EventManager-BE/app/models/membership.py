from app import db

class Membership(db.Model):
    __tablename__ = 'membership'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'))
    role = db.Column(db.String(64), nullable=False)  # np. 'admin', 'coordinator', 'member'

    # Powiązanie do użytkownika
    user = db.relationship('User', back_populates='memberships')
    # Powiązanie do organizacji
    organization = db.relationship('Organization', back_populates='members')

    def __repr__(self):
        return f'<Membership {self.user_id} in {self.organization_id} as {self.role}>'
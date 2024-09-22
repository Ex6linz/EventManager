from app import db

class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(256))

    # Relacja do użytkowników w organizacji (wiele-do-wielu)
    members = db.relationship('Membership', back_populates='organization')

    def __repr__(self):
        return f'<Organization {self.name}>'
from app import db


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(256))
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.isoformat(),  
            'description': self.description,
            'user_id': self.user_id
        }

    
    user = db.relationship('User', backref='events', lazy=True)

    def __repr__(self):
        return f'<Event {self.title} on {self.date}>'

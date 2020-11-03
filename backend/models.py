import os
import datetime
from flask_sqlalchemy import SQLAlchemy

DATABASE_URL = os.environ["DATABASE_URL"]
db = SQLAlchemy()


def setup_db(app, database_path=DATABASE_URL):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app=app)


def drop_and_create_all():
    db.drop_all()
    db.create_all()


class Paste(db.Model):
    key = db.Column(db.String(), primary_key=True)
    content = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expires_at = db.Column(db.DateTime, default=lambda: datetime.datetime.utcnow() +
                           datetime.timedelta(days=1))

    def __init__(self, key, content, expires_at=None):
        self.key = key
        self.content = content
        self.expires_at = expires_at

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            "key": self.key,
            "content": self.content,
            "expires_at": self.expires_at,
            "created_at": self.created_at
        }

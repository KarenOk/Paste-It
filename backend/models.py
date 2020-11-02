import os
from flask_sqlalchemy import SQLAlchemy

DATABASE_URL = os.environ["DATABASE_URL"]
db = SQLAlchemy()


def setup_db(app, database_path=DATABASE_URL):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # db.app = app
    db.init_app(app=app)


def drop_and_create_all():
    db.drop_all()
    db.create_all()

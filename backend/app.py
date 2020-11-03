import random
import string

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

from models import setup_db, db, Paste


def get_random_url_suffix(length):
    chars = string.ascii_lowercase
    suffix = ''.join(random.choice(chars) for i in range(length))
    return suffix


def create_app():
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    @app.route("/")
    def index():
        return "Welcome to PasteIt API. This service is up and running."

    @app.route("/pastes", methods=["POST"])
    def create_paste():
        """
            Create a paste and associate with a generated key
            that will be used to uniquely identify it.
        """

        try:
            data = request.get_json()
            content = data.get("content", None)
            if not content:
                raise Exception
        except Exception:
            abort(400)

        # check that key doesn't already exist in the db
        key = get_random_url_suffix(4)
        while True:
            if Paste.query.get(key):
                key = get_random_url_suffix(4)
                continue
            else:
                break

        try:
            paste = Paste(key=key, content=content)
            paste.insert()
        except Exception:
            db.session.rollback()
            abort(500)

        return jsonify({
            "success": True,
            "key": key,
            "content": content
        })

    return app


app = create_app()

if __name__ == "__main__":
    app.run()

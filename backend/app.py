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
            "data": paste.format()
        })

    @app.route("/pastes/<key>")
    def get_paste(key):
        """
            Get paste using its unique key
        """

        paste = Paste.query.get(key)
        # TODO: delete paste if expired
        if paste:
            return jsonify({
                "success": True,
                "data": paste.format()
            })
        else:
            abort(404)

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False,
            "message": "An error occurred on our end.",
            "error": 500
        }), 500

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "message": "The requested resource was not found.",
            "error": 404
        }), 404

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "message": "Your request was not formatted properly.",
            "error": 400
        }), 400

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "success": False,
            "message": "Method not allowed.",
            "error": 405
        }), 405

    return app


app = create_app()

if __name__ == "__main__":
    app.run()

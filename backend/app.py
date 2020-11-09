import random
import string
import datetime

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

    @app.after_request
    def after_request(response):
        """ 
            Set access control headers
        """
        response.headers.add("Access-Control-Allow-Headers",
                             "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods",
                             "GET, POST, PATCH, DELETE, OPTIONS")
        return response

    @app.route("/")
    def index():
        """ 
            Health Check 
        """
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
        if paste:
            if datetime.datetime.now() >= paste.expires_at:
                delete_paste(key)
                abort(404)
            return jsonify({
                "success": True,
                "data": paste.format()
            })
        else:
            abort(404)

    @app.route("/pastes/<key>", methods=["DELETE"])
    def delete_paste(key):
        """
            Delete paste using its unique key
        """
        paste = Paste.query.get(key)
        if paste:
            paste.delete()
            return jsonify({
                "success": True,
                "deleted": key
            })
        else:
            abort(404)

    @app.route("/pastes/expired", methods=["DELETE"])
    def delete_expired_pastes():
        """
            Delete all expired pastes
        """

        try:
            pastes = Paste.query.filter(
                Paste.expires_at <= datetime.datetime.now()).delete(synchronize_session=False)
            db.session.commit()

            return jsonify({
                "success": True,
                "no_of_records": pastes
            })

        except Exception:
            abort(500)

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

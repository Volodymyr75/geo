from flask import jsonify
from flask_restful import Resource

class SmokeTestResource(Resource):
    def get(self):
        return jsonify({'message': 'ok'})
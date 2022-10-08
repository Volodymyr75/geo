from flask import jsonify, request
from flask_restful import Resource

class DistancesResource(Resource):
    def get(self):
        return jsonify({'message': 'get ok'})

    def post(self):
        distance = request.get_json()
        id = distance.get("id")
        return jsonify({'message': id})

    def delete(self):
        distance = request.get_json()
        id = distance.get("id")
        return jsonify({'delete': id})
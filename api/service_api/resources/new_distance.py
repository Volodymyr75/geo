import uuid
from flask import jsonify, request
from flask_restful import Resource
from geopy import distance



class NewDistanceResource(Resource):
    def post(self):
        r = request.get_json()
        start = (r.get('fromLat'), r.get('fromLong'))
        finish = (r.get('toLat'), r.get('toLong'))
        answer = distance.distance(start, finish).miles
        return jsonify({'distance': answer, 'id': uuid.uuid4()})

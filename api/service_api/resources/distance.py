import uuid
from flask import jsonify, request
from flask_restful import Resource
from geopy import distance



class DistanceResource(Resource):
    def post(self):
        r = request.get_json()
        start = (r.get('fromAlt'), r.get('fromLong'))
        finish = (r.get('toAlt'), r.get('toLong'))
        answer = distance.distance(start, finish).miles
        return jsonify({'distance': answer, 'id': uuid.uuid4()})

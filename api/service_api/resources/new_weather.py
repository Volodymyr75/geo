import uuid
import requests
from flask import jsonify, request
from flask_restful import Resource

API_KEY = 'e83c91e26c6d44afe21e3a873ca094b9'
UNITS = 'metric'


class NewWeatherResource(Resource):
    def post(self):
        r = request.get_json()
        lat = r.get('Latitude')
        lon = r.get('Longitude')
        result = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={UNITS}')
        return result.json()
        # return jsonify({'lat': lat, 'long': lon, 'id': uuid.uuid4()})

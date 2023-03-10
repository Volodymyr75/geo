import uuid
import os
from dotenv import load_dotenv
import requests
from flask import jsonify, request
from flask_restful import Resource

load_dotenv()

API_KEY = os.getenv('API_KEY')
UNITS = os.environ.get('UNITS')


class NewWeatherResource(Resource):
    def post(self):
        r = request.get_json()
        lat = r.get('Latitude')
        lon = r.get('Longitude')
        result = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={UNITS}')
        return result.json()
        # return jsonify({'lat': lat, 'long': lon, 'id': uuid.uuid4()})

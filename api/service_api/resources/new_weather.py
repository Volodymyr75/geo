import uuid
import requests
from flask import jsonify, request
from flask_restful import Resource

API_KEY = '65cf4942cf8af9f9f52260b9f336c858'
LANG = 'ua'
UNITS = 'metric'


class NewWeatherResource(Resource):
    def post(self):
        r = request.get_json()
        print(r)
        lat = r.get('Latitude')
        lon = r.get('Longitude')
        result = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&lang={LANG}&units={UNITS}')
        return result.json()
        # return jsonify({'lat': lat, 'long': lon, 'id': uuid.uuid4()})

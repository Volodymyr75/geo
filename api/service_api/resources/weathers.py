from flask import jsonify, request
from flask_restful import Resource
from service_api.utils.db_connect import mongo_client


db_forecast = mongo_client.forecast
forecast_collection = db_forecast.weathers

#     test_collection = db.test_collection
#     res = test_collection.insert_one({'name': 'Volodymyr'})

class WeathersResource(Resource):
    def get(self):
        weathers = forecast_collection.find({})
        print(weathers)
        return jsonify([weather for weather in weathers])

    def post(self):
        weather = request.get_json()
        weather['_id'] = weather.get('id')
        result = forecast_collection.insert_one(weather)
        inserted_id = result.inserted_id
        return {'inserted_id': inserted_id}, 200

    def delete(self):
        weather = request.get_json()
        id = weather.get("id")
        result = forecast_collection.delete_one({'_id': id})
        if not result:
            return {'error': 'Weather wasn"t deleted. Please try again'}, 500
        if result and not result.deleted_count:
            return {'error': 'Weather not found'}, 404

        return {'deleted_id': id}
from flask import jsonify, request
from flask_restful import Resource
from service_api.utils.db_connect import mongo_client


db_measuring = mongo_client.measuring
measuring_collection = db_measuring.distances

#     test_collection = db.test_collection
#     res = test_collection.insert_one({'name': 'Volodymyr'})

class DistancesResource(Resource):
    def get(self):
        distances = measuring_collection.find({})
        print(distances)
        return jsonify([distance for distance in distances])

    def post(self):
        distance = request.get_json()
        distance['_id'] = distance.get('id')
        result = measuring_collection.insert_one(distance)
        inserted_id = result.inserted_id
        return {'inserted_id': inserted_id}, 200

    def delete(self):
        distance = request.get_json()
        id = distance.get("id")
        result = measuring_collection.delete_one({'_id': id})
        if not result:
            return {'error': 'Distance wasn"t deleted. Please try again'}, 500
        if result and not result.deleted_count:
            return {'error': 'Distance not found'}, 404

        return {'deleted_id': id}
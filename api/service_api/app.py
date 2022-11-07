from flask import Flask
from flask_restful import Api
from flask_cors import CORS


from service_api.resources.smoke import SmokeTestResource
from service_api.resources.new_distance import NewDistanceResource
from service_api.resources.distances import DistancesResource
from service_api.resources.new_weather import NewWeatherResource

app = Flask(__name__)
CORS(app)
api = Api(app, prefix='/travels/v1')


# smoke
api.add_resource(SmokeTestResource, '/smoke', strict_slashes=False)

# distance
api.add_resource(NewDistanceResource, '/new-distance', strict_slashes=False)

# distances
api.add_resource(DistancesResource, '/distances', strict_slashes=False)

# new weather
api.add_resource(NewWeatherResource, '/new-weather', strict_slashes=False)

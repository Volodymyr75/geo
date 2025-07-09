import os
from dotenv import load_dotenv

import certifi
from pymongo import MongoClient

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL', 'localhost')
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', 'root')
MONGO_PASSWORD = os.getenv('MONGO_PASSWORD', 'very-strong-password')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)



mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT
)
# mongo_client = MongoClient(f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@cluster0.zbruc36.mongodb.net/?retryWrites=true&w=majority",
#                            tlsCAFile=certifi.where())

# print(mongo_client)

# def insert_test_document():
#     db = mongo_client.test
#     test_collection = db.test_collection
#     res = test_collection.insert_one({'name': 'Volodymyr'})
#     print(res)
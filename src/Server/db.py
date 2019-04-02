import pymongo
import dns, json
from constants import *
from pprint import pprint

client = pymongo.MongoClient("mongodb+srv://vote_admin:"+ DB_PASS +"@cluster1-qyqez.mongodb.net/test?retryWrites=true")
db = client['blockchain_voting'] # Database Name
students = db['students'] # Collection name
#voter = vote_collection.find_one({"voter_id": "T554859-062"})

students.remove({})
with open('votedb.json') as f:
    file_data = json.load(f)

students.insert_many(file_data)
client.close()

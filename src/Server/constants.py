###########################
#      constants.py       #
###########################
DB_PASS = "p90SrVsQaD8pJg5s"
MONGO_URL = "mongodb+srv://vote_admin:"+ DB_PASS +"@cluster1-qyqez.mongodb.net/test?retryWrites=true"
DATA_KEYS = ['first_name', 'last_name', 'DOB', 'ID', 'vote_data']
USER_KEYS = ['first_name', 'last_name', 'DOB', 'ID']

VOTE_TEMPLATE = """
  {
    "first_name": "",
    "last_name": "",
    "DOB": "",
    "ID": "",
    "vote_data": {
      "date": "",
      "vote_issue": "",
      "vote_cast": ""
    },
    "prev_hash": "",
    "curr_hash": ""
  }
 """

GENESIS = """
  {
    "first_name": "Genesis",
    "last_name": "Block",
    "DOB": "01/01/1900",
    "ID": "A0000-00000",
    "vote_data": {
      "date": "12/12/2019",
      "vote_issue": "ELECTION",
      "vote_cast": "Barack Obama"
    },
    "prev_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "curr_hash": ""
  }
  """

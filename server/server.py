from flask import Flask
import pyrebase
from flask_cors import CORS, cross_origin

# API key and other parameters from Firebase
config = {}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

app = Flask(__name__)

# @app.route('/api/data', methods=['POST'])
# @cross_origin(origin='*')
# def user():
#   return {
#     "name": "Test User"
#   }
  
if __name__ == "__main__":
  app.run(debug=True, port=8080)
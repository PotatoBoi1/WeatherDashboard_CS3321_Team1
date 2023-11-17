import json
from flask import Flask, render_template, request
import requests
from api.convert_coordinates import convert
from api.get_weather import get_weather
app = Flask(__name__)


@app.route('/')
def default():  # put application's code here
    result = "Search for a city to get information about the weather"
    return {"data": "good"}


@app.route('/weatherRequest', methods=['POST'])
def weather_request():
    data = request.get_json()
    
    coords = convert(data.get('city'), data.get('stateCode'))

    weather = get_weather(coords)

    #response = "Temperature: " + str(response['current']['temperature_2m']) + " Fahrenheit<br>Windspeed: " + str(response['current']['windspeed_10m']) + " mph"
    weather['city'] = data.get('city')
    weather['state'] = data.get('stateCode')
    return json.dumps(weather)

if __name__ == '__main__':
    app.run()
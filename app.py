import json
from flask import Flask, render_template, request
import requests
app = Flask(__name__)


@app.route('/')
def default():  # put application's code here
    result = "Search for a city to get information about the weather"
    return {"data": "good"}


@app.route('/weatherRequest', methods=['POST'])
def weather_request():
    try: 
        data = request.get_json()
        city = data.get('city')
        state = data.get('stateCode')
        result1 = requests.get("http://api.openweathermap.org/geo/1.0/direct?q="+str(city)+","+str(state)+",US&limit=1&appid=a6adcb99bcb581eeb9566f6ba6535f44")
        result1 = result1.json()
        latitude = result1[0]['lat']
        longitude = result1[0]['lon']
        result = requests.get("https://api.open-meteo.com/v1/forecast?latitude="+str(latitude)+"&longitude="+str(longitude)+"&current=temperature_2m,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch")
        response = result.json()
        returnDict = {'weatherCode': response['current']['weather_code'], 'city': result1[0]['name'], 'state': result1[0]['state'], 'currentTemp': response['current']['temperature_2m'], 'currentWind': response['current']['wind_speed_10m'], 'precipitation': response['current']['precipitation']}
        #response = "Temperature: " + str(response['current']['temperature_2m']) + " Fahrenheit<br>Windspeed: " + str(response['current']['windspeed_10m']) + " mph"
        return json.dumps(returnDict)
    except Exception:
        print("An Error Occurred.")
        return json.dumps({"Message": "An error occurred."})



if __name__ == '__main__':
    app.run()
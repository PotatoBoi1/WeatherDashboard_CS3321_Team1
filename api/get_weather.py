import requests

def get_weather(coords: dict) -> dict:
    result = requests.get("https://api.open-meteo.com/v1/forecast?latitude="+
            str(coords['latitude'])+"&longitude="+ str(coords['longitude'])+
            "&current=temperature_2m,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
            )
    response = result.json()
    return {'weatherCode': response['current']['weather_code'], 'currentTemp': response['current']['temperature_2m'], 'currentWind': response['current']['wind_speed_10m'], 'precipitation': response['current']['precipitation']}

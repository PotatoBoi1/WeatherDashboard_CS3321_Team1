import requests

def convert(city: str, state: str) -> dict:
    """

    """
    result = requests.get("http://api.openweathermap.org/geo/1.0/direct?q="+city+","+state+",US&limit=1&appid=a6adcb99bcb581eeb9566f6ba6535f44")
    return {"latitude": result.json()[0]['lat'], "longitude": result.json()[0]['lon']}
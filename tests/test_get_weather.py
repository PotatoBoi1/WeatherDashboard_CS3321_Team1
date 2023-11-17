import pytest
import mock
from api.get_weather import get_weather

def test_get_weather():
    latitude = 50
    longitude = 150
    data = {'latitude': 50, 'longitude': 120}

    result = get_weather(data)

    assert 'weatherCode' in result
    assert 'currentTemp' in result
    assert 'currentWind' in result
    assert 'precipitation' in result
    assert type(result['weatherCode']) == str
    assert type(result['currentTemp']) == float
    assert type(result['currentWind']) == float
    assert type(result['precipitation']) == float

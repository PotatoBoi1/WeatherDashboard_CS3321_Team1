import pytest
import mock
from api import convert_coordinates

def test_convert_to_coords():
    """Testing convert to coordinates"""
    city = "Pocatello"
    state = "Idaho"

    valid_long_bottom = -180
    valid_long_top = 180
    valid_lat_bottom = -90
    valid_lat_top = 90

    result = convert(city, state)
    assert 'latitude' in result
    assert 'longitude' in result
    assert type(result['latitude']) == float
    assert type(result['longitude']) == float
    assert valid_lat_bottom <= result['latitude'] <= valid_lat_top
    assert valid_long_bottom <= result['longitude'] <= valid_long_top
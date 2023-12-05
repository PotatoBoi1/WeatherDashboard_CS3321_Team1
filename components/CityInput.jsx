import Button from 'react-bootstrap/Button';
import React from "react";

const CityInput = (props) => {

    const handleCityChange = (event) => {
        props.setCity(event.target.value);
    }

    const handleKeyPress = (event) => {
        // only run if enter was pressed
        if (event.key === 'Enter') {
            props.handleWeatherButtonClick();
        }
    }

    return (
        <div className="main-city-input" style={mainStyles}>
            <div>
                <input 
                    style={{...inputStyles, textAlign: 'center'}}
                    id="city-input" 
                    placeholder="Enter City Here"
                    onChange={handleCityChange}
                    onKeyDown={handleKeyPress}
                    value={props.city}
                />
            </div>
            <div>
                <Button 
                    style={{width:'100%', marginTop: '3px'}} 
                    variant="primary"
                    onClick={props.handleWeatherButtonClick}
                >
                    Get Weather Report
                </Button>
            </div>
        </div>
    )
}

export default CityInput;

const mainStyles = {
    display: 'grid',
}

const inputStyles = {
    borderRadius: '5px',
    borderColor: '#0d6efd',
    height: '40px',
    width:'300px',
    backgroundColor: '#343434',
    color: 'white',
    paddingBottom: '5px',
}
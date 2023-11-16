import React, { useEffect, useState } from "react";
import CityInput from "@/components/CityInput";
import WeatherCard from "@/components/WeatherCard";
import { toast } from "react-hot-toast";
import axios from "axios";

const WeatherModal = () => {
    const [city, setCity] = useState('');
    const [weatherCards, setWeatherCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleWeatherButtonClick = async () => {
        if (city === '') {
          toast.error('Please enter a city.', {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"});
          return;
        };

        // split into city and state
        if (city.indexOf(',') === -1) {
          toast.error("Invalid Format. Please Enter 'City, State'", {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"})
          return;
        }
        const state = (city.split(',')[1]).trim();
        const parsedCity = (city.split(',')[0]).trim();

        const cityToPass = {
            city: parsedCity,
            stateCode: state
        };

        const response = await fetch("/api/weatherRequest", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cityToPass)
        })
        const data = await response.json()

        const card = {
            ...data,
        };

        // Spread in new weathercard to array
        setWeatherCards([...weatherCards, card])
        setCity("");
        setCurrentCardIndex(weatherCards.length);
    };


    const handleDelete = (index) => {
        // delete index from list
    }

    const handleCardChange = (direction) => {
        const tempIndex = currentCardIndex + direction;
        if (weatherCards[tempIndex]) {
            setCurrentCardIndex(tempIndex)
        } else {
            toast.error('No Cards that way', {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"});
        }
    };

    return (
        <div className="main-content">
          <div className="top-main-content">
            <CityInput
              city={city}
              setCity={setCity}
              handleWeatherButtonClick={handleWeatherButtonClick}
            />
          </div>
          <div className="bottom-main-content" style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
            {weatherCards.length > 0 && (
              <section style={{ display: 'inline-flex' }}>
                <div className="prev-arrow" style={{ display: 'flex', alignItems: 'center', paddingRight: '50px', fontSize: '40px' }}>
                  <div onClick={() => handleCardChange(-1)} style={{ color: '#bcb8b1', cursor: 'pointer' }}>
                    &lt;
                  </div>
                </div>
                {
                    weatherCards.map((indiv, index) => {
                    if (currentCardIndex === index) {
                        return (
                        <WeatherCard
                            key={index}
                            currentTemp={indiv.currentTemp}
                            city={indiv.city}
                            code={indiv.weatherCode}
                            deleteWeatherCard={() => handleDelete(index)}
                        />
                        );
                    }
                    return null; // Return null for other cards that should be hidden
                    })
                }
                <div className="next-arrow" style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px', fontSize: '40px' }}>
                  <div onClick={() => handleCardChange(1)} style={{ color: '#bcb8b1', cursor: 'pointer' }}>
                    &gt;
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      );
};

export default WeatherModal;
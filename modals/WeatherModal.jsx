import React, { useEffect, useState } from "react";
import CityInput from "@/components/CityInput";
import WeatherCard from "@/components/WeatherCard";
import { toast } from "react-hot-toast";
import axios from "axios";

const WeatherModal = () => {
    const [city, setCity] = useState('');
    const [weatherCards, setWeatherCards] = useState([]);

    const handleWeatherButtonClick = async () => {
        if (city === '') {
            toast.error('Please enter a city.', {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"});
            return;
        }

        const cityToPass = {
            city: city,
            stateCode: 'ID'
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
    };


    const handleDelete = (index) => {
        // delete index from list
    }

    return (
        <div className="main-content">
            <div className="top-main-content">
                <CityInput 
                    setCity={setCity}
                    handleWeatherButtonClick={handleWeatherButtonClick}
                />
            </div>
            <div className="bottom-main-content" 
                style={{display:'flex', justifyContent:'center', width:'auto'}} 
            >
                {weatherCards.length > 0 && /* Only show if weatherCards has content */
                    weatherCards.map((indiv, index) =>  /* Indiv is a object with weather data, index is an integer*/
                        (<WeatherCard 
                            key={index} // You should provide a unique key for each element
                            currentTemp={indiv.currentTemp}
                            city={indiv.city}
                            deleteWeatherCard={handleDelete(index)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default WeatherModal;
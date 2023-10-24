import React, { useEffect, useState } from "react";
import CityInput from "@/components/CityInput";
import WeatherCard from "@/components/WeatherCard";
import { toast } from "react-hot-toast";

const WeatherModal = () => {
    const [city, setCity] = useState('');
    const [weatherCards, setWeatherCards] = useState([]);

    // useEffect(() => {
    //     const card = {
    //         temp: 78,
    //         city: 'Pocatello'
    //     };
    //     weatherCards.push(card);
    // }, [])

    const handleWeatherButtonClick = () => {
        if (city === '') {
            toast.error('Please enter a city.', {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"});
            return;
        }
        const card = {
            temp: 78,
            city: city
        };

        // Spread in new weathercard to array
        setWeatherCards([...weatherCards, card])
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
            <div className="bottom-main-content" 
                style={{display:'flex', justifyContent:'center', width:'auto'}} 
            >
                {weatherCards.length > 0 && /* Only show if weatherCards has content */
                    weatherCards.map((indiv, index) => 
                        (<WeatherCard 
                            key={index} // You should provide a unique key for each element
                            temp={indiv.temp}
                            city={indiv.city}
                            deleteWeatherCard={() => console.log('deleted')}
                        />
                    ))}
            </div>
        </div>
    );
};

export default WeatherModal;
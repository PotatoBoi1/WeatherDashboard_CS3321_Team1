import React, { useState } from "react";

const WeatherCard = ({
    city,
    currentTemp,
    deleteWeatherCard
}) => {
    const [image, setImage] = useState('')

    React.useEffect(() => {
        // Get weather icon
        // TODO: add check for what image to use
        setImage('/animated/cloudy-day-1.svg');
    }, []);

    return (
        <div className="weather-card" 
            style={{display:'flex',border:'2px solid #bcb8b1', boxShadow: '10px 5px 10px #bcb8b1', borderRadius:'10px', 
                    width:'45vw', height:'450px', alignContent:'center', 
                    marginTop:'30px', flexDirection:'column'
                }}
        >
            <div className="image-holder"
                style={{display:'flex', justifyContent:'center', height:'60%'}}
            >
                <img src={image} />
            </div>
            <div className="temp" 
                style={{display:'flex', justifyContent:'center', fontSize:'30px'}}
            >
                <p>{currentTemp}°F</p>
            </div>
            <div className="city"
                style={{display:'flex', justifyContent:'center', fontSize:'30px'}}
            >
                <p>{city}</p>
            </div>
            <div className="deleteButton"
                style={{display:'flex', justifyContent:'center'}}
            >
                <button 
                    style={{border:'1px solid #db3069', borderRadius:'50%', 
                            background:'#db3069', color:'white', height:'28px', width:'25px',
                            marginTop:'5px'
                        }}
                    onClick={deleteWeatherCard}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default WeatherCard;

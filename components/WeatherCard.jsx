import React, { useState } from "react";

const WeatherCard = ({
    city,
    state,
    currentTemp,
    wind,
    precipitation,
    deleteWeatherCard,
    code
}) => {
    const [image, setImage] = useState('')

    React.useEffect(() => {
        if (code === 0) {
            // WMO code 0: Clear sky
            setImage("/animated/day.svg"); // Display image for clear day
        } else if (code === 1) {
            // WMO code 1: Partly cloudy
            setImage("/animated/cloudy-day-3.svg"); // Display image for partly cloudy day
        } else if (code === 2) {
            // WMO code 2: Cloudy
            setImage("/animated/cloudy.svg"); // Display image for cloudy day
        } else if (code === 3) {
            // WMO code 3: Overcast
            setImage("/animated/rainy-1.svg"); // Display image for overcast day
        } else if (code === 4) {
            // WMO code 4: Fog
            setImage("/path/to/fog-image.svg"); // Display image for foggy conditions
        } else if (code >= 5 && code <= 10) {
            // WMO codes 5-10: Various types of precipitation (rain, snow, drizzle, etc.)
            setImage("/animated/rainy-4.svg"); // Display image for overcast day
        } else if (code >= 11 && code <= 13) {
            // WMO codes 11-13: Thunderstorms
            setImage("/animated/thunder.svg"); // Display image for thunderstorms
        } else if (code === 14) {
            // WMO code 14: Hail
            setImage("/path/to/hail-image.svg"); // Display image for hail
        }
    }, [code]);
    

    return (
        <div className="weather-card" 
            style={{display:'flex',border:'2px solid #bcb8b1', boxShadow: '1px 1px 10px #bcb8b1', borderRadius:'15% 0px', 
                    width:'325px', height:'550px', alignContent:'center', 
                    marginTop:'30px', flexDirection:'column'
                }}
        >
            <div className="image-holder"
                style={{display:'flex', justifyContent:'center', height:'60%'}}
            >
                <img src={image} />
            </div>
            <div className="temp" 
                style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:'30px'}}
            >
                <p style={{ display: 'block' }}>{currentTemp}°F</p>
                <p style={{ display: 'block' }}>{wind} mph</p>
                <p style={{ display: 'block' }}>{precipitation} in</p>
            </div>
            <div className="city"
                style={{display:'flex', justifyContent:'center', fontSize:'30px'}}
            >
                <p>{city}, {state}</p>
            </div>
            <div className="deleteButton"
                style={{display:'flex', justifyContent:'center'}}
            >
                <button 
                    style={{border:'1px solid #db3069', borderRadius:'50%', 
                            background:'#db3069', color:'white', height:'28px', width:'25px',
                            marginTop:'5px', marginBottom:'20px'
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

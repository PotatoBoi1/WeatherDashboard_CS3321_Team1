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
		if (!data) {
			console.log('error');
		}
        const card = {
            ...data,
        };
		if (card.city) {
			// Spread in new weathercard to array
			setWeatherCards([...weatherCards, card])
			setCity("");
			setCurrentCardIndex(weatherCards.length);
		} else {
			toast.error("Please enter a valid city.", {style: {borderRadius: '10px', background:'#0b5ed7', color:'white'}, position: "bottom-center"})
		}

    };


    const handleDelete = (index) => {
      // Ensure index is within valid range
      if (index >= 0 && index < weatherCards.length) {
          const deletedCity = weatherCards[index].city;
          toast.success(`Deleted ${deletedCity} from list.`, {
              style: { borderRadius: '10px', background: '#0b5ed7', color: 'white' },
              position: 'bottom-center',
          });
  
          // Create a new array without the deleted element
          const newCards = [...weatherCards.slice(0, index), ...weatherCards.slice(index + 1)];
  
          // Update state with the new array
          setWeatherCards(newCards);
  
          // Adjust the current card index if needed
          if (currentCardIndex >= index) {
              setCurrentCardIndex(currentCardIndex - 1);
          }
      }
  };
  

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
			  <section style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
				<div className="prev-arrow" style={{fontSize: '40px', position:'absolute', left:'0', paddingLeft:'100px', zIndex:'1' }}>
				  <div
					onClick={() => handleCardChange(-1)}
					style={{ color: '#bcb8b1', cursor: 'pointer' }}
				  >
					&lt;
				  </div>
				</div>
				{weatherCards.map((indiv, index) => {
				  const isCurrentCard = currentCardIndex === index;
				  const isInRange = index >= currentCardIndex - 1 && index <= currentCardIndex + 1;
	  
				  if (isInRange) {
					const cardStyle = {
					  opacity: isCurrentCard ? 1 : 0.2,
					  transition: 'opacity 0.8s ease, transform 0.8s ease',
					  flex: '0 0 auto',
					  marginLeft: isCurrentCard ? 'auto' : index < currentCardIndex ? '10px' : '5px', // Adjusted marginLeft
					  marginRight: isCurrentCard ? 'auto' : index > currentCardIndex ? '5px' : '10px', // Adjusted marginRight
					  transform: isCurrentCard ? 'translateX(0)' : index < currentCardIndex ? 'translateX(-40px)' : 'translateX(40px)',
					};
	  
					return (
					  <div key={index} style={cardStyle}>
						<WeatherCard
						  currentTemp={indiv.currentTemp}
						  city={indiv.city}
						  state={indiv.state}
						  wind={indiv.currentWind}
						  precipitation={indiv.precipitation}
						  code={indiv.weatherCode}
						  deleteWeatherCard={() => handleDelete(index)}
						/>
					  </div>
					);
				  } else {
					return null;
				  }
				})}
				<div className="next-arrow" style={{fontSize: '40px', position:'absolute', right:'0', paddingRight:'100px', zIndex:'1' }}>
				  <div
					onClick={() => handleCardChange(1)}
					style={{ color: '#bcb8b1', cursor: 'pointer' }}
				  >
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
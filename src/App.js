import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setWeatherData(null);
    setError('');

    if (!city) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'a2f17cde7d8b48418e9164958242809',
          q: city,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button style={{color:'white',background:'green'}} type="submit">Search</button>
      </form>

      {loading && <p>Loading data…</p>}

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          {/* <h2>
            Weather in {weatherData.location.name}, {weatherData.location.country}
          </h2> */}
          <div className='weather-card'>
            <p>Temperature:</p>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className='weather-card'>
            <p>Humidity:</p>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className='weather-card'>
            <p>Condition: </p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <p>Wind Speed:</p>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

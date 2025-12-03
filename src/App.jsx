import { useState } from 'react';
import './styles/ProfessionalApp.css';

const API_KEY = 'ae0db474359550b6dd92f4e160938937'; // Replace with your OpenWeatherMap API key

// Map OpenWeather `main` to a simple type used for CSS classes
const getWeatherType = (weather) => {
  if (!weather) return 'clear';
  const main = weather.weather?.[0]?.main;
  if (['Rain', 'Drizzle', 'Thunderstorm'].includes(main)) return 'rainy';
  if (main === 'Clouds') return 'cloudy';
  if (main === 'Snow') return 'winter';
  if (['Mist', 'Haze', 'Fog', 'Smoke'].includes(main)) return 'haze';
  if (main === 'Clear') return 'sunny';
  return 'clear';
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const weatherType = getWeatherType(weather); // sunny | cloudy | rainy | clear

  return (
    <div className={`dynamic-bg ${weatherType}`}>
      <div className="weather-app">
        <h1>Weather App</h1>
        <form onSubmit={fetchWeather} className="weather-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit" disabled={loading || !city.trim()}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                style={{ verticalAlign: 'middle' }}
              />
              {weather.weather[0].main} ({weather.weather[0].description})
            </p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

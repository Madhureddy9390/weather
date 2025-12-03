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
            <div className="weather-header-row">
              <div>
                <p className="weather-label">Current weather in</p>
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>
              </div>
              <div className="weather-icon-wrap">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            </div>

            <div className="weather-main-row">
              <div className="weather-temp-block">
                <span className="weather-temp">{Math.round(weather.main.temp)}</span>
                <span className="weather-temp-unit">°C</span>
              </div>
              <div className="weather-description-block">
                <p className="weather-main-text">
                  {weather.weather[0].main}
                </p>
                <p className="weather-sub-text">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div className="weather-meta-row">
              <div className="weather-chip">
                <span className="chip-label">Humidity</span>
                <span className="chip-value">{weather.main.humidity}%</span>
              </div>
              <div className="weather-chip">
                <span className="chip-label">Wind</span>
                <span className="chip-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="weather-chip">
                <span className="chip-label">Feels like</span>
                <span className="chip-value">
                  {Math.round(weather.main.feels_like)}°C
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React from "react";

const getSuggestion = (main) => {
  switch (main) {
    case "Clear":
      return "Don't forget your sunglasses!";
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      return "Perfect day for hot cocoa—or maybe an umbrella?";
    case "Clouds":
      return "Great weather for reading a book indoors!";
    case "Snow":
      return "Time for a snowball fight—or hot chocolate!";
    case "Mist":
    case "Fog":
      return "Spooky weather, Sherlock! Watch your step.";
    default:
      return "Weather is the best excuse for anything.";
  }
};

function WeatherCard({ weather, weatherIcon }) {
  if (!weather) return null;
  const main = weather.weather[0].main;
  const suggestion = getSuggestion(main);
  return (
    <div className="weather-info">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-animated-icon">
        <img src={weatherIcon} alt={weather.weather[0].description} />
      </div>
      <p>{weather.weather[0].main} ({weather.weather[0].description})</p>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p style={{marginTop:'1.6em', fontStyle:'italic', color:'#1976d2', fontWeight:500}}>{suggestion}</p>
    </div>
  );
}

export default WeatherCard;

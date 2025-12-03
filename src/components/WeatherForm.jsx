import React from "react";

function WeatherForm({ city, loading, onCityChange, onSubmit }) {
  return (
    <form className="weather-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={city}
        onChange={onCityChange}
        placeholder="Enter city name"
        aria-label="City"
        autoFocus
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
    </form>
  );
}

export default WeatherForm;

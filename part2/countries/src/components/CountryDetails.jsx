// components/CountryDetails.jsx
import React, { useEffect, useState } from "react";
import { fetchWeather } from "../services/countryService";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { latlng } = country;
      const [latitude, longitude] = latlng;
      const weatherData = await fetchWeather(latitude, longitude);
      setWeather(weatherData);
    };
    fetchData();
  }, [country]);

  return (
    <div>
      <h2>{country?.name?.common}</h2>
      <img
        src={country?.flags?.png || ""}
        alt={`${country?.name?.common} flag`}
        width="200"
      />
      <p>Capital: {country?.capital}</p>
      <p>Area: {country?.area} km²</p>
      <p>Region: {country?.region}</p>
      <p>Borders: {country?.borders?.join(", ")}</p>
      <p>Population: {country?.population}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country?.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      {weather && (
        <div>
          <h3>Current Weather:</h3>
          <p>Time: {weather.current.time}</p>
          <p>Temperature: {weather.current.temperature_2m} °C</p>
          <p>Wind Speed: {weather.current.wind_speed_10m} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;

// components/CountryList.jsx
import React from "react";

const CountryList = ({ countries, setSelectedCountry }) => (
  <div>
    <div style={{ paddingTop: "10px" }}></div>
    {Array.isArray(countries) &&
      countries.map((country) => (
        <div key={country?.name?.common}>
          {country?.name?.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
  </div>
);

export default CountryList;

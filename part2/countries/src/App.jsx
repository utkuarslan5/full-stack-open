import React, { useState, useEffect } from "react";
import {
  fetchAllCountries,
  fetchCountryDetails,
} from "./services/countryService";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching all countries:", error.message);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      fetchCountryDetails(filteredCountries[0]?.name?.common?.toLowerCase())
        .then((data) => {
          setSelectedCountry(data);
        })
        .catch((error) => {
          console.error("Error fetching country details:", error.message);
          setError(error.message);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (searchTerm === "") {
      console.log(
        "Filtering countries based on search term: showing all countries"
      );
      setFilteredCountries(countries);
    } else {
      console.log("Filtering countries based on search term...");
      setFilteredCountries(
        Array.isArray(countries)
          ? countries.filter((country) =>
              country?.name?.common
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : []
      );
    }
  }, [searchTerm, countries]);

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedCountry(null);
        }}
        placeholder="Enter country name"
      />
      {error && <ErrorMessage message={error} />}
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : searchTerm ? (
        filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 0 ? (
          <p>No matches</p>
        ) : (
          <CountryList
            countries={filteredCountries}
            setSelectedCountry={setSelectedCountry}
          />
        )
      ) : (
        <CountryList
          countries={countries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  );
}

export default App;

const ErrorMessage = ({ message }) => {
  return <div style={{ color: "red" }}>{message}</div>;
};

// services/countryService.js
export const fetchAllCountries = async () => {
  try {
    const response = await fetch(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching all countries: ${error.message}`);
  }
};

export const fetchCountryDetails = async (countryName) => {
  try {
    const response = await fetch(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching ${countryName} details: ${error.message}`);
  }
};

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching weather for latitude: ${latitude}, longitude: ${longitude}: ${error.message}`
    );
  }
};


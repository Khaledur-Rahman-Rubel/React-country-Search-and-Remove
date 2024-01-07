import { useState, useEffect } from "react";

import "./App.css";
import Search from "./assets/Search";
import Countries from "./assets/Countries";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [isLoading, setIsLoading] = useState(); //If data loading
  const [error, setError] = useState(); // If catch any error
  const [countries, setCountries] = useState([]); // data reserver
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    /* for data fetch */
    fetchData(url);
  }, []);

  const handleRemoveCountry = (removeName) => {
    const filter = filteredCountries.filter(
      (countryData) => countryData.name.common !== removeName //not matching data all came to filter
    );
    setFilteredCountries(filter);
  };

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
  };

  return (
    <>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && (
        <Countries
          countries={filteredCountries}
          onRemoveCountry={handleRemoveCountry}
        />
      )}
    </>
  );
};

export default App;

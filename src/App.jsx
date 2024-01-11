import "./App.css";
import Search from "./assets/Search";
import Countries from "./assets/Countries";
import useFetch from "./useFetch";

const App = () => {
  const {
    isLoading,
    error,
    countries,
    filteredCountries,
    setFilteredCountries,
  } = useFetch("https://restcountries.com/v3.1/all");

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

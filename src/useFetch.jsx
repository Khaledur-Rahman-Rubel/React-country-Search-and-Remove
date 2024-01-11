import { useEffect, useState } from "react";

const useFetch = (url) => {
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
  return {
    isLoading,
    error,
    countries,
    filteredCountries,
    setFilteredCountries,
  };
};

export default useFetch;

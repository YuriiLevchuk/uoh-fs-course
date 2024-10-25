import { useState, useEffect } from "react";

import serverRequests from "./services/serverRequests";
import CountriesInput from "./components/CountriesInput";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countriesInput, setCountriesInput] = useState('');
  const [countriesList, setCountriesList] = useState(null);
  const [allCountries, setAllCountries] = useState(null);

  useEffect(() => {
    serverRequests.allCountriesGET()
      .then(x => {
        setAllCountries(x);
        setCountriesList(x);
      });
  },[])

  //handlers
  const filterCountries = val => {
    setCountriesList(allCountries.filter(el => el.name.common.includes(val)))
  }
  const handleCountriesInput = (event) => {
    const currentValue = event.target.value;

    setCountriesInput(currentValue);
    filterCountries(currentValue);
  };

  //buttons
  const showCountryButton = (countryName) => {
    setCountriesInput(countryName);
    filterCountries(countryName);
  }

  if (!allCountries) return null;
  return(
    <>
      <CountriesInput countriesInput={countriesInput} handleCountriesInput={handleCountriesInput}/>
      <CountriesList countriesList={countriesList} showCountryButton={showCountryButton} filterCountries={filterCountries}/>
    </>
  )
}

export default App
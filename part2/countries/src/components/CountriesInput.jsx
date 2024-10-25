const CountriesInput = ({ countriesInput, handleCountriesInput}) => {
  return(
    <form>
        <label htmlFor="countriesInput">
          find countries
        </label>
        <input
          id="countriesInput"
          value={countriesInput}
          onChange={handleCountriesInput}
        />
      </form>
  )
}

export default CountriesInput;
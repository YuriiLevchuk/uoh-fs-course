import Weather from "./Weather";

const CountriesList = ({ countriesList, showCountryButton, handleCountriesInput }) => {
  if (countriesList === null) return null;

  const len = countriesList.length;
  let page = <></>;

  // choose template
  switch (true){
    case (len > 10):
      page = <>Too many matches, specify other filter</>
      break;

    case (len == 1):
      const country = countriesList[0];
      console.log(country);
      page = 
      <>
        <h1>{country.name.common}</h1>
        <p>
          Capital: {country.capital} <br/>
          Area: {country.area} m<sup>2</sup>
        </p>

        <h2>Languages</h2>
        <ul>
        {Object.keys(country.languages).map(el => <li key={el}>{country.languages[el]}</li>)}
        </ul>

        <h2>Flag</h2>
        <img src={country.flags.png} alt={country.flags.alt} />

        <h2>Weather in {country.capital}</h2>
        <Weather lat={country.latlng[0]} lng={country.latlng[1]}/>
      </>
      break;

    case (len == 0):
      page = <>No matches, specify other filter</>
      break;

    default:
      page = countriesList.map(el => 
      <div key={el.cca2}>
        {el.name.common}
        <button onClick={() => {showCountryButton(el.name.common)}}>show</button>
      </div>)
      break;
  }

  //console.log(page)
  return page;
}

export default CountriesList
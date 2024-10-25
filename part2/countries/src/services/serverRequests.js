import axios from 'axios';

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const weatherKey = import.meta.env.VITE_WEATHER_KEY

const allCountriesGET = () => 
  axios.get(countriesUrl).then(x => x.data);

const weatherGET = (lat, lng) => 
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}`).then(x => x.data);

export default  { allCountriesGET, weatherGET }
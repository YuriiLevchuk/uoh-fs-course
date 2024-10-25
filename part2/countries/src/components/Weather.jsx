import serverRequests from "../services/serverRequests"
import { useEffect, useState } from "react"

const Weather = ({lat, lng}) => {
  const [currentWeather, setCurrentWeather] = useState(null)
  useEffect(()=>{
    serverRequests.weatherGET(lat, lng)
      .then(x => setCurrentWeather(x))
  }, [])

  console.log(currentWeather);
  if(!currentWeather) return null;
  return(
    <>
      Temparture: {Math.ceil(currentWeather.main.temp-273.15)} celsius<br/>
      Wind: {currentWeather.wind.speed} m/s <br/>
      Weather: {currentWeather.weather[0].description}
      <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}/>
    </>
  )
}

export default Weather
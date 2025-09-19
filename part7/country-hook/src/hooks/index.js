import { useState, useEffect } from 'react'
import axios from 'axios'
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({ found: true, data: response.data })
      })
      .catch(() => {
        setCountry({ found: false })
      })
    }, [name])
  
  return country
}
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
export { useCountry, useField }
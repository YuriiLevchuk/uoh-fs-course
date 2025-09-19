import { useState, useEffect } from 'react'
import axios from 'axios'

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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(()=>{
    axios.get(baseUrl).then(response => {
    setResources(response.data)
    })
  },[baseUrl])


  const create = async (newObj) => {
    await axios.post(baseUrl, newObj)
      .then(r => {
        setResources([...resources, r.data])
        return r.data
      })
      .catch(e => console.log(e))
    return null
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export { useField, useResource }
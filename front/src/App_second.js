import { useState, useEffect, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const [coordinate, setCoordinate] = useState({
    fromAlt: '',
    fromLong: '',
    toAlt: '',
    toLong: '',
  })
  const [distance, setDistance] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    ;(async () => {
      const rawResponse = await fetch(
        'http://localhost:5050/travels/v1/distance',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromAlt: coordinate.fromAlt,
            fromLong: coordinate.fromLong,
            toAlt: coordinate.toAlt,
            toLong: coordinate.toLong,
          }),
        }
      )
      const content = await rawResponse.json()
      console.log(content)
      setDistance('green')

      console.log(distance)
      console.log(content)
      console.log(distance)
      console.log(typeof distance)
    })()
    setCoordinate({
      fromAlt: '',
      fromLong: '',
      toAlt: '',
      toLong: '',
    })
  }

  function handleChange(event) {
    const value = event.target.value
    setCoordinate({
      ...coordinate,
      [event.target.name]: value,
    })
  }
  const handleClearSubmit = () => {
    console.log('clear')
  }

  return (
    <div>
      <Header title="Geo app" />

      <Search
        handleSubmit={handleSearchSubmit}
        coordinate={coordinate}
        setCoordinate={setCoordinate}
        handleChange={handleChange}
        handleClear={handleClearSubmit}
      />
    </div>
  )
}

export default App

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import DistanseCard from './components/DistanceCard'
import Container from 'react-bootstrap/Container'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const [coordinate, setCoordinate] = useState({
    fromAlt: '',
    fromLong: '',
    toAlt: '',
    toLong: '',
  })
  const [distance, setDistance] = useState({})
  // useEffect(() => {
  //   setDistance('')
  // }, [])
  console.log(distance)

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:5050/travels/v1/distance',
        coordinate
      )
      setDistance(res.data)
      console.log(res.data.distance)
      console.log(distance)
    } catch (error) {
      console.log(error)
    }
    // ;(async () => {
    //   const rawResponse = await fetch(
    //     'http://localhost:5050/travels/v1/distance',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         fromAlt: coordinate.fromAlt,
    //         fromLong: coordinate.fromLong,
    //         toAlt: coordinate.toAlt,
    //         toLong: coordinate.toLong,
    //       }),
    //     }
    //   )
    //   const content = await rawResponse.json()
    //   console.log(content)
    //   setDistance('green')

    //   console.log(distance)
    //   console.log(content)
    //   console.log(distance)
    //   console.log(typeof distance)
    // })()
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
      <Container className="mt-4">
        <h4>Results</h4>
        <DistanseCard distance={distance} />
        <DistanseCard distance={distance} />
      </Container>
    </div>
  )
}

export default App

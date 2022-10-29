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
  const [distances, setDistance] = useState([])
  useEffect(() => {
    ;(async function () {
      try {
        const res = await axios.get(
          'http://localhost:5050/travels/v1/distances'
        )
        setDistance(res.data || [])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  console.log(distances)

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:5050/travels/v1/new-distance',
        coordinate
      )
      setDistance([res.data, ...distances])
      console.log(res)
      console.log(distances)
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
  const handleSaveDistance = async (id) => {
    const distanceToBeSaved = distances.find((distance) => distance.id === id)
    distanceToBeSaved.saved = true

    try {
      const res = await axios.post(
        'http://localhost:5050/travels/v1/distances',
        distanceToBeSaved
      )
      if (res.data?.inserted_id) {
        setDistance(
          distances.map((distance) =>
            distance.id === id ? { ...distance, saved: true } : distance
          )
        )
      }

      console.log(res.data)
      console.log(res.status)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDistance = async (id) => {
    try {
      const res = await axios.delete(
        'http://localhost:5050/travels/v1/distances',
        { data: { id: id } }
      )
      console.log(res.data)
      setDistance(distances.filter((distance) => distance.id !== id))
    } catch (error) {
      console.log(error)
    }
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

      <Container className="mt-4">
        <h3>Weather</h3>
      </Container>

      <hr />
      <Container className="mt-4">
        <h3>Measuring</h3>
      </Container>

      <Search
        handleSubmit={handleSearchSubmit}
        coordinate={coordinate}
        setCoordinate={setCoordinate}
        handleChange={handleChange}
        handleClear={handleClearSubmit}
      />
      <Container className="mt-4">
        <h4>Results</h4>
        {distances.map((distance, i) => (
          <DistanseCard
            key={i}
            distance={distance}
            saveDistance={handleSaveDistance}
            deleteDistance={deleteDistance}
          />
        ))}
        {/* <DistanseCard distance={distance} />
        <DistanseCard distance={distance} /> */}
      </Container>
    </div>
  )
}

export default App

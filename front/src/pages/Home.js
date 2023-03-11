import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from '../components/Search'
import DistanseCard from '../components/DistanceCard'
import Container from 'react-bootstrap/Container'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const Home = () => {
  const [coordinate, setCoordinate] = useState({
    fromLat: '',
    fromLong: '',
    toLat: '',
    toLong: '',
  })
  const [distances, setDistance] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    ;(async function () {
      try {
        const res = await axios.get(
          // 'http://localhost:5050/travels/v1/distances'
          'https://strembovskyi-geo.onrender.com/travels/v1/distances'
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

    const newErrors = findFormErrors()
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors)
    } else {
      try {
        const res = await axios.post(
          // 'http://localhost:5050/travels/v1/new-distance',
          'https://strembovskyi-geo.onrender.com/travels/v1/new-distance',
          coordinate
        )
        setDistance([res.data, ...distances])
        console.log(res)
        console.log(distances)
        setErrors({})
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
        fromLat: '',
        fromLong: '',
        toLat: '',
        toLong: '',
      })
    }
  }

  const handleSaveDistance = async (id) => {
    const distanceToBeSaved = distances.find((distance) => distance.id === id)
    distanceToBeSaved.saved = true

    try {
      const res = await axios.post(
        // 'http://localhost:5050/travels/v1/distances',
        'https://strembovskyi-geo.onrender.com/travels/v1/distances',
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
        // 'http://localhost:5050/travels/v1/distances',
        'https://strembovskyi-geo.onrender.com/travels/v1/distances',
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
  const findFormErrors = () => {
    const { fromLat, fromLong, toLat, toLong } = coordinate
    const newErrors = {}
    // Latitude errors
    if (!fromLat || fromLat === '') newErrors.fromLat = 'cannot be blank!'
    else if (!(fromLat >= -90 && fromLat <= 90))
      newErrors.fromLat = 'Latitude must be (-90, 90)!'
    if (!fromLong || fromLong === '') newErrors.fromLong = 'cannot be blank!'
    else if (!(fromLong >= -90 && fromLong <= 90))
      newErrors.fromLong = 'Longitude must be (-90, 90)!'
    if (!toLat || toLat === '') newErrors.toLat = 'cannot be blank!'
    else if (!(toLat >= -90 && toLat <= 90))
      newErrors.toLat = 'Latitude must be (-90, 90)!'
    if (!toLong || toLong === '') newErrors.toLong = 'cannot be blank!'
    else if (!(toLong >= -90 && toLong <= 90))
      newErrors.toLong = 'Longitude must be (-90, 90)!'

    console.log(newErrors)
    return newErrors
  }

  return (
    <div>
      <Container className="mt-4">
        <h3>Measuring</h3>
      </Container>

      <Search
        handleSubmit={handleSearchSubmit}
        coordinate={coordinate}
        setCoordinate={setCoordinate}
        handleChange={handleChange}
        handleClear={handleClearSubmit}
        errors={errors}
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

export default Home

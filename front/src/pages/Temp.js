import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import SearchWeather from '../components/SearchWeather'
import WeatherCard from '../components/WeatherCard'
import { Col, Row } from 'react-bootstrap'
import { useAxios } from '../hooks/use-http'

const URL_BACK = process.env.REACT_APP_URL_BACK

function Temp() {
  const [weathers, setWeather] = useState([])
  const latRef = useRef()
  const lonRef = useRef()
  const [errors, setErrors] = useState({})

  // useEffect(() => {
  //   ;(async function () {
  //     try {
  //       const res = await axios.get(`${URL_BACK}weathers`)
  //       setWeather(res.data || [])
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // }, [])
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `${URL_BACK}weathers`,
    headers: {
      // no need to stringify
      accept: '*/*',
    },
  })
  useEffect(() => {
    if (response) {
      setWeather(response)
    } else {
      setWeather([])
    }
  }, [response])

  console.log('ok ok ok')

  // setWeather(response.data || [])

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    console.log('ok ok')

    const newErrors = findFormErrors()
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors)
    } else {
      try {
        const res = await axios.post(`${URL_BACK}new-weather`, {
          Latitude: latRef.current.value,
          Longitude: lonRef.current.value,
        })
        setWeather([res.data, ...weathers])
        console.log(res.data)
        console.log(weathers)
        setErrors({})
      } catch (error) {
        console.log(error)
      }
      latRef.current.value = ''
      lonRef.current.value = ''
    }
  }

  const handleSaveWeather = async (id) => {
    const weatherToBeSaved = weathers.find((weather) => weather.id === id)
    weatherToBeSaved.saved = true

    try {
      const res = await axios.post(`${URL_BACK}weathers`, weatherToBeSaved)
      if (res.data?.inserted_id) {
        setWeather(
          weathers.map((weather) =>
            weather.id === id ? { ...weather, saved: true } : weather
          )
        )
      }

      console.log(res.data)
      console.log(res.status)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteWeather = async (id) => {
    try {
      const res = await axios.delete(`${URL_BACK}weathers`, {
        data: { id: id },
      })
      console.log(res.data)
      setWeather(weathers.filter((weather) => weather.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const findFormErrors = () => {
    const newErrors = {}
    // Latitude errors
    if (!latRef.current.value || latRef.current.value === '') {
      newErrors.latRef = 'cannot be blank!'
    } else if (!(latRef.current.value >= -90 && latRef.current.value <= 90)) {
      newErrors.latRef = 'Latitude must be (-90, 90)!'
    }
    if (!lonRef.current.value || lonRef.current.value === '') {
      newErrors.lonRef = 'cannot be blank!'
    } else if (!(lonRef.current.value >= -90 && lonRef.current.value <= 90)) {
      newErrors.lonRef = 'Longitude must be (-90, 90)!'
    }

    // // food errors
    // if (!food || food === '') newErrors.food = 'select a food!'
    // // rating errors
    // if (!rating || rating > 5 || rating < 1)
    //   newErrors.rating = 'must assign a rating between 1 and 5!'
    // // comment errors
    // if (!comment || comment === '') newErrors.comment = 'cannot be blank!'
    // else if (comment.length > 100) newErrors.comment = 'comment is too long!'
    console.log(newErrors)
    return newErrors
  }

  return (
    <div>
      <Container className="mt-4">
        <h3>Weather</h3>
      </Container>
      <SearchWeather
        handleSubmit={handleSearchSubmit}
        latRef={latRef}
        lonRef={lonRef}
        errors={errors}
        // setCoordinate={setCoordinate}
        // handleChange={handleChange}
        // handleClear={handleClearSubmit}
      />
      <Container className="mt-4">
        <h4>Results</h4>
        <Row xs={1} md={3} lg={3} className="mt-3">
          {weathers.map((weather, i) => (
            <Col key={i} className="pb-3">
              <WeatherCard
                weather={weather}
                saveWeather={handleSaveWeather}
                deleteWeather={deleteWeather}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Temp

// import { useAxios } from 'axioshook';

// const App = () => {
//     const { response, loading, error } = useAxios({
//         method: 'POST',
//         url: '/posts',
//         headers: { // no need to stringify
//           accept: '*/*'
//         },
//         data: {  // no need to stringify
//             userId: 1,
//             id: 19392,
//             title: 'title',
//             body: 'Sample text',
//         },
//     });

//     return (
//         <div className='App'>
//             <h1>Posts</h1>

//             {loading ? (
//                 <p>loading...</p>
//             ) : (
//                 <div>
//                     {error && (
//                         <div>
//                             <p>{error.message}</p>
//                         </div>
//                     )}
//                     <div> {
//                       // no need to use another state to store data, response is sufficient
//                       response && <p>{response.id}</p>
//                     }
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

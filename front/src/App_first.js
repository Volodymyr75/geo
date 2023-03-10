import { useState, useEffect, useCallback } from 'react'
import { AddressAutofill, SearchBox, config } from '@mapbox/search-js-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import Data from './Data.json'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const [word, setWord] = useState('')
  const [todo, setTodo] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState('')
  const [feature, setFeature] = useState()
  const [token, setToken] = useState('')

  useEffect(() => {
    word.length !== 0 &&
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${word}.json?access_token=${MAPBOX_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => setTodo(data))
        .catch((err) => {
          console.log(err.message)
        })
  }, [word])
  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0]
      setFeature(feature)
      // setShowMinimap(true);
      // setShowFormExpanded(true);
    },
    [setFeature]
  )
  useEffect(() => {
    const accessToken = MAPBOX_TOKEN
    setToken(accessToken)
    config.accessToken = accessToken
  }, [])
  console.log(feature)
  const handleFilter = (text) => {
    setWord(text)
  }
  const onSuggestHandler = (text) => {
    setWord(text)
    setTodo(null)
    console.log(todo)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // console.log(word)
    // fetch(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${word}.json?access_token=${MAPBOX_TOKEN}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => {
    //     console.log(err.message)
    //   })
    // setWord('')
  }
  // word.length > 2 &&
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${word}.json?access_token=${MAPBOX_TOKEN}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.features))
  //     .catch((err) => {
  //       console.log(err.message)
  //     })
  // console.log(word)
  // console.log(todo)
  return (
    <div>
      <Header title="Geo app" />
      <SearchBox
        accessToken={token}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <form>
        <AddressAutofill accessToken={MAPBOX_TOKEN} onRetrieve={handleRetrieve}>
          <input
            autoComplete="address-line1"
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
          />
        </AddressAutofill>
      </form>
      <Search
        word={word}
        setWord={setWord}
        handleFilter={handleFilter}
        onSuggestHandler={onSuggestHandler}
        handleSubmit={handleSearchSubmit}
        data={todo}
      />
    </div>
  )
}

export default App

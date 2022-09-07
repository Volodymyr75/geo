import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const [word, setWord] = useState('')
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // console.log(word)
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${word}.json?access_token=${MAPBOX_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div>
      <Header title="Geo app" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  )
}

export default App

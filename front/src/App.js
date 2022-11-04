import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Header from './components/Header'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  return (
    <div>
      <Header title="Geo app" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="weather" element={<Weather />} />
      </Routes>
    </div>
  )
}

export default App

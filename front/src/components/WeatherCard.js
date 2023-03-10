import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'

const WeatherCard = ({ weather, saveWeather, deleteWeather }) => {
  return (
    weather && (
      <Card style={{ width: '18rem' }}>
        <Card.Header>{weather.name || 'Not determined'}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Temperature: {weather.main.temp} C</ListGroup.Item>
          <ListGroup.Item>{weather.weather[0].description}</ListGroup.Item>
          <ListGroup.Item>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].main}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => deleteWeather(weather.id)}
              >
                Delete
              </Button>

              <Button
                disabled={weather.saved}
                variant={weather.saved ? 'success' : 'primary'}
                onClick={() => saveWeather(weather.id)}
              >
                {weather.saved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  )
}

export default WeatherCard

# Geo Application

This is a web application that provides simple geolocation and weather information services. It's built with a React frontend and a Python/Flask backend.

## Key Features

*   **Distance Calculation:** Calculate the distance in miles between two geographical points (latitude/longitude).
*   **Weather Lookup:** Get the current weather for a specific geographical location using the OpenWeatherMap API.
*   **History:** Saved distance calculations and weather lookups are stored in a MongoDB database and displayed to the user.

## Technologies Used

### Frontend

*   React
*   React Router
*   Axios
*   Bootstrap / React-Bootstrap
*   Mapbox Search API

### Backend

*   Python
*   Flask / Flask-RESTful
*   MongoDB (via `pymongo`)
*   `geopy` for distance calculations
*   OpenWeatherMap API for weather data

## Setup and Installation

1.  **Clone the repository.**
2.  **Backend Setup:**
    *   Navigate to the `api` directory.
    *   Create a virtual environment: `python -m venv venv`
    *   Activate it: `source venv/bin/activate`
    *   Install dependencies: `pip install -r requirements.txt`
    *   Create a `.env` file and add your `API_KEY` for OpenWeatherMap and `UNITS` (e.g., `metric` or `imperial`).
    *   Run the server: `flask run`
3.  **Frontend Setup:**
    *   Navigate to the `front` directory.
    *   Install dependencies: `npm install`
    *   Create a `.env` file and add your `REACT_APP_MAPBOX_TOKEN` and `REACT_APP_URL_BACK` (the address of your running backend, e.g., `http://localhost:5000/travels/v1/`).
    *   Start the development server: `npm start`

## API Endpoints

All endpoints are prefixed with `/travels/v1`.

*   `POST /new-distance`: Calculates a new distance.
*   `GET, POST, DELETE /distances`: Manages saved distances.
*   `POST /new-weather`: Fetches new weather data.
*   `GET, POST, DELETE, PUT /weathers`: Manages saved weather lookups.
*   `/smoke`: A simple smoke test endpoint.

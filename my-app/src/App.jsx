import { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
import "./App.css";

// Import your downloaded images
import bgImage from "./assets/Background.jpg";
import sunnyImage from "./assets/Sunny.jpeg";
import hotDayImage from "./assets/HotDay.jpeg";
import cloudyImage from "./assets/Cloudy.jpg";
import blackCloudsImage from "./assets/Black.jpeg";
import rainyImage from "./assets/Rainy.jpeg";
import thunderImage from "./assets/Thuderstrom.jpeg";
import snowImage from "./assets/Snow.jpg";
import humidImage from "./assets/Humid.jpg";
import goodDayImage from "./assets/GoodDay.jpeg";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ed570ac911dad2a255e2965a53ced74&units=metric`
    );
    setWeather(response.data);
  } catch (error) {
    alert("❌ The entered city name is not valid. Please enter a valid city name.");
    setWeather(null);
  }
};


  // Decide which big image to show
  const getWeatherImage = (main, temp, humidity) => {
    if (main === "Clear") {
      if (temp > 35) return hotDayImage;
      return sunnyImage;
    } else if (main === "Clouds") {
      if (humidity > 80) return humidImage;
      if (humidity > 60) return blackCloudsImage;
      return cloudyImage;
    } else if (main === "Rain") {
      return rainyImage;
    } else if (main === "Thunderstorm") {
      return thunderImage;
    } else if (main === "Snow") {
      return snowImage;
    } else {
      return goodDayImage;
    }
  };

  // Small animated icon
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny className="icon sun-move" />;
      case "Clouds":
        return <WiCloud className="icon cloud-move" />;
      case "Rain":
        return <WiRain className="icon rain-drop" />;
      case "Thunderstorm":
        return <WiThunderstorm className="icon thunder" />;
      case "Snow":
        return <WiSnow className="icon snow-fall" />;
      default:
        return <WiDaySunny className="icon" />;
    }
  };

  // Recommendation line at bottom
  const getRecommendation = (main) => {
    switch (main) {
      case "Clear":
        return "It's a good day! You can travel outside 🌞";
      case "Clouds":
        return "Weather is okay, but keep an umbrella handy ☁️";
      case "Rain":
        return "It's raining! Stay home, stay safe 🌧️";
      case "Thunderstorm":
        return "Thunderstorms expected ⚡ Better to stay indoors!";
      case "Snow":
        return "Snowy weather ❄️ Dress warm if going out!";
      default:
        return "Weather is moderate, plan accordingly.";
    }
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay">
        <h1 className="title">Weatherly</h1>
       <div className="slogan-container">
          <WiDaySunny className="slogan-icon sun-move-small" />
          <h3 className="slogan">Forecast your day, the smart way.</h3>
        </div>
        {/* Search Input */}
        <div className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="weather-card">
            <h2>
              Weather in <span>{weather.name}</span>
            </h2>

            {/* Main weather image */}
            <div className="main-image">
              <img
                src={getWeatherImage(
                  weather.weather[0].main,
                  weather.main.temp,
                  weather.main.humidity
                )}
                alt="Weather"
              />
            </div>

            {/* Small animated icon */}
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].main)}
            </div>

            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="desc">{weather.weather[0].description}</p>

            <div className="extra">
              <p>
                <WiHumidity /> Humidity: {weather.main.humidity}%
              </p>
              <p>
                <WiStrongWind /> Wind: {weather.wind.speed} m/s
              </p>
            </div>

            {/* Recommendation Line */}
            <div className="recommendation">
              {getRecommendation(weather.weather[0].main)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

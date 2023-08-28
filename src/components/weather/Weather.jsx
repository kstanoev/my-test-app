import { useState, useEffect } from 'react';
import { WEATHER_API_KEY } from '../../services/api.js';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const Weather = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityAndWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  const fetchCityAndWeather = (latitude, longitude) => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    const nominatimApiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);

        if (data.weather && data.weather[0]) {
          const weatherCode = data.weather[0].id;
          switch (true) {
            case weatherCode >= 200 && weatherCode < 300:
              setBackgroundImage(
                'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              );
              break;
            case weatherCode >= 300 && weatherCode < 600:
              setBackgroundImage(
                'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              );
              break;
            case weatherCode >= 600 && weatherCode < 700:
              setBackgroundImage(
                'https://images.pexels.com/photos/7245306/pexels-photo-7245306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              );
              break;
            case weatherCode >= 700 && weatherCode < 800:
              setBackgroundImage(
                'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              );
              break;
            case weatherCode === 800:
              setBackgroundImage(
                'https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80'
              );
              break;
            case weatherCode > 800:
              setBackgroundImage(
                'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              );
              break;
            default:
              setBackgroundImage(null);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });

    fetch(nominatimApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.hamlet ||
          'Unknown';
        setCity(city);
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
      });
  };

  let weatherIcon;
  if (weather && weather.weather && weather.weather[0]) {
    const weatherCode = weather.weather[0].id;
    switch (true) {
      case weatherCode >= 200 && weatherCode < 300:
        weatherIcon = <FaCloudRain size={50} />;
        break;
      case weatherCode >= 300 && weatherCode < 600:
        weatherIcon = <FaCloudRain size={50} />;
        break;
      case weatherCode >= 600 && weatherCode < 700:
        weatherIcon = <FaSnowflake size={50} />;
        break;
      case weatherCode >= 700 && weatherCode < 800:
        weatherIcon = <FaCloud size={50} />;
        break;
      case weatherCode === 800:
        weatherIcon = <FaSun size={50} />;
        break;
      case weatherCode > 800:
        weatherIcon = <FaCloudSun size={50} />;
        break;
      default:
        weatherIcon = null;
    }
  }

  return (
    <div
      className="flex items-left justify-left mb-2 ml-6 mt-2 mr-6 pt-4 pb-4 rounded-3xl shadow-lg text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      {city && weather ? (
        <div className="text-left ml-8 text-gray-100">
          <h2 className="text-xl font-bold mb-2">Weather in {city}</h2>
          <p className="text-md mb-3">Temperature: {weather.main.temp}°C </p>
          <p className="text-md">{weatherIcon || 'No Icon'}</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl" />
          Loading data...
        </div>
      )}
    </div>
  );
};

export default Weather;

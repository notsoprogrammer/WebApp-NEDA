import React, { useState, useEffect } from 'react';
import { fetchForecastByCoords,fetchWeatherByCoords } from '../slices/WeatherService';
import styles from './WeatherWidget.module.css';

const WeatherWidget = ({ coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.latitude, coords.longitude)
        .then(data => {
          setWeatherData({
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            wind: data.wind.speed,
          });
        })
        .catch(console.error);

        fetchForecastByCoords(coords.latitude, coords.longitude)
        .then(data => {
          // The OpenWeatherMap API returns a list of forecast data in 3-hour intervals.
          // You may want to process this data to get daily forecasts or however you wish to display it.
      
          // This is an example of processing the data to get the daily forecast:
          const dailyData = data.list.filter((reading) => reading.dt_txt.endsWith("12:00:00"));
          const processedForecast = dailyData.map(day => ({
            date: day.dt_txt,
            minTemp: day.main.temp_min,
            maxTemp: day.main.temp_max,
            condition: day.weather[0].main,
            icon: day.weather[0].icon // You can use this icon code to display weather icons
          }));
      
          setForecastData(processedForecast);
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
          // Handle any additional UI changes or notifications in case of an error.
        });
    }
  }, [coords]);

  if (!weatherData || !forecastData) return null;

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.header}>
        <p className={styles.temperature}>{weatherData.temperature}°C</p>
        <p className={styles.condition}>{weatherData.condition}</p>
      </div>
      <div className={styles.details}>
        <div>
          <div className={styles.detailLabel}>HUMIDITY</div>
          <div>{weatherData.humidity}</div>
        </div>
        <div>
          <div className={styles.detailLabel}>WIND</div>
          <div>{weatherData.wind}</div>
        </div>
      </div>
        <div className={styles.forecast}>
          {forecastData.map((forecast, index) => (
            <div key={index} className={styles.forecastCard}>
              <div className={styles.day}>{new Date(forecast.date).toLocaleDateString()}</div>
              <div className={styles.tempRange}>{`${forecast.minTemp}°C / ${forecast.maxTemp}°C`}</div>
              <div>{forecast.condition}</div>
              {/* You can use the icon code to display weather icons using an appropriate library or your own images */}
              <img src={`http://openweathermap.org/img/wn/${forecast.icon}.png`} alt={forecast.condition} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default WeatherWidget;

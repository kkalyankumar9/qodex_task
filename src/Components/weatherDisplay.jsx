import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getWeather, setUnit } from "../Redux/action";
import { WiHumidity, WiStrongWind, WiThermometer, WiDaySunny } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

const WeatherContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  width: 350px;
  margin: auto;
`;

const ToggleButton = styled.button`
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const City = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const WeatherInfo = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const WeatherImage = styled.img`
  width: 80px;
  height: 80px;
`;

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const { currentWeather, isLoading, isError, unit } = useSelector(
    (state) => state.userWeather
  );

  useEffect(() => {
    const lastCity = localStorage.getItem("lastSearchedCity");
    if (lastCity) {
      dispatch(getWeather(lastCity, unit));
    }
  }, [dispatch, unit]);

  useEffect(() => {
    if (currentWeather?.name) {
      localStorage.setItem("lastSearchedCity", currentWeather.name);
      const interval = setInterval(() => {
        dispatch(getWeather(currentWeather.name, unit));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [dispatch, currentWeather?.name, unit]);

  const toggleUnit = () => {
    dispatch(setUnit(unit === "metric" ? "imperial" : "metric"));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching weather data(Data not found).</p>;
  if (!currentWeather) return <p>Search for a city to see weather details.</p>;

  return (
    <WeatherContainer>
      <City>
        {currentWeather.name}, {currentWeather.sys?.country || "N/A"}
      </City>
      <WeatherInfo>
        <WiThermometer size={24} color="red" />
        Temperature: {currentWeather.main.temp} {unit === "metric" ? "°C" : "°F"}
      </WeatherInfo>
      <WeatherInfo>
        <WiHumidity size={24} color="blue" />
        Humidity: {currentWeather.main.humidity}%
      </WeatherInfo>
      <WeatherInfo>
        <WiStrongWind size={24} color="gray" />
        Wind Speed: {currentWeather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
      </WeatherInfo>
      <WeatherInfo>
        <WiDaySunny size={24} color="orange" />
        Condition: {currentWeather.weather[0].description}
      </WeatherInfo>
      <WeatherImage
        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
        alt="weather icon"
      />
      <ToggleButton onClick={toggleUnit}>
        {unit === "metric" ? <FaTemperatureHigh size={20} /> : <FaTemperatureLow size={20} />}
        Switch to {unit === "metric" ? "Fahrenheit (°F)" : "Celsius (°C)"}
      </ToggleButton>
    </WeatherContainer>
  );
};

export default WeatherDisplay;

import { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { getWeather } from "../Redux/action";


const SearchContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 250px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(getWeather(city));
    }
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};

export default WeatherSearch;

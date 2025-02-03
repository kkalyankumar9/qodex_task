import axios from "axios";
import {
  USER_GETWEATHER_ERROR,
  USER_GETWEATHER_REQUEST,
  USER_GETWEATHER_SUCCESS,
  USER_SET_UNIT,
} from "./actionType";

const API_KEY = process.env.API_KEY; 

export const getWeather = (city, unit = "metric") => async (dispatch) => {
  dispatch({ type: USER_GETWEATHER_REQUEST });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    dispatch({ type: USER_GETWEATHER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_GETWEATHER_ERROR, payload: error.message });
  }
};

export const setUnit = (unit) => ({
  type: USER_SET_UNIT,
  payload: unit,
});

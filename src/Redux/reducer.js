import {
  USER_GETWEATHER_ERROR,
  USER_GETWEATHER_REQUEST,
  USER_GETWEATHER_SUCCESS,
  USER_SET_UNIT,
} from "./actionType";

const initialState = {
  currentWeather: null,
  isLoading: false,
  isError: false,
  unit: "metric", // Default: Celsius
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GETWEATHER_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case USER_GETWEATHER_SUCCESS:
      return { ...state, currentWeather: action.payload, isLoading: false };
    case USER_GETWEATHER_ERROR:
      return { ...state, isError: true, isLoading: false };
    case USER_SET_UNIT:
      return { ...state, unit: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";

import userWeatherReducer from "./reducer";

const rootReducer = combineReducers({
  userWeather: userWeatherReducer, 
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

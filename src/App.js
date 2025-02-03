import "./App.css";
import WeatherDisplay from "./Components/weatherDisplay";
import WeatherSearch from "./Components/weatherSearch";

function App() {
  return (
    <div>
      <WeatherSearch />
      <WeatherDisplay />
    </div>
  );
}

export default App;

import PubSub from "pubsub-js";
import {
  FETCH_WEATHER_ERROR,
  UNITS_CHANGED,
  WEATHER_DATA_UPDATED,
} from "./pubsubTopics";
import {
  location,
  mainTemp,
  feelsLike,
  descIcon,
  descText,
  highTemp,
  windSpeed,
  lowTemp,
  humidityPercent,
} from "./domElements";
import { getUnits } from "./units";
import thunderIcon from "./img/weather-lightning.svg";
import rainIcon from "./img/weather-rain.svg";
import snowIcon from "./img/weather-snow.svg";
import fogIcon from "./img/weather-fog.svg";
import sunIcon from "./img/weather-sun.svg";
import cloudIcon from "./img/weather-cloudy.svg";

const DEGREE_SIGN = "\xB0";

let tempUnit;
let speedUnit;

function setIcon(id) {
  if (id >= 200 && id < 300) descIcon.src = thunderIcon;
  else if (id >= 300 && id < 500) descIcon.src = rainIcon;
  else if (id >= 600 && id < 700) descIcon.src = snowIcon;
  else if (id >= 700 && id < 800) descIcon.src = fogIcon;
  else if (id === 800) descIcon.src = sunIcon;
  else descIcon.src = cloudIcon;
}

function displayWeather(_topic, data) {
  location.textContent = `${data.city}, ${data.country}`;
  mainTemp.textContent = `${data.temp} ${tempUnit}`;
  feelsLike.textContent = `Feels like ${data.feelsLike} ${tempUnit}`;
  descText.textContent = `${data.desc}`;
  highTemp.textContent = `${data.high} ${tempUnit}`;
  lowTemp.textContent = `${data.low} ${tempUnit}`;
  windSpeed.textContent = `${data.wind} ${speedUnit}`;
  humidityPercent.textContent = `${data.humidity}%`;
  setIcon(data.descID);
}

function updateUnits() {
  if (getUnits() === "imperial") {
    tempUnit = `${DEGREE_SIGN}F`;
    speedUnit = "mph";
  } else {
    tempUnit = `${DEGREE_SIGN}C`;
    speedUnit = "km/h";
  }
}

function displayError() {
  alert("Could not find location");
}

export default function initWeatherUI() {
  updateUnits();
  PubSub.subscribe(UNITS_CHANGED, updateUnits);
  PubSub.subscribe(WEATHER_DATA_UPDATED, displayWeather);
  PubSub.subscribe(FETCH_WEATHER_ERROR, displayError);
}

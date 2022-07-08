import PubSub from "pubsub-js";
import { UNITS_CHANGED, WEATHER_DATA_UPDATED } from "./pubsubTopics";
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
import { units } from "./units";

const DEGREE_SIGN = "\xB0";
let tempUnit;
let speedUnit;

export default function initWeatherUI() {
  updateUnits();
  PubSub.subscribe(UNITS_CHANGED, updateUnits);
  PubSub.subscribe(WEATHER_DATA_UPDATED, displayWeather);
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
}

function updateUnits() {
  if (units() === "imperial") {
    tempUnit = `${DEGREE_SIGN}F`;
    speedUnit = "mph";
  } else {
    tempUnit = `${DEGREE_SIGN}C`;
    speedUnit = "km/h";
  }
}

import PubSub from "pubsub-js";
import { WEATHER_DATA_UPDATED } from "./pubsubTopics";
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

const degreeSign = "\xB0";

export default function initWeatherUI() {
  PubSub.subscribe(WEATHER_DATA_UPDATED, displayWeather);
}

function displayWeather(_topic, data) {
  location.textContent = `${data.city}, ${data.country}`;
  mainTemp.textContent = `${data.temp} ${degreeSign}F`;
  feelsLike.textContent = `Feels like ${data.feelsLike} ${degreeSign}F`;
  descText.textContent = `${data.desc}`;
  highTemp.textContent = `${data.high} ${degreeSign}F`;
  lowTemp.textContent = `${data.low} ${degreeSign}F`;
  windSpeed.textContent = `${data.wind}mph`;
  humidityPercent.textContent = `${data.humidity}%`;
}

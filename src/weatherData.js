import PubSub from "pubsub-js";
import {
  FETCH_WEATHER_ERROR,
  SEARCHED_LOCATION,
  WEATHER_DATA_UPDATED,
} from "./pubsubTopics";
import { getWeather, processData } from "./weatherAPI";

let data;

export default function initWeatherData() {
  PubSub.subscribe(SEARCHED_LOCATION, updateData);
}

async function updateData(_topic, location) {
  try {
    const rawData = await getWeather(location);
    data = processData(rawData);
    PubSub.publish(WEATHER_DATA_UPDATED, data);
  } catch (error) {
    PubSub.publish(FETCH_WEATHER_ERROR);
  }
}

updateData(null, "San Francisco");

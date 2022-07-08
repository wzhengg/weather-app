import PubSub from "pubsub-js";
import {
  FETCH_WEATHER_ERROR,
  SEARCHED_LOCATION,
  UNITS_CHANGED,
  WEATHER_DATA_UPDATED,
} from "./pubsubTopics";
import { getUnits } from "./units";
import { getWeather, processData } from "./weatherAPI";

const DEFAULT = "San Francisco";

let stored;
let data;

async function updateData(_topic, location) {
  try {
    if (location === undefined) location = stored;
    const rawData = await getWeather(location, getUnits());

    data = processData(rawData);
    PubSub.publish(WEATHER_DATA_UPDATED, data);
    stored = location;
  } catch (error) {
    PubSub.publish(FETCH_WEATHER_ERROR);
  }
}

export default function initWeatherData() {
  updateData(null, DEFAULT);
  PubSub.subscribe(SEARCHED_LOCATION, updateData);
  PubSub.subscribe(UNITS_CHANGED, updateData);
}

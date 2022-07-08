import PubSub from "pubsub-js";
import {
  FETCH_WEATHER_ERROR,
  SEARCHED_LOCATION,
  UNITS_CHANGED,
  WEATHER_DATA_UPDATED,
} from "./pubsubTopics";
import { units } from "./units";
import { getWeather, processData } from "./weatherAPI";

let storedLocation = "San Francisco";
let data;

export default function initWeatherData() {
  PubSub.subscribe(SEARCHED_LOCATION, updateData);
  PubSub.subscribe(UNITS_CHANGED, updateData);
  updateData(null, storedLocation);
}

async function updateData(_topic, location) {
  try {
    if (location === undefined) {
      location = storedLocation;
    }
    const rawData = await getWeather(location, units());
    data = processData(rawData);
    PubSub.publish(WEATHER_DATA_UPDATED, data);
    storedLocation = location;
  } catch (error) {
    PubSub.publish(FETCH_WEATHER_ERROR);
  }
}

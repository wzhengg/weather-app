import PubSub from "pubsub-js";
import { FETCH_WEATHER_ERROR, WEATHER_DATA_UPDATED } from "./pubsubTopics";
import { getWeather, processData } from "./weatherAPI";

let data;

export default async function updateData(location) {
  try {
    const rawData = await getWeather(location);
    data = processData(rawData);
    PubSub.publish(WEATHER_DATA_UPDATED, data);
  } catch (error) {
    PubSub.publish(FETCH_WEATHER_ERROR);
  }
}

updateData("San Francisco");

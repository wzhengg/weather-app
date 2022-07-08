const key = "d019f4b4f48d1bf8c740870e85e4ac56";

export async function getWeather(location, units) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=${units}`
  );
  return response.json();
}

export function processData(data) {
  return {
    city: data.name,
    country: data.sys.country,
    desc: data.weather[0].main,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
    wind: Math.round(data.wind.speed),
    humidity: data.main.humidity,
  };
}

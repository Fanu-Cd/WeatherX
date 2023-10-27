import { WiDayHail, WiFog, WiDayCloudy, WiCloudy } from "react-icons/wi";
import { BiCloudLightRain } from "react-icons/bi";

export const fetchData = (city) => {
  const apiKey = "d7ea390a729956bd79ae06259b26f733"; //Your openweathermap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = fetch(url);
  const data = response;

  return data;
};

export const foreCast = (arg) => {
  const { lat, lon } = arg;
  const apiKey = "d7ea390a729956bd79ae06259b26f733"; //Your openweathermap API
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = fetch(url);
  const data = response;

  return data;
};

export const toC = (kelvin) => {
  return (parseFloat(kelvin) - 273.15).toFixed(2);
};

export const filterThreeDaysData = (data) => {
  const threeDays = [];
  const today = new Date().getDate();
  for (let i = 0; i < data.length; i++) {
    const current = new Date(data[i].dt_txt).getDate();
    if (current > today && current < today + 4) {
      threeDays.push(data[i]);
    }
  }

  const firstDay = [];
  const secondDay = [];
  const thirdDay = [];
  for (let i = 0; i < threeDays.length; i++) {
    if (new Date(threeDays[i].dt_txt).getDate() === today + 1)
      firstDay.push(threeDays[i]);
    if (new Date(threeDays[i].dt_txt).getDate() === today + 2)
      secondDay.push(threeDays[i]);
    if (new Date(threeDays[i].dt_txt).getDate() === today + 3)
      thirdDay.push(threeDays[i]);
  }

  var desc,
    temp_max,
    temp_min,
    max_humidity,
    min_humidity,
    max_feels_like,
    min_feels_like,
    max_speed,
    min_speed,
    date;

  let firstDayData = {},
    secondDayData = {},
    thirdDayData = {};

  temp_max = firstDay[0].main.temp_max;
  temp_min = firstDay[0].main.temp_min;
  max_humidity = firstDay[0].main.humidity;
  min_humidity = firstDay[0].main.humidity;
  max_feels_like = firstDay[0].main.feels_like;
  min_feels_like = firstDay[0].main.temp_max;
  max_speed = firstDay[0].wind.speed;
  min_speed = firstDay[0].wind.speed;
  desc = firstDay[0].weather[0].description;

  for (let i = 0; i < firstDay.length; i++) {
    if (firstDay[i].main.temp_max > temp_max)
      temp_max = firstDay[i].main.temp_max;
    if (firstDay[i].main.temp_min < temp_min)
      temp_min = firstDay[i].main.temp_min;
    if (firstDay[i].main.humidity > max_humidity)
      max_humidity = firstDay[i].main.humidity;
    if (firstDay[i].main.humidity < min_humidity)
      min_humidity = firstDay[i].main.humidity;
    if (firstDay[i].main.feels_like > max_feels_like)
      max_feels_like = firstDay[i].main.feels_like;
    if (firstDay[i].main.feels_like < min_feels_like)
      min_feels_like = firstDay[i].main.feels_like;
    if (firstDay[i].wind.speed > max_speed) max_speed = firstDay[i].wind.speed;
    if (firstDay[i].wind.speed < min_speed) min_speed = firstDay[i].wind.speed;
    date = new Date(firstDay[i].dt_txt).getDate();
  }
  firstDayData = {
    temp_max: temp_max,
    temp_min: temp_min,
    humidity: (max_humidity + min_humidity) / 2,
    max_feels_like: max_feels_like,
    min_feels_like: min_feels_like,
    wind_speed: (max_speed + min_speed) / 2,
    date: date,
    day: findDay(firstDay[0].dt_txt),
    desc: desc,
  };

  temp_max = secondDay[0].main.temp_max;
  temp_min = secondDay[0].main.temp_min;
  max_humidity = secondDay[0].main.humidity;
  min_humidity = secondDay[0].main.humidity;
  max_feels_like = secondDay[0].main.feels_like;
  min_feels_like = secondDay[0].main.feels_like;
  max_speed = secondDay[0].wind.speed;
  min_speed = secondDay[0].wind.speed;
  desc = secondDay[0].weather[0].description;

  for (let i = 0; i < secondDay.length; i++) {
    if (secondDay[i].main.temp_max > temp_max)
      temp_max = secondDay[i].main.temp_max;
    if (secondDay[i].main.temp_min < temp_min)
      temp_min = secondDay[i].main.temp_min;
    if (secondDay[i].main.humidity > max_humidity)
      max_humidity = secondDay[i].main.humidity;
    if (secondDay[i].main.humidity < min_humidity)
      min_humidity = secondDay[i].main.humidity;
    if (secondDay[i].main.feels_like > max_feels_like)
      max_feels_like = secondDay[i].main.feels_like;
    if (secondDay[i].main.feels_like < min_feels_like)
      min_feels_like = secondDay[i].main.feels_like;
    if (secondDay[i].wind.speed > max_speed)
      max_speed = secondDay[i].wind.speed;
    if (secondDay[i].wind.speed < min_speed)
      min_speed = secondDay[i].wind.speed;
    date = new Date(secondDay[i].dt_txt).getDate();
  }
  secondDayData = {
    temp_max: temp_max,
    temp_min: temp_min,
    humidity: (max_humidity + min_humidity) / 2,
    max_feels_like: max_feels_like,
    min_feels_like: min_feels_like,
    wind_speed: (max_speed + min_speed) / 2,
    date: date,
    day: findDay(secondDay[0].dt_txt),
    desc: desc,
  };

  temp_max = thirdDay[0].main.temp_max;
  temp_min = thirdDay[0].main.temp_min;
  max_humidity = thirdDay[0].main.humidity;
  min_humidity = thirdDay[0].main.humidity;
  max_feels_like = thirdDay[0].main.feels_like;
  min_feels_like = thirdDay[0].main.feels_like;
  max_speed = thirdDay[0].wind.speed;
  min_speed = thirdDay[0].wind.speed;
  desc = thirdDay[0].weather[0].description;

  for (let i = 0; i < thirdDay.length; i++) {
    if (thirdDay[i].main.temp_max > temp_max)
      temp_max = thirdDay[i].main.temp_max;
    if (thirdDay[i].main.temp_min < temp_min)
      temp_min = thirdDay[i].main.temp_min;
    if (thirdDay[i].main.humidity > max_humidity)
      max_humidity = thirdDay[i].main.humidity;
    if (thirdDay[i].main.humidity < min_humidity)
      min_humidity = thirdDay[i].main.humidity;
    if (thirdDay[i].main.feels_like > max_feels_like)
      max_feels_like = thirdDay[i].main.feels_like;
    if (thirdDay[i].main.feels_like < min_feels_like)
      min_feels_like = thirdDay[i].main.feels_like;
    if (thirdDay[i].wind.speed > max_speed) max_speed = thirdDay[i].wind.speed;
    if (thirdDay[i].wind.speed < min_speed) min_speed = thirdDay[i].wind.speed;
    date = new Date(thirdDay[i].dt_txt).getDate();
  }
  thirdDayData = {
    temp_max: temp_max,
    temp_min: temp_min,
    humidity: (max_humidity + min_humidity) / 2,
    max_feels_like: max_feels_like,
    min_feels_like: min_feels_like,
    wind_speed: (max_speed + min_speed) / 2,
    date: date,
    day: findDay(thirdDay[0].dt_txt),
    desc: desc,
  };

  return [{ firstDayData, secondDayData, thirdDayData }];
};

const findDay = (dateInp) => {
  const date = new Date(dateInp);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

  return dayOfWeek;
};

export const getWeatherIcon = (desc) => {
  switch (desc) {
    case "cloudy":
      return <WiCloudy color="black" size="5rem" />;
    case "light rain":
      return <BiCloudLightRain color="green" size="5rem" />;
    case "few clouds":
      return <WiDayCloudy color="brown" size="5rem" />;
    case "fog":
      return <WiFog color="darkslategray" size="5rem" />;
    //other cases can be listed here
    default:
      return <WiDayHail color="black" size="5rem" />;
  }
};

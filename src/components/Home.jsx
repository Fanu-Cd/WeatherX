import { Input } from "antd";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { getWeatherIcon } from "../services/Weather";
import {
  fetchData,
  toC,
  foreCast,
  filterThreeDaysData,
} from "../services/Weather";
import {Popover,Button} from "antd";
const Home = () => {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState({ name: "London" });
  const [status, setStatus] = useState({
    inputError: false,
    inputErrorMsg: "",
  });
  const [weatherNews, setWeatherNews] = useState([
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      by: "BBC1",
      imgUrl:
        "https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    },
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      by: "BBC2",
      imgUrl:
        "https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    },
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      by: "BBC3",
      imgUrl:
        "https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    },
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      by: "BBC4",
      imgUrl:
        "https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    },
    {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      by: "BBC5",
      imgUrl:
        "https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    },
  ]);

  useEffect(() => {
    fetchData("London")
      .then((res) => res.json())
      .then((resp) => {
        foreCast({ lat: resp.coord.lat, lon: resp.coord.lon })
          .then((res) => res.json())
          .then((res) => {
            setWeather({ ...resp, foreCast: filterThreeDaysData(res.list)[0] });
          });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ ...status, inputError: false, inputErrorMsg: "" });
    if (city.name === "")
      setStatus({
        ...status,
        inputError: true,
        inputErrorMsg: "Please Enter City Name",
      });
    else {
      fetchData(city.name)
        .then((res) => res.json())
        .then((resp) => {
          if (resp.cod && resp.cod === "404") {
            setStatus({
              ...status,
              inputError: true,
              inputErrorMsg: "City Not Found, Please Try Another City Name",
            });
          } else {
            console.log("result", resp);
            foreCast({ lat: resp.coord.lat, lon: resp.coord.lon })
              .then((res) => res.json())
              .then((res) => {
                setWeather({
                  ...resp,
                  foreCast: filterThreeDaysData(res.list)[0],
                });
              })
              .catch((err) => {
                setStatus({
                  ...status,
                  inputError: true,
                  inputErrorMsg: "Some Error Occurred, Please Try Again",
                });
              });
          }
        })
        .catch((err) => {
          setStatus({
            ...status,
            inputError: true,
            inputErrorMsg: "Some Error Occurred, Please Try Again",
          });
        });
    }
  };

  return (
    <div className="row container-fluid mx-auto rounded p-2">
      <div
        className="col-md-8 row col-sm-12 border mx-auto shadow p-2"
        style={{ height: "auto", minHeight: "10rem" }}
      >
        <div className="col-12 p-3" style={{ height: "5rem" }}>
          <form onSubmit={handleSubmit}>
            <Input
              value={city.name}
              onChange={(e) => {
                setCity({ ...city, name: e.target.value });
              }}
              className="outline-none"
              style={{ width: "100%", height: "2.5rem" }}
            />
            {status.inputError && (
              <small className="text-danger">{status.inputErrorMsg}</small>
            )}
          </form>
        </div>
        <div className="col-12 row mx-auto mt-3" style={{ minHeight: "10rem" }}>
          <div className="col-4 d-flex flex-column shadow">
            <div className="col-12 p-2">
              <small>{weather.name && weather.name}</small>
            </div>
            <div className="col-12 mt-1 p-2">
              <p className="m-0 d-inline fs-1">
                {weather.main && toC(weather.main.temp)}
              </p>
              <p className="m-0 d-inline fs-3">
                <sup>'c</sup>
              </p>
              <small className="d-block">
                Feels Like {weather.main && toC(weather.main.feels_like)}
                <sup>'c</sup>
              </small>
            </div>
            <div className="col-12 mt-1 p-2 fs-5">
              <p className="m-0">
                {weather.main && weather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="col-7 ms-auto border">
            <BarChart weather={weather} />
          </div>
        </div>
        <div className="col-12 row mx-auto mt-3" style={{ minHeight: "15rem" }}>
          <div className="col-4 p-2 row d-flex flex-column shadow">
            <h4 className="col-12">
              {weather.foreCast &&
                `${weather.foreCast.firstDayData.day} ${weather.foreCast.firstDayData.date}`}
            </h4>
            <div className="col-12">
              {weather.foreCast &&
                getWeatherIcon(weather.foreCast.firstDayData.desc)}
            </div>
            <div className="col-12 row p-1" style={{ minHeight: "5rem" }}>
              <div className="col-md-5 col-sm-12">
                <small className="fs-5 fw-bold">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.firstDayData.temp_max)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="ms-1">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.firstDayData.temp_min)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="d-block fs-4">
                  {weather.foreCast && weather.foreCast.firstDayData.desc}
                </small>
              </div>
              <div className="col-sm-12 col-md-6 d-flex flex-column">
                <small>
                  Feels{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.firstDayData.max_feels_like)
                    ).toFixed(0)}
                  'c /{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.firstDayData.min_feels_like)
                    ).toFixed(0)}
                  'c
                </small>
                <small>
                  Humidity{" "}
                  {weather.foreCast &&
                    weather.foreCast.firstDayData.humidity.toFixed(1)}{" "}
                  %
                </small>
                <small>
                  Wind{" "}
                  {weather.foreCast &&
                    weather.foreCast.firstDayData.wind_speed.toFixed(2)}{" "}
                  M/H
                </small>
              </div>
            </div>
          </div>
          <div className="col-4 p-2 row d-flex shadow ms-auto">
            <h4 className="col-12">
              {weather.foreCast &&
                `${weather.foreCast.secondDayData.day} ${weather.foreCast.secondDayData.date}`}
            </h4>
            <div className="col-12">
              {weather.foreCast &&
                getWeatherIcon(weather.foreCast.secondDayData.desc)}
            </div>
            <div className="col-12 row p-1" style={{ minHeight: "5rem" }}>
              <div className="col-md-5 col-sm-12">
                <small className="fs-5 fw-bold">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.secondDayData.temp_max)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="ms-1">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.secondDayData.temp_min)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="d-block fs-4">
                  {weather.foreCast && weather.foreCast.secondDayData.desc}
                </small>
              </div>
              <div className="col-sm-12 col-md-6 d-flex flex-column">
                <small>
                  Feels{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.secondDayData.max_feels_like)
                    ).toFixed(0)}
                  'c /{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.secondDayData.min_feels_like)
                    ).toFixed(0)}
                  'c
                </small>
                <small>
                  Humidity{" "}
                  {weather.foreCast &&
                    weather.foreCast.secondDayData.humidity.toFixed(1)}{" "}
                  %
                </small>
                <small>
                  Wind{" "}
                  {weather.foreCast &&
                    weather.foreCast.secondDayData.wind_speed.toFixed(2)}{" "}
                  M/H
                </small>
              </div>
            </div>
          </div>
          <div className="col-4 p-2 row d-flex shadow ms-auto">
            <h4 className="col-12">
              {weather.foreCast &&
                `${weather.foreCast.thirdDayData.day} ${weather.foreCast.thirdDayData.date}`}
            </h4>
            <div className="col-12">
              {weather.foreCast &&
                getWeatherIcon(weather.foreCast.thirdDayData.desc)}
            </div>
            <div className="col-12 row p-1" style={{ minHeight: "5rem" }}>
              <div className="col-md-5 col-sm-12">
                <small className="fs-5 fw-bold">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.thirdDayData.temp_max)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="ms-1">
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.thirdDayData.temp_min)
                    ).toFixed(0)}
                  <sup>'c</sup>
                </small>
                <small className="d-block fs-4">
                  {weather.foreCast && weather.foreCast.thirdDayData.desc}
                </small>
              </div>
              <div className="col-sm-12 col-md-6 d-flex flex-column">
                <small>
                  Feels{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.thirdDayData.max_feels_like)
                    ).toFixed(0)}
                  'c /{" "}
                  {weather.foreCast &&
                    Math.round(
                      toC(weather.foreCast.thirdDayData.min_feels_like)
                    ).toFixed(0)}
                  'c
                </small>
                <small>
                  Humidity{" "}
                  {weather.foreCast &&
                    weather.foreCast.thirdDayData.humidity.toFixed(1)}{" "}
                  %
                </small>
                <small>
                  Wind{" "}
                  {weather.foreCast &&
                    weather.foreCast.thirdDayData.wind_speed.toFixed(2)}{" "}
                  M/H
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-3 p-3 ms-auto me-1 d-flex border flex-column col-sm-12"
        style={{ height: "auto", minHeight: "10rem" }}
      >
        <h3 className="text-center m-0">Weather News</h3>
        {weatherNews.map((news) => {
          return (
            <div
              key={news.by}
              className="row mt-3"
              style={{ minHeight: "3rem", height: "auto" }}
            >
              <div className="col-8 d-flex flex-column">
                <small
                  className="text-truncate"
                  style={{ width: "100%", minHeight: "1rem" }}
                >
                  {news.title}
                </small>
                <small
                  className="text-truncate fw-bold mt-2"
                  style={{ width: "100%" }}
                >
                  {news.by}
                </small>
              </div>
              <div className="col-4">
                <img
                  src={news.imgUrl}
                  style={{ height: "5rem", width: "5rem", objectFit: "cover" }}
                  alt="Img"
                  className="float-end"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-12 w-100 mb-2 mt-5 d-flex justify-content-center align-items-center">
        <Popover 
        content={<div>
          <p className="text-center m-0">Software Developer</p>
          <ul className="">
            <li>Github : /fanu-cd</li>
            <li>LinkedIn : /fanucd</li>
          </ul>
        </div>}
         title={<p className="m-0 text-center">Fanuel Amare</p>}>
        Developed By <u className="">Fanuel Amare</u>
       </Popover>
      </div>
    </div>
  );
};

export default Home;

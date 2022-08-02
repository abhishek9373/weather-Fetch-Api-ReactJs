import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";

export default function Weather(props) {
    let {aut} = props;
  const navigate = useNavigate();
  let tim = new Date();
  let tims = tim.toUTCString();

  function scrol() {
    window.scrollTo(0, 30);
  }
  scrol();

  function signout() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        props.con(false);
        alert("Confirm Signout?");
        navigate("/");
        <div class="alert alert-success" role="alert">
          Signout Succesfully.
        </div>;
      })
      .catch((error) => {
        <div class="alert alert-warning" role="alert">
          Signout Fail
        </div>;
      });
  }

  const [place, setplace] = useState("");

  const [city, setcity] = useState({
    name: "Sangamner",
    region: "Maharashtra",
    country: "India",
    temp: "25",
    humidity: "2.5%",
    winds: "34 Kmph",
    icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
    time: `${tims}`,
    climate: "Clear",
  });

  async function componentDidMount() {
    let url = `https://api.weatherapi.com/v1/current.json?key=b07f58d869344925997141701222901&q=${place}&aqi=no`;
    let data = await fetch(url);

    let parsedata = await data.json();
    console.log(parsedata);

    setcity({
      name: parsedata.location.name,
      region: parsedata.location.region,
      country: parsedata.location.country,
      temp: parsedata.current.temp_c,
      humidity: parsedata.current.humidity,
      winds: parsedata.current.wind_kph,
      icon: parsedata.current.condition.icon,
      time: parsedata.location.localtime,
      climate: parsedata.current.condition.text,
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showlocation);
    }
  }
  function showlocation(position) {
    let ltg = position.coords.latitude + "," + position.coords.longitude;
    async function componentDidMount1() {
      let url = `https://api.weatherapi.com/v1/current.json?key=b07f58d869344925997141701222901&q=${ltg}&aqi=no`;
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);
      setcity({
        name: parsedata.location.name,
        region: parsedata.location.region,
        country: parsedata.location.country,
        temp: parsedata.current.temp_c,
        humidity: parsedata.current.humidity,
        winds: parsedata.current.wind_kph,
        icon: parsedata.current.condition.icon,
        time: parsedata.location.localtime,
        climate: parsedata.current.condition.text,
      });
    }
    componentDidMount1();
  }

  function getlocation() {
    let acc = window.alert(
      "NewsToday Reqiures Permission To access Your Location"
    );
    if (!acc) {
      getLocation();
    } else {
    }
  }
  document.title = "Weather | NewsToday";

  return (
    <>
      <p
        className="text-center container"
        style={{ fontSize: "4vw", fontFamily: "cursive" }}
      >
        <strong>Today's Weather :</strong>{" "}
      </p>
      <br />
      <div
        className="container bg-dark  text-light text-center "
        style={{
          height: "465px",
          width: "47vw",
          borderRadius: "7px",
          marginTop: "-38px",
        }}
      >
        <div class="input-group  p-4 container">
          <input
            type="text"
            class="form-control bg-dark text-light"
            style={{ width: "70%" }}
            placeholder="Search For Location"
            aria-describedby="basic-addon2"
            value={place}
            onChange={(e) => setplace(e.target.value)}
          />
          <div class="input-group-append ">
            <button
              class="btn btn-outline-secondary text-light container"
              style={{ fontSize: "2vhr" }}
              onClick={componentDidMount}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={getlocation}
          className="btn-primary text-light"
          style={{ border: "none", borderRadius: "8px" }}
        >
          Get location
        </button>
        <div className="container mt-2">
          <h1 className="mt-1" style={{ fontSize: "3vw" }}>
            {city.name}
          </h1>
          <p className="mt-1" style={{ fontSize: "2vh" }}>
            {city.region},{city.country}.
          </p>
          <p style={{ fontSize: "2.5vh" }}>
            {new Date(city.time).toDateString()}
          </p>
          <p style={{ fontSize: "2vh" }}>
            {city.temp} <sup>o</sup>C {city.climate}
          </p>
          <img src={city.icon} alt="" />
          <p style={{ fontSize: "2vhr mt-3" }}>
            humidity : {city.humidity}% ,Winds : {city.winds} kmph
          </p>
        </div>
        <button className="btn btn-primary" onClick={signout}>
          Logout
        </button>
      </div>
    </>
  );
}

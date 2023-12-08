import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./userDetails.css";
import DigitalClock from "./digitalClock";
import Moment from "moment-timezone";

function UserDetails() {
  const [postsList, setPostsList] = useState([]);
  const [countryCodesList, setCountryCodesList] = useState([]);
  const [selectedCountryUtcTime, setSelectedCountryUtcTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [time, setTime] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { userObj } = state;
  useEffect(() => {
    getPosts();
    getCountryCodes();
  }, []);

  const getPosts = () => {
    const postResponse = axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPostsList(res.data);
      });
  };

  const getCountryCodes = () => {
    const countryCodeResponse = axios
      .get("http://worldtimeapi.org/api/timezone")
      .then((res) => {
        let defaultTimeZone = Moment.tz.guess();

        if (defaultTimeZone == "Asia/Calcutta") {
          defaultTimeZone = "Asia/Kolkata";
        }

        const newOrderedList = res.data.map((item: any) => {
          if (defaultTimeZone === item) {
            res.data = [item, ...res.data];
          }
        });

        const newList = res.data.map((item: any) => {
          return { label: item, value: item };
        });
        onCountryCodeChangeHandler(defaultTimeZone, false);
        setCountryCodesList(newList);
      });
  };

  const onCountryCodeChangeHandler = (event: any, dropdownClicked: boolean) => {
    const selectedCountry = dropdownClicked ? event.target.value : event;
    const selectedCountryResponse = axios
      .get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
      .then((res) => {
        setSelectedCountryUtcTime(res.data.utc_datetime);

        let dateArray = res.data.datetime.split(".");
        let timeArray = dateArray[0].split("T");

        const [hours, minutes, seconds] = timeArray[1].split(":").map(Number);

        const timeInSeconds = hours * 3600 + minutes * 60 + seconds;

        setTime(timeInSeconds);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        {" "}
        <div className="header">
          <div
            style={{
              display: "flex",
              margin: 10,
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <div style={{ display: "flex", margin: 5, justifyContent: "end" }}>
              <div>
                <select
                  name="cars"
                  id="cars"
                  onChange={(e: any) => onCountryCodeChangeHandler(e, true)}
                  style={{ height: 28, width: 155 }}
                >
                  {countryCodesList.map((item: any, index: any) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
              </div>
              <div style={{ margin: 10, marginTop: 0 }}>
                <DigitalClock
                  selectedCountryUtcTime={selectedCountryUtcTime}
                  currentTime={currentTime}
                  time={time}
                  setTime={setTime}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-header-text">Profile Page</div>
        <div className="userCard">
          <div>
            <div>Name: {userObj?.name}</div>
            <div>
              {userObj?.username} | {userObj?.website}
            </div>
          </div>
          <div>
            <div>Address: {userObj?.address?.city}</div>
            <div>Emain: {userObj?.email}</div>
          </div>
        </div>
        <div className="cardsList">
          <div className="cardColumn">
            {postsList.map((item: any) => (
              <li className="postCardContainer" key={item.id}>
                <div className="postHeader">{item.title}</div>
                <div>{item.body}</div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;

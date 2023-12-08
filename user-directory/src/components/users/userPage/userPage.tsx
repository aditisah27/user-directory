import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import useHistory from "react-router-dom";
import "./userPage.css";

function UserPage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    const userResponse = axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserData(res.data);
      });
  };

  const redirectHandler = (item: any) => {
    navigate("/details/" + item.id, { state: { userObj: item } });
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div className="header">Directory</div>
        <div className="cardsList">
          <div>
            {userData.map((item: any) => (
              <li
                className="cardContainer"
                key={item.id}
                onClick={() => redirectHandler(item)}
              >
                <div>Name: {item.name}</div>
                <div>Posts: {item.id}</div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;

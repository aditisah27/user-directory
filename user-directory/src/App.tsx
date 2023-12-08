import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import UserPage from "./components/users/userPage/userPage";
import UserDetails from "./components/useDetails/usersDetails"; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="details/:userId" element={<UserDetails />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;

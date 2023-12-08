import React, { useState, useEffect } from "react";

const DigitalClock = (props: any) => {
  const [isPaused, setIsPaused] = useState(false);
  const { time, setTime } = props;

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPaused) {
        setTime((prevTime: any) => prevTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  const formatTime = (selectedTime: any) => {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(selectedTime / 3600);
    const minutes = Math.floor((selectedTime % 3600) / 60);
    const seconds = selectedTime % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <div>{formatTime(time)}</div>
      </div>
      <div className="controls">
        <button className="pause-btn" onClick={togglePause}>{isPaused ? "Start" : "Pause"}</button>
      </div>
    </div>
  );
};

export default DigitalClock;

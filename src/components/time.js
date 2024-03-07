import React, { useState, useEffect } from 'react';
import './time.css';

const Timer = ({ onSpeedChange }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    onSpeedChange(seconds);
  }, [seconds, onSpeedChange]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="timer-container">
      <h3>{`Time: ${formatTime(seconds)} / 30`}</h3>
      <button className="play-button" onClick={handlePlayPause}>
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

const Time = () => {
  const [speed, setSpeed] = useState('1X');

  const speedPlay = () => {
    setSpeed((prevSpeed) => (prevSpeed === '1X' ? '2X' : '1X'));
  };

  return (
    <div className="playContainer">
      <Timer onSpeedChange={() => {}} />
      <button className="speed" onClick={speedPlay}>
        {speed}
      </button>
    </div>
  );
};

export default Time;

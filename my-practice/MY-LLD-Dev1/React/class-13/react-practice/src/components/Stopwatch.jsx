import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStartPause = () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      // Start/Resume the timer
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10); // tick every ~10ms for centisecond precision
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    const overall = time;
    const previousLapOverall = laps.length > 0 ? laps[0].overall : 0;
    const split = overall - previousLapOverall;

    const newLap = {
      id: laps.length + 1,
      split,
      overall,
    };

    setLaps([newLap, ...laps]);
  };

  // Format time helper
  const formatTimeParts = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const centiseconds = Math.floor((timeInMs % 1000) / 10);

    const pad = (num) => String(num).padStart(2, '0');
    return {
      min: pad(minutes),
      sec: pad(seconds),
      cs: pad(centiseconds),
    };
  };

  // Format a single duration for laps table
  const formatLapTime = (timeInMs) => {
    const parts = formatTimeParts(timeInMs);
    return `${parts.min}:${parts.sec}.${parts.cs}`;
  };

  const currentFormatted = formatTimeParts(time);

  // SVG circular indicator calculations
  // Circumference of radius 110 is 2 * PI * 110 = 691.15
  const circumference = 691;
  const secondsFraction = (time % 60000) / 60000;
  const strokeDashoffset = circumference - (circumference * secondsFraction);

  // Identify fastest and slowest laps (requires at least 2 laps to compare)
  let fastestLapId = null;
  let slowestLapId = null;
  if (laps.length >= 2) {
    let minSplit = Infinity;
    let maxSplit = -Infinity;

    laps.forEach((lap) => {
      if (lap.split < minSplit) {
        minSplit = lap.split;
        fastestLapId = lap.id;
      }
      if (lap.split > maxSplit) {
        maxSplit = lap.split;
        slowestLapId = lap.id;
      }
    });
  }

  return (
    <div className="stopwatch-card">
      <h2 className="stopwatch-header">Stopwatch</h2>

      {/* Circular Dial Indicator */}
      <div className="timer-ring-container">
        <svg className="timer-ring-svg" viewBox="0 0 240 240">
          <circle
            className="timer-ring-bg"
            cx="120"
            cy="120"
            r="110"
          />
          <circle
            className="timer-ring-progress"
            cx="120"
            cy="120"
            r="110"
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Display Text centered inside circle */}
        <div className="timer-text-container">
          <div className="timer-display">
            <span className="time-part">{currentFormatted.min}</span>
            <span className="time-colon">:</span>
            <span className="time-part">{currentFormatted.sec}</span>
            <span className="time-ms">.{currentFormatted.cs}</span>
          </div>
          <div className="timer-status">
            {isRunning ? 'Running' : time > 0 ? 'Paused' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-container">
        {/* Left Action Button: Lap or Reset */}
        {isRunning ? (
          <button className="btn btn-secondary" onClick={handleLap}>
            Lap
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={time === 0}
            style={{ opacity: time === 0 ? 0.35 : 1, cursor: time === 0 ? 'not-allowed' : 'pointer' }}
          >
            Reset
          </button>
        )}

        {/* Right Action Button: Start or Pause */}
        <button
          className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`}
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="laps-container">
          <div className="laps-header">
            <span>Lap</span>
            <div className="lap-times">
              <span>Split</span>
              <span>Overall</span>
            </div>
          </div>
          <ul className="laps-list">
            {laps.map((lap) => {
              const isFastest = lap.id === fastestLapId;
              const isSlowest = lap.id === slowestLapId;
              let itemClass = "lap-item";
              if (isFastest) itemClass += " lap-fastest";
              if (isSlowest) itemClass += " lap-slowest";

              return (
                <li key={lap.id} className={itemClass}>
                  <span className="lap-number">Lap {lap.id}</span>
                  <div className="lap-times">
                    <span className="lap-split">+{formatLapTime(lap.split)}</span>
                    <span className="lap-overall">{formatLapTime(lap.overall)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
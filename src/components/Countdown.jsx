import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),

      };
    }

    return timeLeft;
  };

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  // Set the target date to September 2, 2024
  const targetDate = new Date('2024-09-02T08:00:00Z'); // 10:00 AM CET is 08:00 AM UTC

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <div className="text-container">
        <h1>Reserva ya y obtén un descuento del <strong>20%</strong></h1>
      </div>
      <div className="timer-container">
        {Object.keys(timeLeft).map((interval, index) => (
          <div key={index} className="time-box">
            <div className="time">{formatNumber(timeLeft[interval])}</div>
            <div className="label">{interval}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;

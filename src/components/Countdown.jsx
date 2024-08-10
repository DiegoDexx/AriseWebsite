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

  // Format numbers to ensure two digits
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  // Get the target date from localStorage or set it to 10 days from now
  const getTargetDate = () => {
    const savedDate = localStorage.getItem('targetDate');
    if (savedDate) {
      return new Date(savedDate);
    } else {
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + 10);
      localStorage.setItem('targetDate', newTargetDate.toString());
      return newTargetDate;
    }
  };

  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const resetCountdown = () => {
    const newTargetDate = new Date();
    newTargetDate.setDate(newTargetDate.getDate() + 10);
    setTargetDate(newTargetDate);
    localStorage.setItem('targetDate', newTargetDate.toString());
    setTimeLeft(calculateTimeLeft(newTargetDate));
  };

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
      {/* <!-- <button onClick={resetCountdown} className="reset-button">Reiniciar Contador</button> */}
    </div>
  );
};

export default Countdown;

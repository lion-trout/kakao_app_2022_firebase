import React, { useState } from 'react';
import { authService, db, storage } from "fbase";
import { Link, useNavigate } from 'react-router-dom';
import 'styles/Header.scss';

function Header({ h1Class, heading, num, leftItemLink, leftItem, rightItem }) {
  const navigate = useNavigate();

  const OnLogOutClick = () => {
    authService.signOut();
    navigate('/');
    window.location.reload();
  }

  const [timer, setTimer] = useState("00:00");

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}:${minutes}`);
  }

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  }

  startTimer();

  return (
    <header className='header'>
      <div className="status_bar">
        <div className="left_item">
          <i className="fa-solid fa-plane"></i>
          <i className="fa-solid fa-wifi"></i>
        </div>
        <div className="center_item">
          <span>{timer}</span>
        </div>
        <div className="right_item">
          <i className="fa-solid fa-moon"></i>
          <i className="fa-brands fa-bluetooth-b"></i>
          <span><span>100</span>%</span>
          <i className="fa-solid fa-battery-full"></i>
        </div>
      </div>
      <div className="title_bar">
        <h1 className={h1Class}>{heading} <span>{num}</span></h1>
        <div className="left_item">
          <Link to={leftItemLink}>{leftItem}</Link>
        </div>
        <div className="right_item" onClick={OnLogOutClick}>
          <Link to="/">{rightItem}</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
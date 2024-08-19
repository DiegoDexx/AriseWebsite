import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa';
import logo from '../assets/img/arise.png'; // Asegúrate de que la ruta de la imagen es correcta

const NavBar = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
      <div className="logo-container">
        <a href='/reservas'><img src={logo} alt="Arise Logo" className="logo" />  </a>
      </div>
      <div className="menu-container">
        <a href="/reservas" className="active">Home</a>
      
        <a href="/contact">Contact</a>
çç
        <a href="javascript:void(0);" className="icon" onClick={toggleResponsive}>
          <FaBars />
        </a>
      </div>
    </div>
  );
};

export default NavBar;

import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import throttle from 'lodash.throttle';  // Importamos throttle
import logo from '../assets/img/arise.png';
import TopPromotion from './TopPromotion';  // Importa el componente de promoción
const NavBar = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [navBarClass, setNavBarClass] = useState('primary-navbar');
  const location = useLocation();

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  const toggleSearch = () => {
    setIsClicked(!isClicked);
  };

  // Función que maneja el scroll, con throttle para limitar la frecuencia
  const handleScroll = throttle(() => {
    if (location.pathname === '/reservas') {
      if (window.scrollY > 80) {
        setNavBarClass('secondary-navbar');
      } else {
        setNavBarClass('primary-navbar');
      }
    }
  }, 200);

  useEffect(() => {
    if (location.pathname !== '/reservas') {
      setNavBarClass('tertiary-navbar');
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [location.pathname, handleScroll]);

  const showMenuClass = isResponsive ? 'menu-container responsive' : 'menu-container';
  const showSearchInput = isClicked ? 'active' : '';

  return (
    <>
      {/* Componente de Promoción */}
      <TopPromotion />

      {/* Navbar principal */}
      <div className={`topnav ${navBarClass} ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
        <div className="head-container">
          <div className="logo-container">
            <a href="/reservas">
              <img src={logo} alt="Arise Logo" className="logo" />
            </a>
          </div>
          <a href="javascript:void(0);" className="icon" onClick={toggleResponsive}>
            <FaBars />
          </a>
          <div className="options-container">
            <div className={`search-container ${showSearchInput}`}>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit" onClick={toggleSearch}>
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className={showMenuClass}>
              <a href="/reservas" className="active">Log in</a>
              <a href="/reservas"><FaShoppingCart />My cart</a>
              <a href="/contact">Contact & FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

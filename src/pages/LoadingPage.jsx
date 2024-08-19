import React from 'react';
import logo from '../assets/img/arise.png'; // Asegúrate de que la ruta de la imagen es correcta


const LoadingPage = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <img src={logo} alt="Loading" className="loading-image" />
    </div>
  );
};

export default LoadingPage;

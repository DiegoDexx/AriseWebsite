import React, { useState, useEffect } from 'react';
import banner_background from '../assets/img/banner_background.png';

const Countdown = () => {
  

    return (
<div className="banner2-container">
  <div className="banner2-overlay">
      <img src={banner_background} alt="banner_background"  />
  </div>
  <div className="banner2-content">
      <h2>Primera colección <strong>YA A LA VENTA</strong></h2>

      {/* <!-- boton que lleve a comprar --> */}
      <a href="/products/1" className="buy-button">AVERIGUAR</a>
  </div>
</div>

    );
  }

 

export default Countdown;

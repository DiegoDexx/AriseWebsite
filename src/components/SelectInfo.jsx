import React, { useState } from 'react';

const SelectInfo = ({ description }) => {
  // Estado para controlar la selección del menú
  const [selectedOption, setSelectedOption] = useState('description');

  // Manejador de cambio de opción
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="menu-product-info">
      <div className="buttons">
        <label
          htmlFor="desc-1"
          className={selectedOption === 'description' ? 'active' : ''}
        >
          <input
            type="radio"
            id="desc-1"
            name="desc-btn"
            value="description"
            checked={selectedOption === 'description'}
            onChange={handleOptionChange}
          />
          Descripción
        </label>

        <label
          htmlFor="desc-2"
          className={selectedOption === 'details' ? 'active' : ''}
        >
          <input
            type="radio"
            id="desc-2"
            name="desc-btn"
            value="details"
            checked={selectedOption === 'details'}
            onChange={handleOptionChange}
          />
          Entrega
        </label>
      </div>

      <div className="description-content">
        {selectedOption === 'description' && <p>{description}</p>}
        {selectedOption === 'details' && (
          <div className="delivery-info">
            <div className="info-item">
              <i className="fa fa-truck" aria-hidden="true"></i>
              <span>Entrega en 24h-48h</span>
            </div>
            <div className="info-item">
              <i className="fa fa-money" aria-hidden="true"></i>
              <span>Envío Gratis</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInfo;

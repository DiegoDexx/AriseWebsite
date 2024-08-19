import React, { useState, useEffect } from 'react';
import logo from '../assets/img/arise.png';
import axios from 'axios';
import { getItem } from '../functions/localStorage';

const BookingModal = ({ setShowBookingModal }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    descuento: 20,
    monto_pagado: getItem('monto'),
    cantidad: getItem('quantity'),
  });

  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState(null);
  const [successBooking, setSuccessBooking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const productString = localStorage.getItem('selectedProduct');

    if (productString) {
      try {
        const productData = JSON.parse(productString);
        setProduct(productData);
        console.log('Producto recuperado de localStorage:', productData);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        setErrors({ general: 'Error al cargar los datos del producto. Por favor, intenta nuevamente.' });
      }
    } else {
      setErrors({ general: 'No se encontró información del producto en el almacenamiento local.' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    if (!product) {
      setErrors({ general: 'No se ha seleccionado ningún producto.' });
      return;
    }

    try {
      const response = await axios.post('https://arise-app-44ac74ba4283.herokuapp.com/api/bookings', {
        product_id: product.productId,
        user_name: formData.user_name,
        user_email: formData.email,
        user_phone_number: formData.phone,
        cantidad: formData.cantidad,
        date: formData.date,
        monto_pagado: formData.monto_pagado,
        descuento: formData.descuento,
      });

      console.log("Reserva creada con éxito", response);
      setSuccessBooking(true);

    } catch (error) {
      if (error.response) {
        console.error('Error creando reserva:', error.response);
        setErrors({ general: error.response.data.message || 'Error al crear la reserva.' });
      } else {
        console.error('Error creando reserva:', error);
        setErrors({ general: 'Error al crear la reserva.' });
      }
    }
  };

  return (
    <div className="modal-overlay">
      <style>
        {`
          .error-message {
            color: red;
            margin-top: 5px;
            font-size: 12px;
          }

          label {
            color: black;
            font-size: 12px;
          }

          .success-message {
            color: green;
            font-size: 16px;
            text-align: center;
          }

          .modal-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .close-button {
            margin-top: 10px;
            background-color: #dc3545;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .close-button:hover {
            background-color: #c82333;
          }

          .btn-primary {
            background-color: #007bff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .btn-primary:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <div className="modal-inner">
        <div className="modal-top">
          <img src={logo} alt="Arise Logo" className="logo" />
          <br />
          <h4>¡Aprovecha y reserva tu producto!</h4>
        </div>
        <div className="modal-content">
          {successBooking ? (
            <div className="success-message">
              <p>🎉 <strong>¡Felicidades, {formData.user_name}!</strong> 🎉</p>
              <p>Has reservado exitosamente <strong>{formData.cantidad}</strong> unidad(es) del producto <strong>{product?.name || 'Producto'}</strong>.</p>
              <p>El monto total pagado es de <strong>${formData.monto_pagado}</strong>.</p>
              <p>Revisa tu correo <strong>{formData.email}</strong> para verificar tu reserva.</p>
          
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Escribe tu nombre y apellidos (Obligatorio)"
                  required
                />
                {errors.user_name && <div className="error-message">{errors.user_name}</div>}
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="email"
                  className="form-control email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Escribe tu Email (Obligatorio)"
                  required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ingresa tu número de teléfono (Opcional)"
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  readOnly
                  required
                />
                {errors.date && <div className="error-message">{errors.date}</div>}
              </fieldset>

              <input
                type="hidden"
                name="descuento"
                value={formData.descuento}
              />
              <input
                type="hidden"
                name="monto_pagado"
                value={formData.monto_pagado}
              />
              <input
                type="hidden"
                name="cantidad"
                value={formData.cantidad}
              />

              {errors.general && <div className="error-message">{errors.general}</div>}
              <button className="btn btn-primary" type="submit">Reservar tu producto</button>
              <small>
              La información recopilada no se compartirá con terceros y se <strong>eliminará después de las reservas</strong>
              </small>
            </form>
          )}
        </div>
       
          <button onClick={() => setShowBookingModal(false)} className="close-button">
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/close-window.png" alt="close-window"/>
          </button>
      
      </div>
    </div>
  );
};

export default BookingModal;

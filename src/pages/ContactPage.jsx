import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const ContactPage = () => {
  const [showReturnFAQ, setShowReturnFAQ] = useState(false);
  const [showGeneralFAQ, setShowGeneralFAQ] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleReturnFAQ = () => {
    setShowReturnFAQ(!showReturnFAQ);
  };

  const toggleGeneralFAQ = () => {
    setShowGeneralFAQ(!showGeneralFAQ);
  };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí puedes manejar el envío del formulario, como enviarlo a una API o mostrar un mensaje de éxito.
//     console.log(formData);
//     alert('Formulario enviado correctamente.');
//   };

  return (
    <div style={{ padding: '20px' }}>
      <h2><FaBars /> FAQ</h2>

      {/* Sección de FAQ sobre Devoluciones */}
      <div>
        <h3 onClick={toggleReturnFAQ} style={{ cursor: 'pointer' }}>
          {showReturnFAQ ? '−' : '+'} Información sobre Devoluciones
        </h3>
        {showReturnFAQ && (
          <div>
            <p><strong>¿Cuál es el plazo para devolver un producto?</strong></p>
            <p>Tienes 30 días para devolver un producto desde la fecha de compra.</p>
            <p><strong>¿Cómo realizo una devolución?</strong></p>
            <p>Puedes realizar la devolución contactando a través del correo electrónico y solicitando una cancelación.</p>
            <p><strong>¿Cuánto tiempo tarda en procesarse la devolución?</strong></p>
            <p>El proceso de devolución puede tardar entre 5 y 7 días hábiles después de que recibamos el producto.</p>
          </div>
        )}
      </div>

      {/* Sección de FAQ General */}
      <div>
        <h3 onClick={toggleGeneralFAQ} style={{ cursor: 'pointer' }}>
          {showGeneralFAQ ? '−' : '+'} Preguntas Frecuentes
        </h3>
        {showGeneralFAQ && (
          <div>
            <p><strong>¿Dónde puedo encontrar mi número de producto pedido?</strong></p>
            <p>Tu número de pedido se encuentra en el correo de confirmación que recibiste después de realizar la compra.</p>
            <p><strong>¿Cómo puedo contactar con atención al cliente?</strong></p>
            <p>Puedes contactarnos a través del correo de contacto.</p>
            <p><strong>¿Ofrecen envíos internacionales?</strong></p>
            <p>No, por el momento no ofrecemos envíos internacionales. Las tarifas de envío y los tiempos de entrega varían según el destino <strong> solo dentro de España</strong>.</p>
          </div>
        )}
      </div>
{/* 
      {/* Formulario de Contacto 
      <div>
        <h3>Formulario de Contacto</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div> */}
    </div>
  );
};

export default ContactPage;

import React, { useState } from 'react';


const ContactPage = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
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
    <div className="container">
      <h2>Nuestras preguntas más frecuentes</h2>
      <div className="accordion">
        {/* Sección de FAQ sobre Devoluciones */}
        <div className="accordion-item">
          <button
            id="accordion-button-1"
            aria-expanded={expandedAccordion === 1}
            onClick={() => toggleAccordion(1)}
          >
            <span className="accordion-title">¿Cuál es el plazo para devolver un producto?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Tienes 10 días para devolver un producto desde la fecha de tu reserva.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button
            id="accordion-button-2"
            aria-expanded={expandedAccordion === 2}
            onClick={() => toggleAccordion(2)}
          >
            <span className="accordion-title">¿Cómo realizo una cancelación de reservas?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Puedes realizar la devolución contactando a través del correo electrónico y solicitando una cancelación.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button
            id="accordion-button-3"
            aria-expanded={expandedAccordion === 3}
            onClick={() => toggleAccordion(3)}
          >
            <span className="accordion-title">¿Cuánto tiempo tarda en procesarse la devolución?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>El proceso de devolución puede tardar varios días hábiles después de que cancelemos la reserva del producto.</p>
          </div>
        </div>

        {/* Sección de FAQ General */}
        <div className="accordion-item">
          <button
            id="accordion-button-4"
            aria-expanded={expandedAccordion === 4}
            onClick={() => toggleAccordion(4)}
          >
            <span className="accordion-title">¿Dónde puedo encontrar mi número de producto pedido?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Tu número de pedido(id de reserva) se encuentra en el correo de confirmación que recibiste después de realizar la compra.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button
            id="accordion-button-5"
            aria-expanded={expandedAccordion === 5}
            onClick={() => toggleAccordion(5)}
          >
            <span className="accordion-title">¿Cómo puedo contactar con atención al cliente?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Puedes contactarnos a través del  <a href="arisereservas@gmail.com">correo de contacto.</a></p>
          </div>
        </div>
        <div className="accordion-item">
          <button
            id="accordion-button-6"
            aria-expanded={expandedAccordion === 6}
            onClick={() => toggleAccordion(6)}
          >
            <span className="accordion-title">¿Ofrecen envíos internacionales?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>No, por el momento no ofrecemos envíos internacionales. Las tarifas de envío y los tiempos de entrega varían según el destino <strong> solo dentro de España</strong>.</p>
          </div>
        </div>
      </div>
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

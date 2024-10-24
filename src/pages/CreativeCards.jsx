import React from 'react';

const cardData = [
  {
    icon: "https://img.icons8.com/?size=100&id=aqjeRDmRBaNS&format=png&color=000000", // Ícono de FontAwesome para Variedad de Estilos
    title: "Variedad de Estilos",
    description: "Explora una amplia gama de estilos de moda para cada ocasión, todo en un solo lugar.",
    link: ""
  },
  {
    icon: "https://img.icons8.com/?size=100&id=KLp5VsoAO7O8&format=png&color=000000", // Ícono de FontAwesome para Materiales de Calidad
    title: "Envíos rápidos",
    description: "Envios nacionales gratuitos en 24h, recibiras tu pedido enseguida!.",
    link: ""
  },
  {
    icon: "https://img.icons8.com/?size=100&id=23171&format=png&color=000000", // Ícono de FontAwesome para Precios Competitivos
    title: "Precios Competitivos",
    description: "Encuentra las últimas tendencias de moda a precios que se ajustan a tu presupuesto.",
    link: ""
  }
];

const CreativeCards = () => {
  return (
    <section className="creative-cards style-one">
      {/* Título de la sección */}
      <div className="section-title">
        <h2>¿Por qué elegirnos?</h2>
      </div>


      <div className="container">
        <div className="row">
          {cardData.map((card, index) => (
            <div className="card-column" key={index}>
              <div className="card-details">
                <div className="card-icons">
                <img src={card.icon}></img>   
                </div>
                <h3><a href={card.link}>{card.title}</a></h3>
                <p>{card.description}</p>
                <a className="read-more-btn" href={card.link}>
                  <i className="fas fa-angle-right"></i> {/* Ícono de flecha */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeCards;

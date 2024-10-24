import React, { useEffect, useRef } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import banner7 from '../assets/img/banner_background7.png';

const Banner = () => {
  const contentRef = useRef(null);
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // Activa la animación cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (contentRef.current) observer.observe(contentRef.current);
    if (h2Ref.current) observer.observe(h2Ref.current);
    if (pRef.current) observer.observe(pRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (h2Ref.current) observer.unobserve(h2Ref.current);
      if (pRef.current) observer.unobserve(pRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section className="section banner banner-section">
      <div className="container banner-column">
        <div className="banner-inner">
          <div ref={contentRef} className="banner-inner-content fade-in">
            <h2 ref={h2Ref} className="heading-xl aparecer-derecha">
              Sé un guerrero con nuestra colección OVERSIZED
            </h2>
            <p ref={pRef} className="paragraph aparecer-izquierda">
              Descubre nuestra primera colección de ropa de alta calidad para mujeres y 
              hombres, hecha con los mejores materiales y al mejor precio.
            </p>
            <button ref={buttonRef} className="btn btn-darken btn-inline aparecer-arriba">
              Our Products <FaArrowAltCircleRight />
            </button>
          </div>
          <div ref={imageRef} className="banner-inner-image fade-in">
            <img src={banner7} className="banner7" alt="banner" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/arise.png';

const AdviceModal = () => {
  useEffect(() => {
    const modalElement = document.getElementById('adviceModal');
    
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      });

      return () => {
        modal.dispose();
      };
    }
  }, []);

  const closeAdviceModal = () => {
    const modalElement = document.getElementById('adviceModal');
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  return (
    <>
      <div className="modal fade" id="adviceModal" tabIndex="-1" aria-labelledby="adviceModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adviceModalLabel">Aviso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeAdviceModal}></button>
            </div>
            <div className="modal-body">
              <p>¡Esta página es una demostración! Para visitar la página oficial, haga clic en el botón de abajo.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeAdviceModal}>Cerrar</button>
              <Link to="https://arisetrend.com/" target="_blank" className="btn btn-primary">Visitar</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
       {/* Footer */}
       <footer className="footer">
      <div className="container footer-top">
        <div className="row">
          {/* Logo */}
          <div className="col-lg-3 col-md-12 footer-logo">
            <img src={logo} alt="Arise Logo" className="footer-logo-img" />
          </div>

          {/* Menu Sections */}
          <div className="col-lg-3 col-md-4 footer-menu">
            <h5>Dudas</h5>
            <ul>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
              <li><Link to="/shipping">Envíos</Link></li>
              <li><Link to="/returns">Devoluciones</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 footer-menu">
            <h5>Contacto</h5>
            <ul>
              <li><Link to="/contact">Contáctanos</Link></li>
              <li><Link to="/support">Soporte Técnico</Link></li>
              <li><Link to="/work-with-us">Trabaja con Nosotros</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 footer-menu">
            <h5>Empresa</h5>
            <ul>
              <li><Link to="/about">Acerca de Nosotros</Link></li>
              <li><Link to="/careers">Carreras</Link></li>
              <li><Link to="/terms">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>&copy; 2024 Arise. Todos los derechos reservados.</p>
            </div>
            <div className="col-md-6">
              <ul className="footer-social">
                <li><a href="https://www.tiktok.com/@arisetrend?_t=8otmsG28ffk&_r=1"><i className="fa-brands fa-tiktok"></i></a></li>
                <li><a href="https://www.instagram.com/arisetrend?igsh=MWphZm9tenlleWt0aA%3D%3D&utm_source=qr"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
      
    </> 
  );
};

export default AdviceModal;

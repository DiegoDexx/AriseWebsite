import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login'; // Asegúrate de importar el componente Login
import { getItem } from '../functions/localStorage'; // Importa una función para obtener el token almacenado

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
};

  useEffect(() => {
    // Verifica si hay un token de autenticación en el localStorage
    const authToken = getItem('auth_token');
    if (authToken) {
      setIsLogged(true); // Usuario está logueado
    } else {
      setIsLogged(false); // Usuario no está logueado
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      const fetchBookings = async () => {
        try {
          const bookingsResponse = await axios.get('https://arise-app-44ac74ba4283.herokuapp.com/api/bookings');
          setBookings(bookingsResponse.data);

          const productIds = Array.from(new Set(bookingsResponse.data.map(booking => booking.product_id)));
          const productsResponses = await Promise.all(productIds.map(id => axios.get(`https://arise-app-44ac74ba4283.herokuapp.com/api/bookings/${id}`)));

          const allProducts = productsResponses.map(response => response.data);
          setProducts(allProducts);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchBookings();
    }
  }, [isLogged]);

  const getMostSoldProduct = () => {
    const productCounts = {};

    bookings.forEach((booking) => {
      const { product_id } = booking;
      productCounts[product_id] = (productCounts[product_id] || 0) + 1;
    });

    const mostSoldProductId = Object.keys(productCounts).reduce((a, b) => (productCounts[a] > productCounts[b] ? a : b), null);
    const mostSoldProduct = products.find((product) => product.id === parseInt(mostSoldProductId));

    return mostSoldProduct ? mostSoldProduct.name : 'No data';
  };

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {};
  };

  if (!isLogged && isModalOpen) {
    return <Login onLoginSuccess={() => setIsLogged(true)} />;
  }
  

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5>Panel de Administración</h5>
            </div>
            <div className="card-body">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Email de Usuario</th>
                    <th>Número de Teléfono</th>
                    <th>Nombre cliente</th>
                    <th>Nombre de Producto</th>
                    <th>Talla</th>
                    <th>Cantidad</th>
                    <th>Monto pagado</th>
                    <th>Fecha de Reserva</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => {
                    const productDetails = getProductDetails(booking.product_id);
                    return (
                      <tr key={index}>
                        <td>{booking.user_email}</td>
                        <td>{booking.user_phone_number}</td>
                        <td>{booking.user_name}</td>
                        <td>{productDetails.name || 'N/A'}</td>
                        <td>{productDetails.size || 'N/A'}</td>
                        <td>{booking.cantidad || 'N/A'}</td>
                        <td>{booking.monto_pagado || 'N/A'}</td>
                        <td>{booking.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5>Estadísticas</h5>
            </div>
            <div className="card-body">
              <p><strong>Producto Más Vendido:</strong> {getMostSoldProduct()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Obtiene todas las reservas
        const bookingsResponse = await axios.get('http://localhost:8000/api/bookings');
        setBookings(bookingsResponse.data);

        // Crea un conjunto de product_id únicos a partir de las reservas
        const productIds = Array.from(new Set(bookingsResponse.data.map(booking => booking.product_id)));

        // Realiza múltiples solicitudes para obtener detalles de cada producto
        const productsResponses = await Promise.all(productIds.map(id => axios.get(`http://localhost:8000/api/products/${id}`)));

        // Combina los datos de los productos obtenidos
        const allProducts = productsResponses.map(response => response.data);
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookings();
  }, []);

  // Función para obtener el producto más vendido
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

  // Función para obtener los detalles del producto dado un ID
  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {};
  };

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

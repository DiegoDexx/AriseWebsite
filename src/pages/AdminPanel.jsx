import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login'; // Asegúrate de importar el componente Login
import { getItem, getTokenFromStorage } from '../functions/localStorage'; // Importa una función para obtener el token almacenado
import { DataGrid } from '@mui/x-data-grid'; // Importar DataGrid de Material-UI

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const authToken = getTokenFromStorage('auth_token');
    if (authToken) {
      setIsLogged(true); // Usuario está logueado
      // Configura el token de autenticación para todas las solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
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
          const productsResponses = await Promise.all(productIds.map(
            id => axios.get(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${id}`)
          ));

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

  // Definimos las columnas para DataGrid
  const columns = [
    { field: 'user_email', headerName: 'Email de Usuario', width: 200 },
    { field: 'user_phone_number', headerName: 'Número de Teléfono', width: 150 },
    { field: 'user_name', headerName: 'Nombre cliente', width: 150 },
    { field: 'product_name', headerName: 'Nombre de Producto', width: 200 },
    { field: 'size', headerName: 'Talla', width: 100 },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
    { field: 'monto_pagado', headerName: 'Monto pagado', width: 150 },
    { field: 'date', headerName: 'Fecha de Reserva', width: 150 }
  ];

  // Formateamos los datos para DataGrid
  const rows = bookings.map((booking, index) => {
    const productDetails = getProductDetails(booking.product_id);
    return {
      id: index, // Es importante asignar un ID único a cada fila
      user_email: booking.user_email,
      user_phone_number: booking.user_phone_number,
      user_name: booking.user_name,
      product_name: productDetails.name || 'N/A',
      size: productDetails.size || 'N/A',
      cantidad: booking.cantidad || 'N/A',
      monto_pagado: booking.monto_pagado || 'N/A',
      date: booking.date
    };
  });

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5>Panel de Administración</h5>
            </div>
            <div className="card-body" style={{ height: 400, width: '100%' }}>
              <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={10} 
                rowsPerPageOptions={[10, 20, 50]} 
                checkboxSelection 
                disableSelectionOnClick 
              />
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

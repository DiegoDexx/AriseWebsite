import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login'; // Asegúrate de importar el componente Login
import { getTokenFromStorage } from '../functions/localStorage'; // Importa una función para obtener el token almacenado
import { DataGrid } from '@mui/x-data-grid'; // Importar DataGrid de Material-UI

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Obtén todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get('https://arise-app-44ac74ba4283.herokuapp.com/api/products');
        setAllProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };

      fetchBookings();
    }
  }, [isLogged]);

  const handleMarkAsOutOfStock = async (productId) => {
    try {
      if (!productId) {
        console.error('Product ID is invalid');
        return;
      }
  
      // Primero obtén los datos actuales del producto
      const productResponse = await axios.get(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${productId}`);
      const productData = productResponse.data;
  
      // Luego, envía todos los campos requeridos, incluyendo el stock_state actualizado
      const response = await axios.put(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${productId}`, {
        ...productData,
        stock_state: 'agotado'
      });
  
      if (response.status === 200) {
        const updatedProducts = allProducts.map(product => 
          product.id === productId ? { ...product, stock_state: 'agotado' } : product
        );
        setAllProducts(updatedProducts);
        alert('Producto actualizado!');

        console.log('Producto marcado como agotado:', response.data);
      } else {
        console.error('Error actualizando el estado de stock:', response.data);
      }
    } catch (error) {
      console.error('Error actualizando el estado de stock:', error.response ? error.response.data : error.message);
    }
  };

  const handleMarkAsAvailable = async (productId) => {
    try {
      if (!productId) {
        console.error('Product ID is invalid');
        return;
      }
  
      // Primero obtén los datos actuales del producto
      const productResponse = await axios.get(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${productId}`);
      const productData = productResponse.data;
  
      // Luego, envía todos los campos requeridos, incluyendo el stock_state actualizado
      const response = await axios.put(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${productId}`, {
        ...productData,
        stock_state: 'disponible'
      });
  
      if (response.status === 200) {
        const updatedProducts = allProducts.map(product => 
          product.id === productId ? { ...product, stock_state: 'disponible' } : product
        );
        setAllProducts(updatedProducts);
        alert('Producto actualizado!');

        console.log('Producto marcado como disponible:', response.data);
      } else {
        console.error('Error actualizando el estado de stock:', response.data);
      }
    } catch (error) {
      console.error('Error actualizando el estado de stock:', error.response ? error.response.data : error.message);
    }
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
            <div className="card-body" style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={bookings.map((booking, index) => {
                  const productDetails = allProducts.find((product) => product.id === booking.product_id) || {};
                  return {
                    id: index,
                    user_email: booking.user_email,
                    user_phone_number: booking.user_phone_number,
                    user_name: booking.user_name,
                    product_name: productDetails.name || 'N/A',
                    size: productDetails.size || 'N/A',
                    cantidad: booking.cantidad || 'N/A',
                    monto_pagado: booking.monto_pagado || 'N/A',
                    date: booking.date
                  };
                })}
                columns={[
                  { field: 'user_email', headerName: 'Email de Usuario', width: 200 },
                  { field: 'user_phone_number', headerName: 'Número de Teléfono', width: 150 },
                  { field: 'user_name', headerName: 'Nombre cliente', width: 150 },
                  { field: 'product_name', headerName: 'Nombre de Producto', width: 200 },
                  { field: 'size', headerName: 'Talla', width: 100 },
                  { field: 'cantidad', headerName: 'Cantidad', width: 100 },
                  { field: 'monto_pagado', headerName: 'Monto pagado', width: 150 },
                  { field: 'date', headerName: 'Fecha de Reserva', width: 150 }
                ]}
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
              <h5>Gestión de Productos</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre de Producto</th>
                    <th>Talla</th>
                    <th>Estado de Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map(({ id, name, size, color, stock_state }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{size}</td>
             
                      <td>{stock_state}</td>
                      <td>
                        {stock_state === 'agotado' ? (
                          <button
                            className="btn btn-success"
                            onClick={() => handleMarkAsAvailable(id)}
                          >
                             Marcar disponible
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleMarkAsOutOfStock(id)}
                          >
                            Agotar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
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
              <p><strong>Producto Más Vendido:</strong> {/* Aquí puedes implementar la lógica para el producto más vendido */}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

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

  const getMostSoldProduct = () => {
    const productCounts = {};

    bookings.forEach((booking) => {
      const { product_id } = booking;
      productCounts[product_id] = (productCounts[product_id] || 0) + 1;
    });

    const mostSoldProductId = Object.keys(productCounts).reduce((a, b) => (productCounts[a] > productCounts[b] ? a : b), null);
    const mostSoldProduct = allProducts.find((product) => product.id === parseInt(mostSoldProductId));

    return mostSoldProduct ? mostSoldProduct.name : 'No data';
  };

  const handleMarkAsOutOfStock = async (productId) => {
    try {
      // Asegúrate de que el productId sea válido y esté en el formato correcto
      if (!productId) {
        console.error('Product ID is invalid');
        return;
      }
  
      const response = await axios.put(`https://arise-app-44ac74ba4283.herokuapp.com/api/products/${productId}`, {
        stock_state: 'agotado'
      });
  
      // Verifica si la respuesta indica éxito
      if (response.status === 200) {
        // Actualiza la lista de productos después de cambiar el estado
        const updatedProducts = allProducts.map(product => 
          product.id === productId ? { ...product, stock_state: 'agotado' } : product
        );
        setAllProducts(updatedProducts);
      } else {
        console.error('Error updating stock state:', response.data);
      }
    } catch (error) {
      // Maneja el error y muestra información útil
      console.error('Error updating stock state:', error.response ? error.response.data : error.message);
    }
  };
  

  // Organiza los productos por nombre y lista todas las tallas y colores
  const productDetails = allProducts.reduce((acc, product) => {
    const { id, name, size, color } = product;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push({ size, color, id });
    return acc;
  }, {});

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
        {Object.keys(productDetails).map(productName => (
          <div className="col" key={productName}>
            <div className="card">
              <div className="card-header">
                <h5>{productName}</h5>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Talla</th>
                      <th>Color</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetails[productName].map(({ size, color, id }, index) => (
                      <tr key={index}>
                        <td>{size}</td>
                        <td>{color}</td>
                        <td>
                          <button 
                            className="btn btn-danger" 
                            onClick={() => handleMarkAsOutOfStock(id)}
                          >
                            Agotar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
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

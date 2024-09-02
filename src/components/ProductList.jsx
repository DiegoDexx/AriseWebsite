import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../hooks/axiosMethods'; // Importa apiClient
import camiseta1 from '../assets/img/white (2).png';
import beige1 from '../assets/img/beige (2).png';
import { saveProductSelection } from '../functions/localStorage';
import { getDiscount } from '../functions/functions';

// Definición del porcentaje de descuento
const discountPercentage = 20;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    apiClient.get('/products') // Usa apiClient para realizar la solicitud
      .then(response => {
        const uniqueProducts = [];
        const seenColors = new Set();

        // console.log(response);

        // Guarda todos los productos en productData
        setProductData(response.data);

        // Filtra productos únicos por color
        response.data.forEach(product => {
          if (!seenColors.has(product.color)) {
            uniqueProducts.push(product);
            seenColors.add(product.color);
          }
        });

        // Establece productos únicos en products
        setProducts(uniqueProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId, color, price, description, stock) => {
    saveProductSelection({ productId, color, price, description, stock });
  };

  // Función para calcular el precio con descuento
  const calculateDiscount = (price, discountPercentage) => {
    return (price * (1 - discountPercentage / 100)).toFixed(2);
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <Link to={`/products/${product.id}`} key={index}>
          <div
            className="product-card"
            onClick={() => handleProductClick(product.id, product.color, product.price, product.description, product.stock_state)}
          >
            <img
              src={product.color === 'white' ? camiseta1 : beige1}
              alt={product.color === 'white' ? 'Camiseta Arise Blanca' : 'Camiseta Arise Beige'}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            
            <div className='price-container'>
              <p className="original-price">€{product.price}</p>
              {/* <p className="discounted-price">€{calculateDiscount(product.price, discountPercentage)}</p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;

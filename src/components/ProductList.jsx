import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../hooks/axiosMethods';
import portada1 from '../assets/img/banner_background4.png';
import portada2 from '../assets/img/banner_background6.png';
import banner7 from '../assets/img/banner_background7.png';

import camisetaBlanca from '../assets/img/camisetaBlanca.png';
import camisetaBeige from '../assets/img/camisetaBeige.png';


import { saveProductSelection } from '../functions/localStorage';
import { getDiscount } from '../functions/functions';

// Definición del porcentaje de descuento
const discountPercentage = 20;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    apiClient.get('/products')
      .then(response => {
        const uniqueProducts = [];
        const seenColors = new Set();

        setProductData(response.data);

        response.data.forEach(product => {
          if (!seenColors.has(product.color)) {
            uniqueProducts.push(product);
            seenColors.add(product.color);
          }
        });

        setProducts(uniqueProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const changeImageHover = (product) => {

  }

  const handleProductClick = (productId, color, price, description, stock) => {
    saveProductSelection({ productId, color, price, description, stock });
  };

  // Función para calcular el precio con descuento
  const calculateDiscount = (price, discountPercentage) => {
    return (price * (1 - discountPercentage / 100)).toFixed(2);
  };

  return (
    <>
      <h2 className='title'>NUESTROS PRODUCTOS AL MEJOR PRECIO: </h2>
      <div className="product-list">
        {products.map((product, index) => (
          <Link to={`/products/${product.id}`} key={index}>
            <div
              className="product-card"
              onClick={() => handleProductClick(product.id, product.color, product.price, product.description, product.stock_state)}
            >
              <img
                src={product.color === 'white' ? portada1 : portada2}
                alt={product.color === 'white' ? 'Camiseta Arise Blanca' : 'Camiseta Arise Beige'}
                className="product-image"
              />

              {/* Superposición que se mostrará al hacer hover */}
              <div className="product-overlay">
                <h2 className="product-name">{product.name}</h2>
                <div className='price-container'>
                  <p className="original-price">€{product.price}</p>
                  {/* {discountPercentage > 0 && (
                    <p className="discounted-price">€{calculateDiscount(product.price, discountPercentage)}</p>
                  )} */}
                </div>

                  {/* Botón de añadir al carrito */}
                  <button className="add-to-cart-button">Añadir al carrito</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import camiseta1 from '../assets/img/white (2).png';
import beige1 from '../assets/img/beige (2).png';
import { saveProductSelection } from '../functions/localStorage';
import { getDiscount } from '../functions/functions';


const discountPercentage = 20; // Porcentaje de descuento


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState(); // Corrige el nombre del estado

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        const uniqueProducts = [];
        const seenColors = new Set();

        console.log(response);

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
  const getDiscount = (price, discountPercentage) => {
    return (price * (1 - discountPercentage / 100)).toFixed(2);
  };

  // Ejemplo de uso del descuento (asegurarte de definir discountPercentage en tu código)
  const discountPercentage = 20;
  const discountedPrice = productData ? getDiscount(productData[0].price, discountPercentage) : null;


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
            <h2 className="product-name">{product.color === 'white' ? 'Camiseta Arise Blanca' : 'Camiseta Arise Beige'}</h2>
            
          <div className='price-container'>
            <p className="original-price">€{product.price}</p>
            <p className="discounted-price">€{discountedPrice}</p>
          </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;

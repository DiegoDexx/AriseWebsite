import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/bookingModal';
import apiClient from '../hooks/axiosMethods'; // Importa apiClient
import axios from 'axios';
import  SelectInfo  from '../components/SelectInfo';
import { getProductSelection, saveItem, getItem } from '../functions/localStorage';
import { getDiscount } from '../functions/functions';
import white1 from '../assets/img/white (1).png';
import white2 from '../assets/img/white (2).png';
import white3 from '../assets/img/white (3).png';
import white4 from '../assets/img/white (4).png';
import white5 from '../assets/img/white (5).png';
import beige1 from '../assets/img/beige (1).png';
import beige2 from '../assets/img/beige (2).png';
import beige3 from '../assets/img/beige (3).png';
import beige4 from '../assets/img/beige (4).png';
import beige5 from '../assets/img/beige (5).png';

const ProductPage = () => {
  const { productId } = useParams(); // Obtén el productId desde los parámetros de la URL
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('XS');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stockState, setStockState] = useState(''); // Estado del stock
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const whiteImages = [white1, white2, white3, white4, white5];
  const beigeImages = [beige1, beige2, beige3, beige4, beige5];

  useEffect(() => {
    // Obtener el producto de localStorage
    const productString = getProductSelection();

    // Verificar si productString está disponible y no es nulo
    if (productString) {
      // Convertir el JSON string a un objeto JavaScript
      const product = JSON.parse(productString);

      // Acceder a propiedades específicas del objeto
      if (product && product.productId) {
        console.log('fetching data with frontend with the id product...' + product.productId.productId);
        setSelectedProductId(product.productId.productId); // Usa el productId correcto
        setSelectedColor(product.productId.color);
        setSelectedDescription(product.productId.description || '');
        setSelectedPrice(product.productId.price || '');
        setStockState(product.productId.stock_state || ''); // Establecer el estado del stock
        setImages(product.productId.color === 'white' ? whiteImages : beigeImages);
        setCurrentIndex(0); // Reset carousel to first image

        // Llamada a la API para obtener los detalles del producto
        fetchProductDetails(product.productId.color, 'XS'); // Fetch details for the default size
      }
    }
  }, [productId]);

  //SETEO DE PRECIO 
  const originalPrice = selectedPrice; // Precio original
  const discountPercentage = 20; // Porcentaje de descuento
  const discountedPrice = getDiscount(originalPrice, discountPercentage);

  // Calcular el monto total a pagar
  const totalPrice = discountedPrice * quantity;

  const fetchProductDetails = (color, size) => {
    if (color && size) {
      apiClient
        .get(`/products/size/${size}/color/${color}`)
        .then((response) => {
          if (response.data.length > 0) {
            const productData = response.data[0];
            setSelectedProduct(productData);
            setSelectedProductId(productData.productId); // Asegúrate de actualizar el ID del producto aquí
            setSelectedPrice(productData.price);
            setSelectedDescription(productData.description);
            setStockState(productData.stock_state); // Establecer el estado del stock desde la respuesta
            // console.log('Detalles del producto:', productData);

            saveItem("id", productData.id);//guardar el id en localstorage
          }
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  };

  useEffect(() => {
    if (selectedColor) {
      fetchProductDetails(selectedColor, selectedSize);
    }
  }, [selectedColor, selectedSize]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setImages(color === 'white' ? whiteImages : beigeImages);
    setCurrentIndex(0); // Reset carousel to first image
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity > 0 ? newQuantity : 1); // Ensure quantity is at least 1
  };

  const handleReserve = () => {
    // Datos del producto
    let product_id = getItem("id"); //obtener id de local storage

    const productData = {
      productId: product_id, // Usa el ID real del producto
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    };

    // Verifica si selectedProductId está definido
    if (!product_id) {
      console.error('Error: selectedProductId is undefined');
      return;
    }

    //GUARADAMOS CIERTOS DATOS EN LOCAL STORAGE

    localStorage.setItem('selectedProduct', JSON.stringify(productData));

    // Verifica que el producto se guarda correctamente en localStorage
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    console.log('Producto guardado en localStorage: ', savedProduct);

    saveItem("monto", totalPrice.toFixed(2));
    saveItem("quantity", quantity);
    const montoPagado= getItem("monto");
    const cantidad= getItem("quantity");


    console.log(
      `Reserved ${cantidad} ${selectedColor} T-shirt(s) in size ${selectedSize} 
      with ID ${product_id} and you will pay ${montoPagado}`
    );
    setShowBookingModal(true);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Función para determinar el color y texto del estado del stock
  const renderStockState = () => {
    switch (stockState) {
      case 'disponible':
        return (
          <span style={{ color: 'green', padding: '5px' }}>En stock</span>
        );
      case 'Poco stock':
        return (
          <span style={{ color: 'yellow', padding: '5px' }}>Poco stock</span>
        );
      case 'agotado':
        return (
          <span style={{ color: 'red', padding: '5px' }}>Agotado</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-page">
      {showBookingModal && (
        <BookingModal setShowBookingModal={setShowBookingModal} />
      )}

      <div className="slider-container">
        <button onClick={prevImage} className="prev-button">
          ←
        </button>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="slide-image"
            />
          </div>
        ))}
        <button onClick={nextImage} className="next-button">
          →
        </button>
      </div>
      <div className="product-details">
        <h1>
          {selectedColor === 'white'
            ? 'Camiseta Arise Blanca'
            : 'Camiseta Arise Beige'}
        </h1>
        <div className="price-container">
          <span className="discounted-price">€{totalPrice.toFixed(2)}</span>
          <span className="original-price">€{originalPrice}</span>
        </div>
            {/*aqui iria el especificar dichos datos de tiempo de envio y entrega */}
             { <SelectInfo description={selectedDescription}></SelectInfo>}
    
        <div className="color-choose">
          <label htmlFor="color">Color:</label>
          <div>
            <input
              data-image="white"
              type="radio"
              id="white"
              name="color"
              value="white"
              checked={selectedColor === 'white'}
              onChange={() => handleColorChange('white')}
            />
            <label htmlFor="white" className="white-button">
              <span></span>
            </label>
          </div>
          <div>
            <input
              data-image="beige"
              type="radio"
              id="beige"
              name="color"
              value="beige"
              checked={selectedColor === 'beige'}
              onChange={() => handleColorChange('beige')}
            />
            <label htmlFor="beige" className="beige-button">
              <span></span>
            </label>
          </div>
        </div>
        <div className="size-selector">
          <label htmlFor="size">Talla:</label>
          <div className="button-group">
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                value="size"
                type="button"
                className={`size-button ${selectedSize === size ? 'active' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <a
            href="#"
            className="size-guide-link"
            onClick={(e) => {
              e.preventDefault();
              setShowSizeGuide(true);
            }}
          >
            Consulta las medidas
          </a>
          {showSizeGuide && (
            <div
              className="size-guide-modal"
              onClick={() => setShowSizeGuide(false)}
            >
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h4>Guía de Tallas</h4>
                <p>XS: Ancho 53cm, Largo 74cm</p>
                <p>S: Ancho 55cm, Largo 76cm</p>
                <p>M: Ancho 57cm, Largo 78cm</p>
                <p>L: Ancho 60cm, Largo 80cm</p>
                <p>XL: Ancho 65cm, Largo 82cm</p>
                <button
                  className="close-button"
                  onClick={() => setShowSizeGuide(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="quantity-selector">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
          />
          <div className="stock-state">{renderStockState()}</div>
        </div>
        <button className="reserve-button" onClick={handleReserve}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
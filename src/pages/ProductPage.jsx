import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/bookingModal';
import apiClient from '../hooks/axiosMethods';
import SelectInfo from '../components/SelectInfo';
import { getProductSelection, saveItem, getItem } from '../functions/localStorage';
import { getDiscount } from '../functions/functions';
import ProductSlider from '../components/ProductSilder';

const ProductPage = () => {
  const { productId } = useParams();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('XS');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stockState, setStockState] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);


  useEffect(() => {
    const productString = getProductSelection();
    if (productString) {
      const product = JSON.parse(productString);
      if (product && product.productId) {
        setSelectedProductId(product.productId.productId);
        setSelectedColor(product.productId.color);
        setSelectedDescription(product.productId.description || '');
        setSelectedPrice(product.productId.price || '');
        setStockState(product.productId.stock_state || '');
        fetchProductDetails(product.productId.color, 'XS');
      }
    }
  }, [productId]);

  const fetchProductDetails = (color, size) => {
    if (color && size) {
      apiClient
        .get(`/products/size/${size}/color/${color}`)
        .then((response) => {
          if (response.data.length > 0) {
            const productData = response.data[0];
            setSelectedProduct(productData);
            setSelectedProductId(productData.productId);
            setSelectedPrice(productData.price);
            setSelectedDescription(productData.description);
            setStockState(productData.stock_state);
            saveItem("id", productData.id);
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
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleReserve = () => {
    let product_id = getItem("id");
    const productData = {
      productId: product_id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    };
    if (!product_id) {
      console.error('Error: selectedProductId is undefined');
      return;
    }
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    saveItem("monto", totalPrice.toFixed(2));
    saveItem("quantity", quantity);
    setShowBookingModal(true);
  };

  const renderStockState = () => {
    switch (stockState) {
      case 'disponible':
        return <span style={{ color: 'green', padding: '5px' }}>En stock</span>;
      case 'Poco stock':
        return <span style={{ color: 'yellow', padding: '5px' }}>Poco stock</span>;
      case 'agotado':
        return <span style={{ color: 'red', padding: '5px' }}>Agotado</span>;
      default:
        return null;
    }
  };

  const originalPrice = selectedPrice;
  const discountPercentage = 20;
  const discountedPrice = getDiscount(originalPrice, discountPercentage);
  const totalPrice = discountedPrice * quantity;


  return (
    <div className="product-page">
      {showBookingModal && <BookingModal setShowBookingModal={setShowBookingModal} />}
      
      {/* Reemplaza el slider anterior con el nuevo componente */}
      <ProductSlider selectedColor={selectedColor} />
      
      <div className="product-details">
        <h1>
          {selectedColor === 'white'
            ? 'OVERSIZE FRESH WHITE'
            : 'OVERSIZE BUTTER  CREAM BEIGE'}
        </h1>
        <div className="price-container">
          <span className="discounted-price">€{totalPrice.toFixed(2)}</span>
          <span className="original-price">€{originalPrice}</span>
        </div>
        
        <div className="color-choose">
          <label htmlFor="color">Color:</label>
          <div className='row-colors'>
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
            min="1"
            step="1" // Ensures that only whole numbers are allowed
            value={quantity}
            onChange={handleQuantityChange}
          />
           <div className="stock-container">
          {renderStockState()}
        </div>

        </div>

       


           {/*aqui iria el especificar dichos datos de tiempo de envio y entrega */}
           { <SelectInfo description={selectedDescription}></SelectInfo>}
        <button className="reserve-button" onClick={handleReserve}>
          Reservar
        </button>

        </div>
      </div>

  );
};

export default ProductPage;

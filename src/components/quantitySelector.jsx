import React from 'react';

const QuantitySelector = ({ quantity, setQuantity, stockState }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value;
        
        if (newQuantity === '') {
            setQuantity(''); // Permitir limpiar el input
        } else {
            const numberQuantity = Number(newQuantity);
            if (!isNaN(numberQuantity) && numberQuantity >= 1) {
                setQuantity(numberQuantity);
            }
        }
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

    return (
        
        <div className="quantity-selector">
            <label htmlFor="quantity">Cantidad:</label>
            
            <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
            />
            <div className="stock-container">
                {renderStockState()}
            </div>
        </div>
    );
};

export default QuantitySelector;

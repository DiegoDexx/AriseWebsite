
export const getDiscount = (originalPrice, discountPercentage) => {
    return (originalPrice * (1 - discountPercentage / 100)).toFixed(2); // Precio descontado

}
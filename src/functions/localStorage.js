// Function to save an item in localStorage
export const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};
  
  // Function to get an item from localStorage

  // Function to remove an item from localStorage
  export const removeItem = (key) => {
    window.localStorage.removeItem(key);
  };
  
  // Function to save product selection in localStorage
  export const saveProductSelection = (productId, color, price, description) => {
    const productSelection = {
      productId,
      color,
      price,
      description,
    };
    // Save the product selection as a JSON string
    saveItem('selectedProduct', JSON.stringify(productSelection));
  };
  

  export const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  };
  
  // Function to get the saved product selection from localStorage
  export const getProductSelection = () => {
    try {
      // Recupera la cadena JSON desde localStorage
      const productSelectionString = localStorage.getItem('selectedProduct');
      // Verifica si existe y parsea la cadena JSON
      return productSelectionString ? JSON.parse(productSelectionString) : null;
    } catch (error) {
      console.error('Error al leer desde localStorage:', error);
      return null;
    }
  };

  export const getTokenFromStorage = ($token) => {
    return localStorage.getItem($token);
    }
  
  // Example usage:
  // saveProductSelection('123', 'white');
  // const selectedProduct = getProductSelection();
  // console.log(selectedProduct); // { productId: '123', color: 'white' }
  
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://arise-app-44ac74ba4283.herokuapp.com/api', // URL base de tu API
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes agregar más encabezados si los necesitas, como tokens de autenticación
  }
});

export default apiClient;

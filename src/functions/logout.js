//call logout route
import axios from 'axios';; 
import { getItem } from './localStorage.js';

export const logout = async () => {
  const token = getItem('auth_token'); 

  try {
    await axios.post('https://arise-app-44ac74ba4283.herokuapp.com/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Logout successful');
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

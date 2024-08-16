/**LOGIN COMPONENT */
import { saveItem } from '../functions/localStorage';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveItem } from '../functions/localStorage';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
      try {
        const response = await axios.post('https://arise-app-44ac74ba4283.herokuapp.com/api/login', { email, password });
  
        if (response.data.token) {
          const authToken = response.data.token;
          saveItem('authToken', authToken);
          onLoginSuccess();

          try {
            const userInfo = await getUserInfo(authToken);
            const userId = userInfo.userId;
            saveItem('userId', userId);
            login(authToken); // Pasa el token al contexto de autenticación
            onClose();
            const redirectUrl = response.data.redirect_url;
  
            COMPROBACIONES:
            // console.log('Token:', authToken);
            // console.log('User ID:', userId);
             console.log('User Info:', userInfo);
             console.log('Redirect URL:', redirectUrl);
  
            // Redirigir según la URL de redirección proporcionada por el backend
            
            window.location.href = redirectUrl;
          } catch (error) {
            console.error('Error obteniendo información del usuario:', error);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Error, credenciales incorrectas');
        } else {
          console.error('Error logging in:', error);
        }
      }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    return (
        <div className="modal-overlay">
             <style>
        {`
          .error-message {
            color: red;
            margin-top: 5px;
            font-size: 12px;
          }

          label {
            color: black;
            font-size: 12px;
          }

          .success-message {
            color: green;
            font-size: 16px;
          }

          .close-button {
            margin-top: 10px;
          }
        `}
      </style>
        <div className="modal-inner">
          <button className="close-button" onClick={() => console.log('Close modal')}>×</button>
          <div className="modal-top">
            <h4>Login</h4>
          </div>
          <div className="modal-content">
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit" className="btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
}


export default Login;
/**LOGIN COMPONENT */
import { saveItem } from '../functions/localStorage';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

import axios from 'axios';

const Login = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
      try {
        const response = await axios.post('https://arise-app-44ac74ba4283.herokuapp.com/api/login', 
          { email, password },
          { headers: { 'Content-Type': 'application/json',
                        'Accept': 'application/json'
           } }
        );
    
        if (response.data.access_token) {
          const authToken = response.data.access_token;
          saveItem('auth_token', authToken);
          console.log("token guardado: ",authToken);
          onLoginSuccess();
    
       
            login(authToken);
            const redirectUrl = response.data.redirect_url;
    
           console.log('Redirecting to:', redirectUrl);
           console.log('Login successful');
           ///login exitoso cerramos el modal y redirigimos a la pagina de admin
           onClose();
    
            window.location.href = redirectUrl;
          
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Error, credenciales incorrectas');
          } else if (error.response.status === 503) {
            setError('El servidor está temporalmente no disponible');
          } else {
            setError(`Error: ${error.response.status}`);
          }
        } else {
          setError('Error de red o del servidor');
        }
        console.error('Error logging in:', error);
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
              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
}


export default Login;
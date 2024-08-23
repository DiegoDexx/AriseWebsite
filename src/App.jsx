import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage.jsx';
import NavBar from './components/Navbar.jsx';
import { AuthProvider } from './contexts/AuthContext'; // Importar el AuthProvider
import AdminPanel from './pages/AdminPanel.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una operación de carga (como la carga de datos inicial)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Ajusta el tiempo de espera según sea necesario

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/reservas" />} />
              <Route path="/reservas" element={<Home />} />
              <Route path="products/:productId" element={<ProductPage />} />
              <Route path="adminpanel" element={<AdminPanel />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<h3>Not Found</h3>} />
            </Routes>
          </>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;

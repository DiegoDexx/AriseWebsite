import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage.jsx';
import TopPromotion from './components/TopPromotion.jsx';
import NavBar from './components/Navbar.jsx';
import { AuthProvider } from './contexts/AuthContext';
import AdminPanel from './pages/AdminPanel.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import AdviceModal from './components/AdviceModal.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx'; // Importa tu botón

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
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
            <AdviceModal />
            <ScrollToTopButton /> 
          </>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;

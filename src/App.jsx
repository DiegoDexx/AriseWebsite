import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage.jsx';
import './App.css';
import NavBar from './components/Navbar.jsx';
import { AuthProvider } from './contexts/AuthContext'; // Import the AuthProvider
import AdminPanel from './pages/AdminPanel.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  return (
  <AuthProvider>
    <Router basename="/reservas">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="adminpanel" element={<AdminPanel />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

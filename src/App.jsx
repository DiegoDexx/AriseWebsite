import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage.jsx';
import './App.css';
import NavBar from './components/Navbar.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

function App() {
  return (
    <Router basename="/reservas">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

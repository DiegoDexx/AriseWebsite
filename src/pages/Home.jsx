import React from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import CreativeCards from './CreativeCards';
import NavBar from '../components/Navbar';

function Home() {
  return (
    <div className="home">
      <header>
            {/**NAVBAR */}
       
      </header>
      
      <Banner />
      <ProductList />
      <CreativeCards />



    </div>
  );
}

export default Home;

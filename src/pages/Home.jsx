import React from 'react';
import Countdown from '../components/Countdown';
import ProductList from '../components/ProductList';
import NavBar from '../components/Navbar';

function Home() {
  return (
    <div className="home">
      <header>
            {/**NAVBAR */}
       
      </header>
      <Countdown days={10} />
      
      <ProductList />

    </div>
  );
}

export default Home;

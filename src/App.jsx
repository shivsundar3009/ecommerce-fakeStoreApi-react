import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeScreen, Products, Cart, Navbar, Footer } from './components';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;

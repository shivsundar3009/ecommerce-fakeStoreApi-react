import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeScreen, Products,ProductPage , Navbar , Footer} from './components';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <div className="main-content"> {/* Optional: Add your custom class for styling */}
        <Outlet />  {/* This renders the child components like HomeScreen or ProductPage */}
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>  {/* This will wrap all routes inside the layout */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
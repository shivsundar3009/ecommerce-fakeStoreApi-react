import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { HomeScreen, Products,ProductPage , Navbar , Footer} from './components';
import { Outlet } from 'react-router-dom';
import { lazy , Suspense } from 'react';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const Products = lazy(() => import('./components/Products'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

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
      <Suspense fallback={<div className='w-full h-screen bg-white text-black flex justify-center items-center text-xl font-semibold'>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>  {/* This will wrap all routes inside the layout */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
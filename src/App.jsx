import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useShop();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;

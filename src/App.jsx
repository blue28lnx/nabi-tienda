import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Products from './pages/Products';
import './index.css';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
        </Routes>
      </main>

      <Footer />
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;

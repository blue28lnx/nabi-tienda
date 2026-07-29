import { createContext, useContext, useState, useEffect } from 'react';
import productosData from '../data/productos.json';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nabi_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState('');

  const config = productosData.configuracion;
  const categorias = productosData.categorias;
  const productos = productosData.productos;
  const destacados = productosData.destacados.map(id => productos.find(p => p.id === id)).filter(Boolean);

  useEffect(() => {
    localStorage.setItem('nabi_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, {
        id: product.id,
        name: product.nombre,
        price: product.precio,
        image: product.imagenes?.[0] || '/img/logo.png',
        quantity: qty
      }];
    });
    showToast(`${product.nombre} x${qty} agregado`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const formatPrice = (n) => `$ ${Number(n).toLocaleString('es-AR')}`;

  const sendToWhatsApp = (withShipping) => {
    let msg = 'Hola Nabi! Quiero hacer el siguiente pedido:\n\n';
    cart.forEach(item => {
      msg += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    msg += `\nEnvío: ${withShipping ? 'Sí' : 'No'}`;
    msg += `\n*Total: ${formatPrice(cartTotal)}*`;
    const phone = config.whatsapp?.replace('+', '') || '541125981292';
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank');
    clearCart();
  };

  return (
    <StoreContext.Provider value={{
      config, categorias, productos, destacados,
      cart, cartCount, cartTotal,
      addToCart, updateQuantity, clearCart,
      formatPrice, sendToWhatsApp,
      toast
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

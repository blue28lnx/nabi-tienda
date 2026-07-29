import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export default function Slider() {
  const { destacados, addToCart, formatPrice } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, destacados.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [destacados.length]);

  const goTo = (i) => setCurrentIndex((i + destacados.length) % destacados.length);

  if (!destacados || destacados.length === 0) {
    return null;
  }

  return (
    <section className="slider-section">
      <h2 className="slider-title">Productos Destacados</h2>

      <div className="slider-container">
        <div 
          className="slider-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {destacados.map(product => (
            <div key={product.id} className="slider-item">
              <img 
                src={product.imagenes?.[0]} 
                alt={product.nombre}
                onError={(e) => e.target.src = '/img/logo.png'}
              />
              <h3>{product.nombre}</h3>
              <p className="price">{formatPrice(product.precio)}</p>
              <button 
                className="add-to-cart"
                onClick={() => addToCart(product, 1)}
              >
                <i className="fas fa-plus"></i> Agregar
              </button>
            </div>
          ))}
        </div>

        <button 
          className="slider-nav prev"
          onClick={() => goTo(currentIndex - 1)}
        >&lt;</button>
        <button 
          className="slider-nav next"
          onClick={() => goTo(currentIndex + 1)}
        >&gt;</button>
      </div>

      <div className="slider-dots">
        {destacados.map((_, i) => (
          <div 
            key={i}
            className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

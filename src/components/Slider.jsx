import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import SafeImage from './SafeImage';

export default function Slider() {
  const { destacados, addToCart, formatPrice } = useStore();

  if (!destacados || destacados.length === 0) {
    return null;
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Destacados</h2>
        <Link to="/productos" className="featured-link">
          Ver todos <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="featured-scroll">
        {destacados.map(product => (
          <article key={product.id} className="featured-card">
            <div className="featured-card-image">
              <SafeImage
                src={product.imagenes?.[0]}
                alt={product.nombre}
                loading="lazy"
              />
            </div>
            <div className="featured-card-body">
              <h3 className="featured-card-name">{product.nombre}</h3>
              <p className="featured-card-price">{formatPrice(product.precio)}</p>
              <button
                className="featured-card-btn"
                onClick={() => addToCart(product, 1)}
                aria-label={`Agregar ${product.nombre} al carrito`}
              >
                <i className="fas fa-plus" aria-hidden="true"></i>
                <span>Agregar</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

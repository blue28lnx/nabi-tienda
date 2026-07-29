import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

export default function Home({ onCartClick }) {
  const { productos } = useStore();
  const personalizados = productos.filter(p => p.categoria === 'all').slice(0, 4);

  return (
    <>
      {/* Promo banner */}
      <div className="promo-banner">
        <i className="fas fa-truck"></i> Envíos a todo el país · Hacemos tu producto personalizado como vos quieras
      </div>

      {/* Slider */}
      <Slider />

      {/* Productos personalizados preview */}
      <section className="products-section">
        <div className="section-title-wrap">
          <h2 className="section-title">Productos Personalizados</h2>
        </div>
        <div className="products-grid">
          {personalizados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/productos" className="cta-button">Ver todos los productos</Link>
        </div>
      </section>

      {/* About */}
      <section id="nosotros" className="about-section">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p>
          Nabi nació de la pasión por crear productos únicos que reflejen tu personalidad.
          Cada pieza es hecha con materiales de calidad y técnicas artesanales.
        </p>
      </section>

      {/* Contact */}
      <section id="contacto" className="contact-section">
        <h2 className="section-title">Contáctanos</h2>
        <p>¡Escríbenos por WhatsApp!</p>
        <a 
          href="https://wa.me/+541125981292" 
          className="cta-button whatsapp-btn"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i> WhatsApp
        </a>
      </section>
    </>
  );
}

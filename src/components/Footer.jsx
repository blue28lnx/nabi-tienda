import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { config } = useStore();
  const whatsappPhone = config.whatsapp?.replace('+', '') || '541125981292';
  const whatsappMessage = encodeURIComponent('¡Hola Nabi! Quiero hacer una consulta.');

  return (
    <footer>
      <div className="social-links">
        <a
          href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
          className="social-link whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactanos por WhatsApp"
          title="WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a
          href="https://www.instagram.com/nabi.subli/"
          className="social-link instagram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Seguinos en Instagram"
          title="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p>© 2025 Nabi. Productos personalizados con amor.</p>
    </footer>
  );
}

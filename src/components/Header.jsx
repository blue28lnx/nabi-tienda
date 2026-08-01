import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Header({ onCartClick }) {
  const { cartCount } = useStore();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <header>
        <Link to="/" className="logo-container">
          <div className="logo">
            <img src="/img/logo.png" alt="Nabi" />
          </div>
          <div className="logo-text">Nabi</div>
        </Link>

        <nav>
          <ul className={mobileOpen ? 'active' : ''}>
            <li><Link to="/" className={isActive('/')} onClick={() => setMobileOpen(false)}><i className="fas fa-home"></i> Inicio</Link></li>
            <li><Link to="/productos" className={isActive('/productos')} onClick={() => setMobileOpen(false)}><i className="fas fa-tags"></i> Productos</Link></li>

          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          <div className="cart-icon" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
    </>
  );
}

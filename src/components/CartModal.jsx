import { useStore } from '../context/StoreContext';
import { useState } from 'react';

export default function CartModal({ isOpen, onClose }) {
  const { cart, formatPrice, updateQuantity, sendToWhatsApp, cartTotal } = useStore();
  const [withShipping, setWithShipping] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={`cart-modal ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--dark-green)' }}><i className="fas fa-shopping-cart"></i> Carrito</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                </div>
                <div className="cart-item-qty">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}

            <div className="shipping-options">
              <label>¿Deseas envío?</label>
              <select
                value={withShipping ? 'si' : 'no'}
                onChange={(e) => setWithShipping(e.target.value === 'si')}
              >
                <option value="no">No — retiro a coordinar</option>
                <option value="si">Sí — a coordinar por WhatsApp</option>
              </select>
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Envío:</span>
                <span>{withShipping ? 'A coordinar' : 'No'}</span>
              </div>
              <div className="cart-summary-row total-row">
                <span>Total:</span>
                <span>
                  {withShipping
                    ? <><strong>{formatPrice(cartTotal)}</strong> <small>+ envío</small></>
                    : <strong>{formatPrice(cartTotal)}</strong>
                  }
                </span>
              </div>
            </div>

            <button 
              className="checkout-button"
              onClick={() => { sendToWhatsApp(withShipping); onClose(); }}
            >
              <i className="fas fa-check"></i> Finalizar compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}

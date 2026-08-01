import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import SafeImage from './SafeImage';

export default function ProductModal({ product, onClose }) {
  const { addToCart, formatPrice } = useStore();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="product-modal open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="product-modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>{product.nombre}</h3>
          <button className="close-product-modal" onClick={onClose}>&times;</button>
        </div>

        <div className="main-image">
          <SafeImage
            src={product.imagenes?.[selectedImage]}
            alt={product.nombre}
          />
        </div>

        {product.imagenes?.length > 1 && (
          <div className="gallery-thumbnails">
            {product.imagenes.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumbnail ${i === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <SafeImage src={img} alt="" />
              </div>
            ))}
          </div>
        )}

        <p className="product-description">{product.descripcion}</p>

        <div className="product-modal-price">{formatPrice(product.precio)}</div>

        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >-</button>
          <input
            type="number"
            className="quantity-input"
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <button
            className="quantity-btn"
            onClick={() => setQty(qty + 1)}
          >+</button>
        </div>

        <button className="add-to-cart-modal" onClick={handleAdd}>
          <i className="fas fa-shopping-cart"></i> Agregar al carrito
        </button>
      </div>
    </div>
  );
}

import { useStore } from '../context/StoreContext';
import SafeImage from './SafeImage';

export default function ProductCard({ product, onOpenModal }) {
  const { addToCart, formatPrice } = useStore();

  return (
    <div className="product-card">
      <div className="product-image" onClick={() => onOpenModal(product)}>
        <SafeImage
          src={product.imagenes?.[0]}
          alt={product.nombre}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.nombre}</h3>
        <p className="product-price-card">{formatPrice(product.precio)}</p>
        <button
          className="add-to-cart"
          onClick={() => addToCart(product, 1)}
        >
          <i className="fas fa-plus"></i> Agregar
        </button>
      </div>
    </div>
  );
}

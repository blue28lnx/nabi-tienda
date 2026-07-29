import { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Sidebar from '../components/Sidebar';

export default function Products({ initialCategory = 'all' }) {
  const { productos } = useStore();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'all' 
      ? productos 
      : productos.filter(p => p.categoria === activeCategory);
    
    if (searchTerm) {
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [productos, activeCategory, searchTerm]);

  return (
    <section className="products-section" style={{ minHeight: '100vh' }}>
      <div className="shop-layout">
        {/* Sidebar */}
        <Sidebar 
          activeCategory={activeCategory} 
          onCategoryChange={(cat) => { setActiveCategory(cat); setSearchTerm(''); }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <button 
              className="mobile-filter-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-filter"></i> Categorías
            </button>

            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <span className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <p>No se encontraron productos</p>
              <small>Probá con otra búsqueda o cambiá de categoría.</small>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}

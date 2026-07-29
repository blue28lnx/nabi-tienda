import { useStore } from '../context/StoreContext';

export default function Sidebar({ activeCategory, onCategoryChange, isOpen, onClose }) {
  const { categorias, productos } = useStore();

  return (
    <>
      {isOpen && <div className="shop-sidebar-overlay show" onClick={onClose} />}
      
      <aside className={`shop-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={onClose}>&times;</button>

        <h3>Categorías</h3>

        <ul>
          <li>
            <a 
              href="#" 
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onCategoryChange('all'); }}
            >
              <i className="fas fa-th"></i> Todos los productos
              <span className="count">{productos.length}</span>
            </a>
          </li>

          {categorias.map(cat => {
            const count = productos.filter(p => p.categoria === cat.id).length;
            return (
              <li key={cat.id}>
                <a 
                  href="#"
                  className={activeCategory === cat.id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); onCategoryChange(cat.id); }}
                >
                  <i className={`fas ${cat.icono || 'fa-tag'}`}></i> {cat.nombre}
                  <span className="count">{count}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

# Nabi · Catálogo Web

Catálogo online para el emprendimiento **Nabi**. Tienda de productos personalizados con carrito y checkout directo a WhatsApp.

> Remeras, stickers, mates, cuadros, tottebags y más — todo hecho a medida.

---

## ✨ Características

- 🛍️ **Catálogo con categorías y buscador**
- 🛒 **Carrito persistente** (se guarda en `localStorage` aunque cierres la pestaña)
- 💬 **Checkout directo a WhatsApp** con el pedido formateado
- 🌗 **Modo claro / oscuro** con detección y persistencia
- 📱 **Responsive** (probado en mobile y desktop)
- 🔍 **SEO + Open Graph** (se ve bien al compartir por WhatsApp / Instagram)
- ⚡ **Sin backend** — todo es estático, súper rápido de cargar

---

## 🧰 Stack técnico

- [React 19](https://react.dev)
- [Vite 8](https://vitejs.dev)
- [React Router 7](https://reactrouter.com)
- CSS con variables (tema claro/oscuro)
- [Font Awesome 6](https://fontawesome.com) vía CDN
- [Google Fonts](https://fonts.google.com) — `IM Fell DW Pica`

---

## 📁 Estructura del proyecto

```
nabi-react/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── img/                # Imágenes del logo y productos
│       ├── logo.png
│       └── productos/      # Una carpeta por producto
├── src/
│   ├── assets/             # Recursos importados en el bundle
│   ├── components/         # Componentes reutilizables
│   │   ├── CartModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Slider.jsx
│   │   └── Toast.jsx
│   ├── context/            # Estado global
│   │   ├── StoreContext.jsx    # Productos, carrito, totales
│   │   └── ThemeContext.jsx    # Modo claro/oscuro
│   ├── data/
│   │   └── productos.json  # ⭐ Toda la data del catálogo
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Products.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Estilos globales + variables de tema
├── index.html              # Meta tags, Open Graph, favicon
├── package.json
└── vite.config.js
```

---

## 🚀 Instalación y desarrollo

Necesitás [Node.js 18+](https://nodejs.org) y [pnpm](https://pnpm.io) (opcional, también funciona con `npm` o `yarn`).

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (http://localhost:5173)
pnpm dev

# Build de producción (genera la carpeta dist/)
pnpm build

# Preview del build local
pnpm preview

# Linter
pnpm lint
```

---

## ➕ Cómo agregar o editar productos

Toda la información vive en **`src/data/productos.json`**. Para agregar un producto nuevo:

```json
{
  "id": 18,
  "nombre": "Nombre del producto",
  "precio": 10000,
  "categoria": "personalizados",
  "descripcion": "Descripción que ve el cliente.",
  "imagenes": [
    "/img/productos/mi-carpeta/1.jpg",
    "/img/productos/mi-carpeta/2.jpg"
  ]
}
```

Después guardás las imágenes en `public/img/productos/mi-carpeta/`. La convención es usar `1.jpg`, `2.jpg`, etc. La primera imagen es la que se ve en la grilla y el slider.

### Categorías disponibles

| `id` | Significado |
| --- | --- |
| `personalizados` | Productos hechos a medida (remeras, mates, etc.) |
| `digitales` | Archivos digitales (editables, imprimibles) |

Para agregar una categoría nueva, sumala al array `categorias` del mismo JSON:

```json
{
  "id": "mi-categoria",
  "nombre": "Mi Categoría",
  "icono": "fa-tag",
  "descripcion": "Descripción corta"
}
```

(El `icono` es una clase de [Font Awesome](https://fontawesome.com/icons).)

### Productos destacados (slider del home)

En `productos.json`, el array `destacados` lleva los IDs que se muestran en el carrusel del inicio:

```json
"destacados": [1, 5, 3, 7, 11]
```

---

## ⚙️ Configuración general

También en `productos.json`, en la sección `configuracion`:

```json
"configuracion": {
  "moneda": "$",
  "whatsapp": "+541125981292",
  "nombre_tienda": "Nabi"
}
```

- `moneda` — Símbolo que aparece antes de los precios.
- `whatsapp` — Número al que llega el pedido. Usá formato internacional con `+`.
- `nombre_tienda` — Nombre de la marca.

---

## 🎨 Personalización visual

- **Colores**: variables en `src/index.css` (`:root` para tema claro, `[data-theme="dark"]` para oscuro). El color principal de la marca es `--dark-green: #006644`.
- **Tipografía**: `IM Fell DW Pica` se carga desde Google Fonts en `index.html`. Cambiala ahí y en `body { font-family: ... }` en `index.css`.
- **Logo**: `public/img/logo.png`. Se usa en el header, el favicon y los Open Graph tags.
- **Favicon**: `index.html` apunta a `/img/logo.png` por default.

---

## 🌐 Deploy

Después de `pnpm build` se genera la carpeta `dist/` con todo el sitio estático. Lo podés subir a:

- **[Netlify](https://app.netlify.com/drop)** — Arrastrá la carpeta `dist/` a la página, listo.
- **[Vercel](https://vercel.com)** — Conectá el repo de GitHub, detecta Vite solo.
- **GitHub Pages** — Agregá un workflow en `.github/workflows/deploy.yml`.
- **Hosting tradicional (FTP)** — Subí el contenido de `dist/` a tu `public_html/`.

> Si usás **Vercel o Netlify** con el repo, cada `git push` redeploya solo. Cero config.

---

## 🛠️ Scripts disponibles

| Script | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con HMR |
| `pnpm build` | Genera el sitio optimizado en `dist/` |
| `pnpm preview` | Sirve el `dist/` localmente para probar |
| `pnpm lint` | Corre Oxlint sobre el código |

---

## 📝 Pendientes / ideas a futuro

- [ ] Página de "Cómo pedir" / FAQ
- [ ] Sección de "Sobre Nosotros" más completa
- [ ] Productos digitales (descarga directa o link)
- [ ] Filtro por precio en `/productos`
- [ ] Productos relacionados en el modal
- [ ] Migrar a un backend (Firebase / Supabase) para gestionar productos sin tocar código

---

## 📄 Licencia

Privado · © 2025 Nabi

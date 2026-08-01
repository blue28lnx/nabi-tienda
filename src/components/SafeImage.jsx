import { useState } from 'react';

const FALLBACK = '/img/logo.png';

/**
 * <img> que cae al logo si la imagen original falla al cargar.
 * Usa useState (en vez de mutar el DOM) para evitar el loop infinito
 * que se produce cuando el fallback también falla.
 */
export default function SafeImage({ src, alt, ...rest }) {
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={!src || errored ? FALLBACK : src}
      alt={alt}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}

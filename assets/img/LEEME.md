# Imágenes de la página

Todas estas imágenes van **incrustadas** dentro de `index.html`, así la página funciona como un solo archivo: con doble clic, en la vista previa de la app o adjunta en un correo.

## Cómo cambiar una imagen

1. Reemplaza el archivo en esta carpeta con el **mismo nombre**: mismo formato (WebP) y misma proporción.
2. Desde la carpeta del proyecto, corre:

   ```bash
   py scripts/incrustar-imagenes.py
   ```

3. Revisa que `index.html` no pase de 500 KB (el script muestra el peso). La vista previa de la app no abre HTML de más de 512 KB.

Para una imagen nueva, agrega en `index.html` un `<img data-file="assets/img/nombre.webp" src="" alt="..." width="..." height="..." loading="lazy">` y corre el script.

## Qué imagen va dónde

| Archivo | Dónde va | Tamaño | Origen (detalle en `docs/fuentes-y-datos.md`) |
|---|---|---|---|
| `logo-eci.png` | Menú | 246 × 135 | Entregado por el usuario (6 oct. 2026) |
| `favicon.png` | Ícono de la pestaña | 64 × 64 | Símbolo recortado del logo |
| `portada-1200.webp` | Portada, desde 700 px | 1200 × 478 | Banner entregado por el usuario (7 oct. 2026), en `originales/portada-original.jpg` |
| `portada-movil-700.webp` | Portada, celular | 700 × 988 | Versión vertical armada con las piezas del mismo banner; el texto de microcertificaciones va más grande para que se lea |
| `testimonio-liseth.webp` | Testimonios, tarjeta 1 | 480 × 360 | Sitio oficial del programa |
| `testimonio-catalina.webp` | Testimonios, tarjeta 2 | 480 × 360 | Sitio oficial del programa |
| `testimonio-decana.webp` | Testimonios, tarjeta 3 | 480 × 360 | Sitio oficial del programa (foto de la decana) |
| `alfa.webp` | Vida estudiantil (ALFA) | 900 × 600 | Galería "ALFA en acción" del minisitio de ALFA |
| `noticia-ascolfa.webp` | Actualidad, noticia 1 | 640 × 360 | Noticia oficial de Ascolfa |
| `noticia-queretaro.webp` | Actualidad, noticia 2 | 640 × 360 | Noticia oficial de Querétaro |
| *(sin foto)* | Actualidad, noticia 3 (Enactus) | — | Lleva un recuadro de color (`.news-visual`). Las fotos de la noticia oficial no sirven: ver `docs/fuentes-y-datos.md` |
| `video-poster.webp` | Portada del video | 800 × 450 | Miniatura oficial del video en YouTube, sin el subtítulo |

Los archivos originales están en `originales/` (banner) y `originales/oficiales/` (fotos descargadas del sitio oficial el 10 oct. 2026).

## Pendiente

| Archivo sugerido | Dónde va | Tamaño | Foto ideal |
|---|---|---|---|
| `logo-eci.svg` | Menú | SVG | Logo oficial en vectores, para que se vea nítido |
| `noticia-enactus.webp` | Actualidad, noticia 3 | 640 × 360 | Foto propia del equipo Terraguard en la Enactus National Exposition 2026. Al tenerla, cambia el `.news-visual` de esa tarjeta por un `<img data-file="assets/img/noticia-enactus.webp" ...>` |
| `og-image.jpg` | Vista previa al compartir en redes | 1200 × 630 | Foto de portada con el nombre del programa |

## Reglas

- Solo fotos del usuario o del sitio oficial de la ECI, nunca de bancos de imágenes ni de otras webs.
- Cada foto debe corresponder a lo que dice su tarjeta (la persona del testimonio, la noticia correcta).
- Usa WebP: 80 KB como máximo por foto y 60 KB para la portada de celular.
- Cada `<img>` lleva `alt`, `width` y `height`. Todas llevan `loading="lazy"`, menos el logo y la portada.

# Landing page: Administración de Empresas, Escuela Colombiana de Ingeniería Julio Garavito

Claude Code lee este archivo al abrir la carpeta. Aquí están el objetivo, las reglas que no se pueden romper, el mapa del código y el punto en que quedó el trabajo.

## Qué es

Landing page de conversión del programa de Administración de Empresas de la ECI (Bogotá). Tiene un solo objetivo: que el visitante deje sus datos en el formulario para recibir información sobre cómo inscribirse.

- **Público principal:** estudiantes de grados 10 y 11 que están eligiendo carrera.
- **Público secundario:** padres de familia y personas que buscan transferencia u homologación.
- **Tono:** cercano y confiable, sin perder la seriedad institucional. Tutea al lector y usa frases cortas.
- **Encargo completo:** `docs/brief-original.md`.

## Archivos

| Ruta | Qué es |
|---|---|
| `index.html` | La página completa en un solo archivo: HTML, CSS, JS **e imágenes incrustadas** (data URI). Funciona con doble clic, en la vista previa de la app o adjunto en un correo |
| `assets/img/*.webp`, `logo-eci.png`, `favicon.png` | Las imágenes que se incrustan en `index.html`. Edítalas aquí, no dentro del HTML |
| `assets/img/originales/` | Archivos originales: el banner que entregó el usuario y las fotos descargadas del sitio oficial (`oficiales/`) |
| `assets/img/LEEME.md` | Qué imagen va dónde, tamaños y cómo cambiarlas |
| `scripts/incrustar-imagenes.py` | Mete las imágenes de `assets/img` dentro de `index.html`. Córrelo después de cambiar cualquier imagen |
| `scripts/verificar.mjs` | Pruebas automáticas con Playwright (opcionales, requieren Node) |
| `docs/pendientes.md` | Lo que falta, con el lugar del código donde se cambia |
| `docs/fuentes-y-datos.md` | Cada dato y cada foto con su fuente oficial |
| `docs/crm-highlevel.md` | Conexión del formulario con HighLevel: campos que se envían, cómo configurar el flujo y seguridad |
| `docs/brief-original.md` | El encargo original y las instrucciones posteriores del usuario |
| `docs/capturas/` | Capturas de página completa (celular y escritorio) |

## Reglas que no se rompen

1. **No inventes datos.** Cifras, logros, testimonios, nombres y fechas salen solo del usuario o de fuentes oficiales de la ECI (escuelaing.edu.co). Si falta un dato, escribe `[PENDIENTE]`. Registra cada dato nuevo en `docs/fuentes-y-datos.md` con su URL.
2. **Imágenes: solo del usuario o del sitio oficial de la ECI.** El 10 oct. 2026 el usuario autorizó usar las fotos que publica escuelaing.edu.co. No uses fotos de bancos de imágenes ni de otras webs. Registra cada foto en `docs/fuentes-y-datos.md`. Cada persona que aparece debe corresponder a lo que dice la tarjeta; el `alt` describe solo lo que se ve.
3. **Un solo archivo HTML** con CSS, JS e imágenes incluidos. Sin frameworks ni proceso de build: `scripts/incrustar-imagenes.py` es solo un ayudante opcional para actualizar las imágenes, y la página funciona sin correrlo.
4. **Peso máximo de `index.html`: 500 KB.** La vista previa de la app no muestra HTML de más de 512 KB. Hoy pesa unos 450 KB; antes de agregar una foto, comprime otra o baja su tamaño.
5. **Mobile-first.** Diseña desde 390 px de ancho. Sin scroll horizontal. El botón flotante de WhatsApp aparece solo en celular.
6. **Accesibilidad:** texto de 16 px (1rem) como mínimo en todo, contraste AA, `alt` en cada imagen, foco visible con contraste de 3:1 o más (anillo oscuro sobre fondos claros y dorado sobre fondos oscuros), que no quede tapado por el menú fijo ni por el botón fijo de celular (`scroll-padding` en `html`), `label` en cada campo y animaciones desactivadas con "reducir movimiento".
7. **SEO:** conserva `<title>`, `meta description` y un solo H1 con la frase exacta "Administración de Empresas en Bogotá".
8. **Para que no se sature:** una idea por sección, máximo 3 tarjetas por fila, bloques de texto de 2 o 3 líneas y botón "Solicita información" cada 2 o 3 secciones.
9. **Datos personales:** la casilla de autorización (Ley 1581 de 2012) es obligatoria, enlaza a la política oficial de la ECI y nunca viene marcada por defecto.

## Mapa de `index.html`

Busca estos textos para ubicarte; los números de línea cambian. Las líneas con `data:image/...;base64,` son las imágenes incrustadas: no las edites a mano.

- `IDENTIDAD VISUAL — PROVISIONAL`: variables de `:root` con colores y fuente. Si cambias `--primary` o `--accent`, cambia también:
  - `<meta name="theme-color">` en el `<head>`
  - el anillo de foco `rgba(122,31,43,.18)` (en `.field input:focus`) y las sombras `rgba(122,31,43,…)` de `.btn-primary`
  - los degradados `rgba(227,168,43,…)` (en `.video-poster`)
  - el `<link>` de Google Fonts, si cambias la fuente
- Secciones, en orden:
  1. `<header class="header">`: menú fijo (72 px) con el logo (`.brand-logo`), el texto "Administración de Empresas", 5 enlaces y el botón. Menú hamburguesa por debajo de 1100 px. El enlace de la sección que se está viendo se resalta (`aria-current`) y el menú toma sombra al bajar (`.is-scrolled`).
  2. `#inicio`: aviso de inscripciones y H1 (`.hero-copy`); subtítulo, botones y Saber Pro (`.hero-side`); y abajo el banner (`<picture class="hero-media">`): `portada-1200.webp` desde 700 px y `portada-movil-700.webp` (versión vertical, 700 × 988) en celular. Desde 900 px el texto va en dos columnas.
  3. `#porque`: 4 diferenciadores en cuadrícula de 2×2. En celular es un carrusel (ver `.carousel` abajo).
  4. `.facts`: franja de datos clave y botón.
  5. `#programa`: pestañas de plan de estudios (con selector de semestre), perfil del egresado y campo laboral.
  6. `#testimonios`: 3 tarjetas con foto (Liseth, Catalina y la decana) y botón. En celular es un carrusel. Las cuadrículas `.grid-3` (testimonios y noticias) usan 3 columnas desde 1200 px; de 700 a 1199 px usan 2 y la tercera tarjeta va centrada, para que las frases no pasen de 3 líneas.
  7. `#alfa`: agrupación de estudiantes ALFA (vida estudiantil), con foto. No está en el encargo: se agregó a pedido del usuario el 6 oct. 2026 (en los comentarios del código aparece como "6b"). No está en el menú, porque el encargo permite máximo 5 enlaces. No lleva enlace al minisitio de ALFA: el usuario pidió quitarlo el 26 oct. 2026.
  8. `#actualidad` (fondo `.alt`): 3 noticias en HTML (cada `<article class="card news">`; toda la tarjeta abre la noticia; en celular es un carrusel) y el video. Ascolfa y Querétaro llevan foto; Enactus lleva un recuadro de color (`.news-visual`) porque la noticia oficial no tiene una foto apropiada (ver "Decisiones").
  9. `#formulario`: formulario de contacto.
  10. `#preguntas`: 6 preguntas en acordeón (`<details>`).
  11. `<footer>`: contacto, dirección, redes y enlace al sitio oficial.
  - Al final del `<body>`: `#cta-bar` (botón fijo "Solicita información" en celular, aparece después de la portada y se oculta en el formulario) y `.wa-float` (WhatsApp, solo celular).
- `CONTENIDO EDITABLE`, en el `<script>` del final:
  - `VIDEO_ID`: ID del video de YouTube. Si lo cambias, cambia también en `#video-btn` el `href`, el `aria-label` y el título `<strong>` (el título del iframe se toma de ahí), y `assets/img/video-poster.webp`.
  - `PLAN`: plan de estudios por semestre, en pares `[nombre, créditos]`.
- `COMPORTAMIENTO`: menú móvil (se cierra con Esc o con cualquier enlace interno), **enlaces internos con desplazamiento suave por JavaScript** (ver "Decisiones"), sombra del menú, sección activa, botón fijo de celular, aparición suave de bloques (un bloque aparece de una vez si recibe el foco del teclado), pestañas, semestres, video y formulario. El celular acepta lo que se pegue con espacios, guiones o +57 y lo deja en 10 dígitos.
- `CONTENIDO EDITABLE` también tiene `WEBHOOK_URL` (webhook de entrada del flujo de HighLevel) y `FUENTE`.
- `// Formulario: validación accesible`: validación, `leadData()` (arma el JSON que va al CRM) y envío con `fetch` al webhook. Muestra "¡Listo!" solo si HighLevel responde bien; si no, muestra `#form-error`. Incluye un campo trampa contra bots (`#f-web`). Detalle en `docs/crm-highlevel.md`.

## Estado al 10 de octubre de 2026

**Listo:**

- Las 10 secciones del encargo y la sección extra de ALFA, con datos oficiales de escuelaing.edu.co.
- Todas las imágenes: logo, banner de portada, fotos de testimonios, ALFA, 2 de las 3 noticias, portada del video e ícono de pestaña.
- 10 oct. 2026: una revisión independiente (4 revisores y 4 verificadores con Edge real) encontró problemas de foco por teclado, contraste, alineación y contenido. Todos los confirmados se corrigieron y se volvieron a probar ese día: foco visible y sin tapar, bloques que aparecen al recibir el foco, botón de play redondo en celular, campos del formulario alineados, celular con +57, menú que se cierra, textos de máximo 3 líneas, texto de Ascolfa fiel a la fuente y la foto de Enactus cambiada por un recuadro.
- Los botones y el menú funcionan en los tres modos de abrir la página: vista previa de la app (`data:`), doble clic (`file:`) y servidor (`http:`). El 10 oct. 2026 se probó en Edge real con el protocolo DevTools, a 390 y 1366 px, en los tres modos y con "reducir movimiento". No hubo errores de JS. Funcionan los enlaces internos (la sección queda justo debajo del menú), el menú móvil, las pestañas, los semestres, el formulario, la sección activa, el botón fijo de celular, la carga de las 10 imágenes y el video. No hay scroll horizontal, todo el texto mide 16 px o más, hay un solo H1 y 6 preguntas.
- `npm run verificar` no se ha vuelto a correr desde el 2 oct. 2026 porque en este equipo no hay Node. Córrelo cuando haya Node.
- Capturas de `docs/capturas/` regeneradas el 10 oct. 2026 con Edge (página completa, 390 y 1366 px).

**Falta** (detalle en `docs/pendientes.md`):

- **Terminar la conexión con el CRM.** Desde el 19 oct. 2026 el formulario envía los datos al webhook de HighLevel; falta configurar el flujo (asignar campos, etiqueta, filtro, publicar) y hacer una prueba de punta a punta. Pasos en `docs/crm-highlevel.md`.
- Confirmar con el programa el permiso para usar las fotos y los testimonios del sitio oficial y el banner.
- Un tercer testimonio de estudiante o egresado; hoy la tercera tarjeta es la decana.
- Colores HEX y tipografía institucionales; versión SVG del logo.

## Decisiones tomadas

- **Enlaces internos por JavaScript (10 oct. 2026):** la vista previa de la app abre la página como `data:`, y ahí el navegador bloquea saltar a `#formulario` ("Not allowed to navigate top frame to data URL"), así que los botones no hacían nada. Ahora un solo manejador de clics desplaza a la sección con `scrollIntoView` (suave, o instantáneo con "reducir movimiento"), mueve el foco a la sección y, si se puede, actualiza la URL. Los enlaces siguen siendo `<a href="#...">`, así que sin JS también funcionan donde el navegador lo permite.
- **Imágenes incrustadas (10 oct. 2026):** con rutas relativas (`assets/img/...`), las imágenes no se veían en la vista previa ni al enviar solo el HTML. Por eso van como data URI dentro de `index.html`, y el archivo sigue siendo uno solo, como pide el encargo. El costo es que todo se descarga junto (unos 484 KB). Para publicar en un servidor con archivos separados, corre `py scripts/incrustar-imagenes.py --externo` y sube también `assets/img/`.
- **Video (10 oct. 2026):** es "Programa Administración de Empresas", del canal oficial de la Escuela en YouTube. La portada es la miniatura oficial, recortada para quitar el subtítulo. En un servidor (`http/https`), el iframe de `youtube-nocookie.com` se carga al hacer clic. Con doble clic o en la vista previa, YouTube no deja incrustar el video (error 153), así que el enlace lo abre en YouTube en otra pestaña.
- **Fotos del sitio oficial (10 oct. 2026):** el usuario eligió usar las fotos que ya publica escuelaing.edu.co, en vez de esperar fotos propias. Se descargaron, se recortaron y se pasaron a WebP.
- **Noticia de Enactus sin foto:** las dos fotos de la noticia oficial no sirven. Una es de la Expo de 2024 y muestra premios; la otra es del equipo ganador, Enerunity, no de Terraguard. Además, la noticia las acredita a cuentas externas (@enactuscolombia y @lasergiosm). Por eso la tarjeta usa un recuadro con los colores de la página y el texto "Enactus 2026". Si el programa entrega una foto propia del equipo Terraguard, cámbialo por un `<img data-file=...>`.
- **Animaciones:** aparición suave al bajar, que se apaga con "reducir movimiento" y en pruebas automáticas (`navigator.webdriver`) para que las capturas salgan completas. Además hay efectos cortos que se apagan con "reducir movimiento": la sombra del menú, la elevación de tarjetas y del video al pasar el cursor, la flecha del botón y el punto pulsante de "inscripciones abiertas".
- **Carruseles en celular (26 oct. 2026, pedido del usuario):** por debajo de 700 px, las tarjetas de `#porque`, `#testimonios` y `#actualidad` (`.carousel`) se muestran una a la vez y se desliza a la izquierda para ver la siguiente. Cada tarjeta ocupa el 86 % del ancho y se asoma el borde de la siguiente, para que se note que hay más. Abajo van puntos (`.carousel-dots`, creados por JS) que marcan la tarjeta actual y permiten saltar a otra. Usa `scroll-snap`, así que cada deslizamiento avanza una tarjeta. Desde 700 px (tableta y escritorio) no cambia nada: es la cuadrícula normal, sin puntos. En celular el carrusel tiene `role="region"` y `aria-label`; las tarjetas no esperan la animación de aparición.
- **Botón fijo en celular:** "Solicita información" fijo abajo, al lado del botón de WhatsApp. Aparece al pasar los botones de la portada y se oculta cuando el formulario está a la vista.
- **Testimonios (6 oct. 2026):** el sitio oficial publica solo 2 testimonios (una estudiante y una egresada). La tercera tarjeta usa la frase de la decana, de la sección "Presentación", hasta tener un tercer estudiante o egresado. Las frases se muestran en fragmentos literales con "[…]" en los cortes, para cumplir la regla de 2 o 3 líneas. Las completas están en `docs/fuentes-y-datos.md`.
- **Portada (7 oct. 2026):** el usuario entregó un banner horizontal de 1758 × 700 con texto dentro de la imagen. En celular ese texto quedaría de unos 8 px, así que para menos de 700 px se armó una versión vertical con las mismas piezas, sin cambiar ningún texto. Original en `assets/img/originales/portada-original.jpg`.
- **Nombre del enlace del logo:** sin `aria-label`. Su nombre accesible sale del `alt` del logo más el texto visible "Administración de Empresas" (WCAG 2.5.3).
- **Colores provisionales:** granate `#7A1F2B` y dorado `#E3A82B`, porque no llegaron los HEX institucionales.
- **Fuente provisional:** Plus Jakarta Sans (Google Fonts).
- **Campo de colegio:** se llama "Colegio o universidad de origen" para incluir a quien viene por transferencia.
- **Canonical:** `<link rel="canonical">` apunta a la página oficial del programa. Si la landing se publica en otra URL, decide si el canonical debe ser la propia landing.
- **CRM por webhook (19 oct. 2026):** el formulario envía a un webhook de entrada de HighLevel (la URL la dio el usuario), sin ningún token en la página. El webhook acepta CORS desde cualquier origen, así que el éxito se confirma con la respuesta real. Las pruebas automáticas interceptan el envío y nunca mandan datos reales.
- **Validación del formulario:** los errores se quitan mientras la persona escribe (evento `input`) y no al salir del campo, para evitar un salto de diseño al marcar la casilla de autorización.
- **Publicación:** la página no se publicó porque usa el nombre de la institución. Dónde se publica lo decide el equipo del programa.

## Cómo ver y probar

- **Ver:** abre `index.html` con doble clic, o haz clic en el archivo dentro de la app. Todo funciona igual, salvo el video, que se abre en YouTube.
- **Con el video dentro de la página:** doble clic en `ver-landing.bat`, que levanta el servidor local y abre http://localhost:8000. El enlace solo funciona mientras esa ventana esté abierta. O sirve la carpeta a mano:

  ```bash
  py -m http.server 8000
  ```

- **Después de cambiar una imagen** en `assets/img`:

  ```bash
  py scripts/incrustar-imagenes.py
  ```

- **Pruebas automáticas** (opcionales, requieren Node 18 o superior):

  ```bash
  npm install
  npx playwright install chromium
  npm run verificar
  ```

  Revisan scroll horizontal, tamaño de letra, H1 y SEO, máximo 3 tarjetas por fila, `alt` en imágenes, formulario, pestañas, semestres, preguntas frecuentes y WhatsApp solo en celular, y guardan capturas en `docs/capturas/`. Si ya tienes un Chromium instalado, puedes usar `CHROMIUM_PATH=/ruta/a/chrome npm run verificar`.
- **Después de cada cambio,** corre `npm run verificar` o revisa a mano a 390 px y a 1366 px.

## Fechas que vencen

- **Inscripciones 2027-1:** cierran el 4 de enero de 2027. El periodo aparece en `meta description`, `og:description`, el aviso de la portada, la lista junto al formulario y la pregunta frecuente de fechas. Busca `2027` para encontrar todas y actualízalas para 2027-2.
- **Noticias:** revísalas cada mes. Para cambiar una, edita su tarjeta en `#actualidad`, pon la foto en `assets/img/` y corre el script de imágenes.
- **Acreditación del programa:** Res. 010740 de 2023, por 4 años (hasta julio de 2027). Confirma la renovación antes de esa fecha.

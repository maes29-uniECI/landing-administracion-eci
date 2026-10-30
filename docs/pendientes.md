# Pendientes

Marca cada punto cuando quede listo. "Dónde" es el texto que debes buscar en `index.html`.

## Antes de publicar (bloquean)

- [x] **Conectar el formulario.** Desde el 19 oct. 2026 envía los datos al webhook de entrada de un flujo de HighLevel (`WEBHOOK_URL`). Muestra el éxito solo si HighLevel confirma, y si falla muestra un error con WhatsApp. Detalle en `docs/crm-highlevel.md`.
  - [ ] **Configurar el flujo en HighLevel:** capturar la muestra, asignar los campos al contacto, agregar la etiqueta y el filtro, y publicarlo (pasos en `docs/crm-highlevel.md`).
  - [ ] **Prueba de punta a punta:** enviar un formulario de prueba y comprobar que el contacto llegue completo al CRM.
  - [ ] Si llega spam: generar una URL nueva de webhook y considerar un captcha.
- [x] **Logo oficial.** En el menú, `assets/img/logo-eci.png` (PNG de 246 × 135 con fondo transparente, entregado por el usuario el 6 oct. 2026). Se muestra a 60 px de alto.
  - [ ] Pedir la versión SVG o un PNG más grande, para que se vea nítido en pantallas de alta densidad.
  - [ ] Pedir la versión del logo para fondo oscuro, si se quiere poner en el footer (el logo actual es negro y no se vería sobre `#1D1B1E`).
- [ ] **Colores HEX y tipografía institucionales.**
  - Dónde: `:root` (`--primary`, `--primary-dark`, `--primary-soft`, `--accent`, `--font`), `theme-color`, el anillo de foco `rgba(122,31,43,.18)` y las sombras `rgba(122,31,43,…)` de `.btn-primary`, los degradados `rgba(227,168,43,…)` (`.video-poster` y `.news-visual`) y el `<link>` de Google Fonts.
  - El anillo de foco usa `--primary-dark` sobre fondos claros y `--accent` sobre fondos oscuros (`.facts`, `.footer`, video). Si cambias los colores, comprueba que los dos sigan teniendo un contraste de 3:1 o más con su fondo.
  - Pista: el rojo que predomina en el logo es aproximadamente `#E34523`, medido en el PNG; no es un HEX oficial. Sobre blanco da un contraste de 4,09:1, que no llega al AA para texto normal (4,5:1). Sirve como acento, pero no como fondo de botones con texto blanco.
  - Después de cambiarlos, revisa el contraste AA.
- [x] **Testimonios.** Se usan los 2 testimonios publicados en la página oficial (Liseth Tatiana Amaya Mahecha y Catalina Tovar Parra) y la frase de la decana, con sus fotos oficiales.
  - [ ] Confirmar con el programa que los testimonios y las fotos se pueden usar en la landing.
  - [ ] **Tercer testimonio de estudiante o egresado.** El encargo pide 3 estudiantes o egresados; hoy la tercera tarjeta es la frase de la decana, como solución temporal. Pista: la nota oficial del 1 de julio de 2025 sobre la calidad del programa (F12) menciona egresados destacados.
- [x] **Perfil del egresado y campo laboral.** Se tomaron del perfil oficial que ahora publica la página del programa.
  - [ ] Los sectores siguen saliendo de la nota oficial de 2020; confirmarlos con el PEP 2026.
- [x] **Opciones de grado.** Resuelto: las "4" son 4 asignaturas de Proyecto Integrador 3, que se cursan por práctica profesional, trabajo dirigido o asignaturas coterminales.
- [ ] **Revisión legal** del texto de autorización de datos.

## Fotos (ver `assets/img/LEEME.md`)

- [x] Portada: banner de campaña entregado por el usuario (7 oct. 2026), con una versión vertical para celular.
  - [ ] Confirmar con el programa que el banner se puede usar en la landing y si existe una versión vertical oficial para celular.
- [x] 2 fotos de noticias (Ascolfa y Querétaro), 3 de testimonios, 1 de ALFA y la portada del video, tomadas del sitio oficial con autorización del usuario (10 oct. 2026).
  - [ ] Foto propia del equipo Terraguard para la noticia de Enactus. Hoy la tarjeta lleva un recuadro de color, porque las fotos de la noticia oficial son de 2024 o del equipo ganador, y están acreditadas a cuentas externas.
  - [ ] **Confirmar con el programa el permiso para usar las fotos del sitio oficial en la landing**, sobre todo las de personas (testimonios y ALFA).
- [x] Ícono de la pestaña (`favicon.png`, símbolo del logo).
- [ ] Imagen para compartir en redes (`og:image`, 1200 × 630).

## Antes de lanzar la campaña

- [ ] Confirmar las cuentas de redes del programa: Instagram `adminescuelaing` y Facebook `administracionempresasescuelaing`. LinkedIn, YouTube y X apuntan a las cuentas institucionales.
- [x] Video: `m_ZB0rafUD4` es "Programa Administración de Empresas", del canal oficial de la Escuela (confirmado el 10 oct. 2026).
- [ ] Decidir dónde se publica la página y ajustar `<link rel="canonical">`. Agregar `og:url` y `og:image`.
- [ ] Medición: GA4, Meta Pixel o Google Ads, con aviso de cookies.
- [ ] Guardar los parámetros UTM en campos ocultos del formulario para saber de qué campaña llega cada aspirante.

## Mantenimiento

- [ ] Actualizar las fechas de inscripción cada periodo (busca `2027`).
- [ ] Cambiar las noticias cada mes: edita las tarjetas `card news` en `#actualidad`, cambia `assets/img/noticia-*.webp` y corre `py scripts/incrustar-imagenes.py`.
- [ ] Correr `npm run verificar` cuando haya Node en el equipo (no se ha corrido desde el 2 oct. 2026).
- [ ] Confirmar la renovación de la acreditación del programa (vigente hasta julio de 2027).

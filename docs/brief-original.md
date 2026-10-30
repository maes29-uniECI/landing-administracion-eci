# Encargo original

Este es el encargo tal como lo escribió el usuario. Después se agregaron varias instrucciones, que aparecen al final en orden de fecha (2, 6, 7 y 10 de octubre de 2026). Cuando una instrucción posterior cambia algo del encargo, manda la más reciente.

---

Actúa como diseñador UX/UI y desarrollador front-end experto en landing pages de conversión para universidades.

**OBJETIVO**
Crea la landing page del programa de Administración de Empresas de la Escuela Colombiana de Ingeniería Julio Garavito (Bogotá). La meta es que el visitante deje sus datos en el formulario para recibir información sobre cómo inscribirse.

**PÚBLICO**
Principal: estudiantes de grados 10 y 11 que están eligiendo carrera.
Secundario: padres de familia y personas que buscan transferencia u homologación.

**TONO**
Cercano y confiable, sin perder la seriedad institucional. Tutea al lector y usa frases cortas.

**ESTRUCTURA (en este orden)**
1. Menú fijo: logo, máximo 5 enlaces que bajan a cada sección y botón "Solicita información".
2. Portada (hero): titular con un beneficio claro, subtítulo, foto o video corto y botón al formulario.
3. Por qué estudiar Administración en la ECI: 3 o 4 diferenciadores con ícono.
4. Datos clave en una franja: título, duración, modalidad, jornada y acreditación.
5. Plan de estudios, perfil del egresado y campo laboral, en pestañas o acordeón.
6. Testimonios: 3 estudiantes o egresados con foto.
7. Actualidad: 3 tarjetas de noticias o logros recientes (fáciles de actualizar) y un video.
8. Formulario: nombre, correo, celular, colegio, ciudad y casilla de autorización de tratamiento de datos (Ley 1581 de 2012).
9. Preguntas frecuentes: 5 o 6, en acordeón.
10. Pie de página: contacto, dirección, redes sociales y enlace al sitio oficial.

**PARA QUE NO SE SATURE**
- Una idea por sección, bastante espacio en blanco y máximo 3 tarjetas por fila.
- Bloques de texto de máximo 2 o 3 líneas.
- Repite el botón "Solicita información" cada 2 o 3 secciones y agrega un botón flotante de WhatsApp en celular.

**IDENTIDAD VISUAL**
- Colores institucionales: [códigos HEX]. Tipografía: [fuente].
- Usa el logo y las fotos que te adjunto. Donde falte una imagen, deja un espacio con la descripción de la foto ideal; no uses imágenes de otras webs.
- Estilo limpio y moderno, con patrones de navegación conocidos para que se sienta familiar.

**DATOS DEL PROGRAMA (usa solo estos, no inventes cifras ni logros)**
- Título, duración, modalidad y jornada: [ ]
- Código SNIES, registro calificado y acreditación: [ ]
- Diferenciadores del programa: [ ]
- Becas y financiación: [ ]
- Noticias y logros recientes: [ ]
- Testimonios (nombre, rol y frase): [ ]
- Enlace del video: [ ]
- WhatsApp, correo y dirección de admisiones: [ ]

Si falta algún dato, escribe [PENDIENTE] en vez de inventarlo.

**REQUISITOS TÉCNICOS**
- Un solo archivo HTML con el CSS y el JavaScript incluidos.
- Diseño pensado primero para celular (mobile-first) y responsive.
- Carga rápida: imágenes optimizadas y video con carga diferida.
- Accesible: buen contraste, texto alternativo en las imágenes y letra mínima de 16 px.
- SEO básico: title, meta description y un H1 que incluya "Administración de Empresas en Bogotá".

Antes de escribir el código, muéstrame la estructura con los textos principales para aprobarla.

---

## Instrucción posterior

> "Puedes hacerla con contenido que encuentres en internet."

Así se aplicó (estado al 2 oct. 2026; las instrucciones del 6, 7 y 10 de octubre lo cambiaron después):

- Los datos del programa se tomaron solo de fuentes oficiales de la ECI (ver `fuentes-y-datos.md`).
- Se mantuvo la regla de no inventar: lo que no se encontró quedó en `[PENDIENTE]`. Así quedaron los testimonios, las fotos, el logo, los colores y la tipografía.
- No se adjuntaron logo ni fotos, así que todas las imágenes son espacios con la descripción de la foto ideal.

## Instrucciones del 6 de octubre de 2026

1. El usuario indicó como fuente la página oficial del programa (https://www.escuelaing.edu.co/es/programas/administracion-de-empresas/). Con ella se completaron los testimonios, el perfil del egresado y el plan de estudios.
2. El usuario entregó el logo oficial (`assets/img/logo-eci.png`). Ya está en el menú.
3. > "Agrega la parte de la agrupación ALFA de la Escuela Colombiana de Ingeniería Julio Garavito (https://www.escuelaing.edu.co/es/minisitios/agrupacion-de-estudiantes-alfa/), como apartado de interés para los posibles estudiantes o aspirantes."

   Se agregó como la sección `#alfa`, entre Testimonios y Actualidad. No se puso en el menú, porque el encargo limita el menú a 5 enlaces.

## Instrucción del 7 de octubre de 2026

El usuario entregó un banner de campaña con la indicación "adecúa la portada". Se puso debajo del titular y los botones: completo desde 700 px y en una versión vertical para celular (ver "Decisiones tomadas" en `CLAUDE.md`).

## Instrucción del 10 de octubre de 2026

> "Los botones no funcionan y las imágenes y video no están. Necesito que sea más cómoda de interactuar y llamativa, sin perder la seriedad del desarrollo de la página web."

Así se aplicó:

- **Botones:** la vista previa de la app abre la página como `data:`, y ahí el navegador bloqueaba los enlaces internos. Ahora el desplazamiento se hace con JavaScript y funciona en cualquier modo.
- **Imágenes:** el usuario autorizó usar las fotos del sitio oficial (eligió "Usar las del sitio oficial"). Esto cambia la regla del encargo "no uses imágenes de otras webs" para las fotos de escuelaing.edu.co. Todas las imágenes van incrustadas en el HTML.
- **Video:** portada con la miniatura oficial. Se incrusta en un servidor; con doble clic o en la vista previa se abre en YouTube.
- **Interacción y diseño (10 oct.):** tarjetas con foto, sección activa resaltada en el menú, botón fijo "Solicita información" en celular, aparición suave de bloques y elevación de tarjetas al pasar el cursor. Todo respeta "reducir movimiento".

## Instrucción del 26 de octubre de 2026

> "Quita el enlace de ALFA estudiantes, solo el enlace, nada más. Y en la versión de celular, solo en la versión de celular, en el apartado de Por qué la ECI, Testimonios y Lo que está pasando, que aparezca uno, pero para ver el siguiente sea necesario deslizar a la izquierda. Lo demás de la página para celular déjalo igual. Haz estos cambios solo para la versión de celular, no para la landing de escritorio."

Así se aplicó:

- Se quitó el enlace "Conoce ALFA en el sitio oficial". La sección de ALFA sigue igual.
- Por debajo de 700 px, esas tres secciones son carruseles: una tarjeta a la vez, se desliza a la izquierda y abajo hay puntos de posición. En tableta y escritorio no cambió nada.

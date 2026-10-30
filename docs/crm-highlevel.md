# Conexión del formulario con HighLevel (CRM)

El formulario de la landing (`#lead-form`) envía cada aspirante a un **webhook de entrada (Inbound Webhook)** de un flujo de HighLevel. El flujo crea o actualiza el contacto en el CRM.

- **URL del webhook:** constante `WEBHOOK_URL` en el `<script>` de `index.html` (sección `CONTENIDO EDITABLE`).
- **Conectado el:** 19 oct. 2026.
- **CORS:** se probó que el webhook acepta envíos desde el navegador desde cualquier origen, incluso `file:` y `data:`. Por eso funciona con doble clic, en la vista previa de la app y publicado.

## Qué se envía

`POST` con `Content-Type: application/json`:

| Campo | Ejemplo | De dónde sale |
|---|---|---|
| `first_name` | `Ana` | Primera palabra del nombre |
| `last_name` | `María Pérez Gómez` | El resto del nombre |
| `full_name` | `Ana María Pérez Gómez` | Nombre completo |
| `email` | `ana@correo.com` | Correo, en minúsculas |
| `phone` | `+573001234567` | Celular con indicativo de Colombia |
| `colegio_o_universidad` | `Colegio X` | Campo "Colegio o universidad de origen" |
| `ciudad` | `Bogotá` | Campo "Ciudad" |
| `programa` | `Administración de Empresas` | Campo oculto `programa` |
| `fuente` | `Landing Administración de Empresas` | Constante `FUENTE` |
| `autorizacion_datos` | `Sí` | Casilla de autorización (obligatoria) |
| `autorizacion_fecha` | `2026-10-19T14:53:53.969Z` | Fecha y hora UTC en que se envió con la autorización |
| `autorizacion_texto` | `Autorizo a la Escuela…` | Texto exacto que aceptó la persona |
| `politica_datos_url` | `https://www.escuelaing.edu.co/documents/613/…pdf` | Enlace a la política que aceptó |
| `pagina` | `https://…/index.html` | Página desde donde se envió (o "archivo local") |
| `fecha_envio` | `2026-10-19T14:53:53.969Z` | Fecha y hora UTC del envío |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` | `instagram`, `social`, `admisiones-2027-1` | Solo si vienen en la URL de la campaña |

Para que llegue la campaña, comparte la landing con UTM, por ejemplo: `…/index.html?utm_source=instagram&utm_medium=social&utm_campaign=admisiones-2027-1`.

## Cómo se comporta el formulario

- Valida los campos antes de enviar y no envía nada si falta algo.
- Mientras envía, el botón dice "Enviando…" y no se puede volver a pulsar (evita duplicados).
- **El mensaje "¡Listo!" solo aparece si HighLevel responde que recibió los datos.**
- Si falla la conexión o HighLevel responde con error, aparece un mensaje con la opción de escribir por WhatsApp. Los datos escritos se conservan para reintentar.
- Si se demora más de 15 segundos, se toma como error.
- Tiene un campo trampa oculto contra bots (`sitio_web`). Si viene lleno, no se envía nada.

## Qué configurar en el flujo de HighLevel

1. Abre el flujo que tiene este webhook (**Automatización → Flujos de trabajo**).
2. **Captura una muestra:** abre la landing en http://localhost:8000, envía el formulario una vez con datos de prueba y, en el disparador "Inbound Webhook", usa la opción para traer las solicitudes de muestra ("Fetch Sample Requests"). Elige la que acaba de llegar y guarda el disparador. Así HighLevel conoce los campos de arriba.
3. **Crea o actualiza el contacto:** agrega la acción para crear o actualizar el contacto y asigna cada campo con los valores del webhook:
   - Nombre ← `first_name`, Apellido ← `last_name`, Correo ← `email`, Teléfono ← `phone`, Ciudad ← `ciudad`, Fuente ← `fuente`.
   - Crea campos personalizados para `colegio_o_universidad`, `programa`, `autorizacion_datos`, `autorizacion_fecha` y las `utm_*`, y asígnalos.
4. **Recomendado:** agrega la etiqueta `landing-administracion` y, si usan embudo, crea la oportunidad en la etapa "Nuevo aspirante".
5. **Filtro contra basura:** agrega una condición para seguir solo si `autorizacion_datos` es "Sí" y `email` contiene "@".
6. **Publica el flujo:** guárdalo y actívalo. Si el flujo está en borrador, el webhook no crea contactos.
7. **Prueba de punta a punta:** envía el formulario otra vez y comprueba que el contacto aparezca en **Contactos** con todos sus campos. Luego borra el contacto de prueba.

## Seguridad y datos personales

- La URL del webhook queda visible en el código de la página: así funcionan los formularios de páginas estáticas. Cualquiera que la vea podría enviar datos falsos al flujo. Por eso conviene el filtro del paso 5. Si llega spam, cambia el disparador del flujo para generar una URL nueva, pégala en `WEBHOOK_URL` y considera un captcha.
- No pongas tokens ni claves de HighLevel (Private Integration Token, API key) en `index.html`: quedarían públicos. Para este formulario basta el webhook.
- Los datos de las personas viajan a HighLevel, que actúa como encargado del tratamiento. El texto de autorización enlaza a la política de la Escuela; su revisión legal sigue pendiente (ver `pendientes.md`).
- Las pruebas automáticas (`scripts/verificar.mjs`) interceptan el envío y nunca mandan datos reales al CRM.

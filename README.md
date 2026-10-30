# Landing: Administración de Empresas, ECI

Página para captar aspirantes al programa de Administración de Empresas de la Escuela Colombiana de Ingeniería Julio Garavito (Bogotá).

## Ver la página

Para verla en http://localhost:8000, con el video dentro de la página, haz doble clic en `ver-landing.bat`. Abre el navegador y deja una ventana negra abierta; mientras esa ventana siga abierta, el enlace funciona.

También puedes abrir `index.html` con doble clic. Es un solo archivo con todo incluido (estilos, código e imágenes), así que también se ve bien en la vista previa de la app o si lo envías por correo. Con doble clic, el video se abre en YouTube; para verlo dentro de la página, sigue "Cómo ver y probar" en `CLAUDE.md`.

Si cambias una imagen en `assets/img`, corre `py scripts/incrustar-imagenes.py` para meterla en `index.html`.

## Seguir en Claude Code

1. Descomprime esta carpeta donde vayas a trabajar, por ejemplo en Documentos.
2. Abre la carpeta en Claude Code:
   - En la app de escritorio: elige esta carpeta como carpeta de trabajo.
   - En la terminal: `cd landing-administracion-eci` y luego `claude`.
3. Claude Code lee `CLAUDE.md` solo y queda con todo el contexto: objetivo, reglas, mapa del código y pendientes.

Para empezar, puedes pedirle:

- "Lee docs/pendientes.md y dime por dónde empezamos."
- "Cambia los colores institucionales a #______ y #______ y revisa el contraste."
- "Puse las fotos en assets/img. Ponlas en la página."
- "Conecta el formulario a [HubSpot / Google Sheets / nuestro CRM]."
- "Corre las pruebas y muéstrame las capturas."

## Qué hay en la carpeta

```
landing-administracion-eci/
├── CLAUDE.md              Contexto e instrucciones para Claude Code
├── README.md              Esta guía
├── index.html             La página (HTML, CSS y JS en un solo archivo)
├── package.json           Solo para las pruebas automáticas (opcional)
├── assets/img/            Imágenes que se incrustan en index.html (logo, portada, fotos)
│   ├── originales/        Banner original y fotos descargadas del sitio oficial
│   └── LEEME.md           Qué imagen va dónde y cómo cambiarla
├── docs/
│   ├── pendientes.md      Lo que falta para publicar
│   ├── fuentes-y-datos.md Cada dato con su fuente oficial
│   ├── brief-original.md  El encargo original y las instrucciones posteriores
│   └── capturas/          Cómo se ve en celular y escritorio (se regeneran con las pruebas)
└── scripts/
    ├── incrustar-imagenes.py  Mete las imágenes de assets/img en index.html
    └── verificar.mjs          Pruebas automáticas
```

## Importante antes de publicar

El formulario envía los datos a un **webhook de HighLevel (CRM)**. Antes de publicar, configura y publica el flujo en HighLevel y haz una prueba de punta a punta. Los pasos están en `docs/crm-highlevel.md` y el resto de pendientes en `docs/pendientes.md`.

// Pruebas automáticas de la landing, en celular (390 px) y escritorio (1366 px).
//
// Uso:
//   npm install
//   npx playwright install chromium
//   npm run verificar
//
// Opcional: CHROMIUM_PATH=/ruta/a/chrome npm run verificar  (usa un Chromium ya instalado)
//
// Guarda capturas de página completa en docs/capturas/ y termina con código 1 si algo falla.

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const paginaUrl = pathToFileURL(path.join(raiz, 'index.html')).href;
const carpetaCapturas = path.join(raiz, 'docs', 'capturas');
fs.mkdirSync(carpetaCapturas, { recursive: true });

const resultados = [];
const revisar = (nombre, pasa, detalle = '') => resultados.push({ nombre, pasa: Boolean(pasa), detalle });

const navegador = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);

const vistas = [
  { nombre: 'movil', etiqueta: 'Celular', width: 390, height: 844 },
  { nombre: 'escritorio', etiqueta: 'Escritorio', width: 1366, height: 900 },
];

for (const vista of vistas) {
  const pagina = await navegador.newPage({
    viewport: { width: vista.width, height: vista.height },
    reducedMotion: 'reduce',
  });

  // Nunca enviar datos reales al CRM: el envío (POST) y su verificación previa (OPTIONS)
  // se responden aquí con un éxito simulado, con los encabezados CORS que da HighLevel.
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST' };
  await pagina.route('**/*', (ruta) => {
    const metodo = ruta.request().method();
    if (metodo === 'OPTIONS') return ruta.fulfill({ status: 204, headers: cors });
    if (metodo === 'POST') return ruta.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: '{"status":"Success: test request received"}' });
    return ruta.continue();
  });

  const erroresJS = [];
  pagina.on('pageerror', (e) => erroresJS.push(e.message));
  await pagina.goto(paginaUrl);
  await pagina.waitForTimeout(500);
  const v = `[${vista.etiqueta}]`;

  revisar(`${v} Sin errores de JavaScript`, erroresJS.length === 0, erroresJS.join(' | '));

  const anchoDocumento = await pagina.evaluate(() => document.documentElement.scrollWidth);
  revisar(`${v} Sin scroll horizontal`, anchoDocumento <= vista.width, `ancho del documento: ${anchoDocumento} px`);

  const textoPequeno = await pagina.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed')
      .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
      .map((el) => ({ px: parseFloat(getComputedStyle(el).fontSize), texto: el.textContent.trim().slice(0, 40) }))
      .filter((x) => x.px < 16)
  );
  revisar(
    `${v} Todo el texto mide 16 px o más`,
    textoPequeno.length === 0,
    textoPequeno.slice(0, 5).map((x) => `${x.px}px "${x.texto}"`).join(' | ')
  );

  const maxTarjetasPorFila = await pagina.evaluate(() =>
    Math.max(
      0,
      ...[...document.querySelectorAll('.grid')].map((grid) => {
        const filas = {};
        // Solo cuentan las tarjetas que se ven en pantalla (en celular, los carruseles esconden las demás a la derecha)
        [...grid.children].filter((hijo) => {
          const r = hijo.getBoundingClientRect();
          return r.right > 0 && r.left < document.documentElement.clientWidth;
        }).forEach((hijo) => {
          const top = Math.round(hijo.getBoundingClientRect().top);
          filas[top] = (filas[top] || 0) + 1;
        });
        return Math.max(0, ...Object.values(filas));
      })
    )
  );
  revisar(`${v} Máximo 3 tarjetas por fila`, maxTarjetasPorFila <= 3, `máximo encontrado: ${maxTarjetasPorFila}`);

  const imagenesSinAlt = await pagina.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
  revisar(`${v} Todas las imágenes tienen alt`, imagenesSinAlt === 0, `${imagenesSinAlt} sin alt`);

  const whatsappVisible = await pagina.isVisible('.wa-float');
  revisar(
    `${v} Botón flotante de WhatsApp ${vista.nombre === 'movil' ? 'visible' : 'oculto'}`,
    vista.nombre === 'movil' ? whatsappVisible : !whatsappVisible
  );

  await pagina.screenshot({ path: path.join(carpetaCapturas, `${vista.nombre}.png`), fullPage: true });

  if (vista.nombre === 'movil') {
    // SEO
    const titulo = await pagina.title();
    const descripcion = (await pagina.getAttribute('meta[name="description"]', 'content')) || '';
    const h1s = await pagina.$$eval('h1', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
    revisar('SEO: <title> presente', titulo.length > 10, titulo);
    revisar('SEO: meta description presente (50 a 160 caracteres)', descripcion.length >= 50 && descripcion.length <= 160, `${descripcion.length} caracteres`);
    revisar('SEO: un solo H1', h1s.length === 1, `${h1s.length} H1`);
    revisar('SEO: el H1 incluye "Administración de Empresas en Bogotá"', (h1s[0] || '').includes('Administración de Empresas en Bogotá'), h1s[0]);

    // Llamados a la acción
    const enlacesAlFormulario = await pagina.$$eval('a[href="#formulario"]', (a) => a.length);
    revisar('Botón "Solicita información" repetido (4 o más enlaces al formulario)', enlacesAlFormulario >= 4, `${enlacesAlFormulario} enlaces`);

    // Menú móvil
    await pagina.click('.menu-btn');
    revisar('Menú móvil se abre', await pagina.isVisible('#menu-movil'));
    await pagina.click('#menu-movil a[href="#programa"]');
    revisar('Menú móvil se cierra al elegir un enlace', !(await pagina.isVisible('#menu-movil')));

    // Pestañas y semestres
    for (const id of ['plan', 'perfil', 'campo']) {
      await pagina.click(`#tab-${id}`);
      revisar(`Pestaña "${id}" muestra su panel`, await pagina.isVisible(`#panel-${id}`));
    }
    await pagina.click('#tab-plan');
    await pagina.click('.sem[data-s="5"]');
    revisar('Selector de semestre cambia el plan', (await pagina.textContent('#sem-title')).includes('Semestre 5'));

    // Preguntas frecuentes
    const preguntas = await pagina.$$eval('.faq details', (d) => d.length);
    revisar('Preguntas frecuentes: 5 o 6', preguntas >= 5 && preguntas <= 6, `${preguntas} preguntas`);

    // Formulario
    await pagina.click('#lead-form button[type=submit]');
    const marcados = await pagina.$$eval('#lead-form [aria-invalid="true"]', (e) => e.length);
    revisar('Formulario vacío marca los 6 campos obligatorios', marcados === 6, `${marcados} marcados`);
    await pagina.fill('#f-nombre', 'Ana Pérez');
    await pagina.fill('#f-correo', 'ana@correo.com');
    await pagina.fill('#f-celular', '3001234567');
    await pagina.fill('#f-colegio', 'Colegio de prueba');
    await pagina.fill('#f-ciudad', 'Bogotá');
    await pagina.check('#f-datos');
    await pagina.click('#lead-form button[type=submit]');
    await pagina.waitForTimeout(300);
    revisar('Formulario válido muestra el mensaje de éxito', await pagina.isVisible('#form-success'));
  }

  await pagina.close();
}

await navegador.close();

// Resumen
const fallas = resultados.filter((r) => !r.pasa);
for (const r of resultados) {
  console.log(`${r.pasa ? '✔' : '✘'} ${r.nombre}${!r.pasa && r.detalle ? `  →  ${r.detalle}` : ''}`);
}
console.log(`\n${resultados.length - fallas.length} de ${resultados.length} pruebas pasaron.`);
console.log(`Capturas guardadas en ${path.relative(raiz, carpetaCapturas)}/`);
process.exit(fallas.length ? 1 : 0);

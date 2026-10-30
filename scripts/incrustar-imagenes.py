"""Incrusta las imágenes de assets/img dentro de index.html.

Cada <img>, <source> o <link> (ícono) que tenga data-file="assets/img/..." recibe
su imagen como data URI (en src, srcset o href). Así index.html funciona solo: con doble clic,
en la vista previa de Claude o adjunto en un correo.

Uso (desde la carpeta del proyecto):
    py scripts/incrustar-imagenes.py            # incrusta las imágenes
    py scripts/incrustar-imagenes.py --externo  # usa las rutas a los archivos
                                                # (para publicar en un servidor)

Corre el script de nuevo cada vez que cambies una imagen en assets/img.
Solo usa la biblioteca estándar de Python.
"""
import base64
import mimetypes
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
HTML = RAIZ / "index.html"
EXTERNO = "--externo" in sys.argv

mimetypes.add_type("image/webp", ".webp")
ETIQUETA = re.compile(r'<(img|source|link)\b[^>]*\bdata-file="([^"]+)"[^>]*>', re.S)
ATRIBUTO = {"img": "src", "source": "srcset", "link": "href"}


def valor(ruta):
    if EXTERNO:
        return ruta
    archivo = RAIZ / ruta
    tipo = mimetypes.guess_type(archivo.name)[0] or "application/octet-stream"
    datos = base64.b64encode(archivo.read_bytes()).decode("ascii")
    return f"data:{tipo};base64,{datos}"


def reemplazar(m):
    etiqueta, ruta = m.group(0), m.group(2)
    attr = ATRIBUTO[m.group(1)]
    nuevo = f'{attr}="{valor(ruta)}"'
    patron = re.compile(rf'\b{attr}="[^"]*"')
    if patron.search(etiqueta):
        return patron.sub(lambda _: nuevo, etiqueta, count=1)
    return etiqueta.replace(f'data-file="{ruta}"', f'data-file="{ruta}" {nuevo}', 1)


texto = HTML.read_text(encoding="utf-8")
nuevo, n = ETIQUETA.subn(reemplazar, texto)
HTML.write_text(nuevo, encoding="utf-8")
modo = "rutas externas" if EXTERNO else "imágenes incrustadas"
print(f"{n} imágenes actualizadas ({modo}). index.html pesa {HTML.stat().st_size / 1024:.0f} KB.")

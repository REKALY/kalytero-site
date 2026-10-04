# kalytero.site

Página principal del grupo **Kalytero**: restaurante, café, hotel y minimarket.
Sitio estático (HTML + CSS + JS, sin dependencias ni build) publicado con
GitHub Pages y dominio personalizado `kalytero.site`.

## Estructura

```
index.html            Portada (una sola página con anclas)
404.html              Página de error (GitHub Pages la usa automáticamente)
CNAME                 Dominio personalizado -> kalytero.site
robots.txt            Indexación + referencia al sitemap
sitemap.xml           Sitemap de una sola URL
assets/css/style.css  Estilos (paleta, tipografía, grid, responsive)
assets/js/main.js     Header, menú móvil, revelado al scroll, nav activa
assets/img…           Imágenes optimizadas (webp + jpg de respaldo + og.jpg)
```

## Diseño

- Estética de estudio de arquitectura: mucho aire, hairlines de 1 px, tipografía
  serif editorial (`Instrument Serif`) sobre sans neutra (`Inter`).
- Paleta: hueso `#f4f0e8`, tinta `#16130f`, arcilla `#a8502a`, arena `#d9cbb4`.
- Imágenes generadas con WaveSpeed (`wavespeed-ai/z-image/turbo`) en webp/jpg.
- Accesibilidad: `lang="es"`, skip-link, `alt` en todas las imágenes, foco
  visible y soporte de `prefers-reduced-motion`.

## Editar contenido

Todo el texto está directamente en `index.html`. Los puntos marcados con
`TODO` en el HTML son los que faltan por confirmar:

- dirección real (sección Contacto);
- perfiles reales de Instagram / Facebook.

## Subdominios de los negocios

La portada ya enlaza a:

| Negocio    | Subdominio                    |
| ---------- | ----------------------------- |
| Restaurante | https://restaurante.kalytero.site |
| Café        | https://cafe.kalytero.site        |
| Hotel       | https://hotel.kalytero.site       |
| Minimarket  | https://minimarket.kalytero.site  |

Cada enlace lleva una etiqueta `Próximamente`. Cuando el subdominio esté
publicado, basta con quitar el `<span class="pill">Próximamente</span>`
correspondiente (y el `<small>Próximamente</small>` del footer).

Para cada subdominio en GitHub Pages: crear un repositorio nuevo, activar Pages
y configurar en el DNS del dominio un registro `CNAME` para el subdominio
apuntando a `<usuario>.github.io`, más el `CNAME` dentro del repositorio.

## Publicar cambios

```bash
git add -A
git commit -m "…"
git push origin main
```

GitHub Pages reconstruye el sitio automáticamente en un minuto.

## Desarrollo local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

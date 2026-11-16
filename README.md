# Portafolio — José Ramírez

Portafolio personal y CV. Estudiante de Ingeniería de Software en la Universidad de Cartagena.

Incluye **NeuroFisk** funcionando en vivo dentro de la página (carpeta `neurofisk/`, build de la PWA).

## Estructura

| Archivo | Qué es |
| --- | --- |
| `data.js` | **Todos los datos** (nombre, estudios, lenguajes, proyectos, contacto). Para actualizar la página, edita solo este archivo. |
| `index.html` | Estructura de la página |
| `styles.css` | Diseño (incluye la versión imprimible del CV) |
| `script.js` | Rellena la página con `data.js` y las interacciones |
| `particles.js` | Fondo de partículas 3D (port sin React de Magic UI *Floating 3D Particles*) |
| `neurofisk/` | App NeuroFisk compilada (`vite build` con `BASE_PATH=./`) |

## Ver en local

Hay que servirla con un servidor (abrir `index.html` con doble clic no carga la app de NeuroFisk):

```bash
npx http-server -p 8080
```

## CV en PDF

Botón **CV ↓** en la página → Guardar como PDF.

## Actualizar NeuroFisk

Desde la carpeta del proyecto NeuroFisk:

```bash
BASE_PATH=./ npx vite build --outDir ../portfolio/neurofisk --emptyOutDir
```

## Despliegue

Sitio estático en Vercel, sin paso de build.

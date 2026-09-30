# Seguimiento comercial / CRM

Tablero kanban de leads para que no se enfríen las oportunidades. Complementa lo que ya se enseña en 6.3.

## Cómo se trabaja este proyecto

Se construye en 3 etapas. No saltees etapas: cada una reutiliza lo que ya viste funcionar.

### Etapa 1 — Demo local (lista)

Archivos en la raíz: `index.html` + `style.css` + `script.js`

Cómo correrlo:

1. Abrí `index.html` en el navegador, o
2. Usá Live Server en VS Code / Cursor sobre esta carpeta.

Qué vas a ver:

- Tablero kanban: Nuevo → Contactado → Interesado → Esperando respuesta → Cerrado / Perdido
- Tarjetas de leads mock
- Arrastre entre columnas con JS puro (HTML Drag and Drop)
- ABM de leads (alta, edición y baja). Se guarda en el navegador.

Los datos son un array hardcodeado en `script.js`. Cero instalación.

### Etapa 2 — Herramienta real (pendiente)

React (Vite) + Express + PostgreSQL.

- Tabla `leads` (contacto, origen, etapa, última interacción, score)
- Lógica de scoring simple basada en reglas (urgencia, presupuesto mencionado, etc.)

### Etapa 3 — WhatsApp (pendiente)

Evolution API dispara el mensaje de seguimiento cuando un lead lleva X días sin respuesta, y actualiza la etapa del pipeline según lo que el cliente conteste.

## Estructura

```
05-CRM/
  README.md
  index.html
  style.css
  script.js
```

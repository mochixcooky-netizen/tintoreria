# Presupuestos

Formulario que arma un presupuesto imprimible a partir de producto, cantidades, materiales y mano de obra.

## Cómo se trabaja este proyecto

Se construye en 3 etapas. No saltees etapas: cada una reutiliza lo que ya viste funcionar.

### Etapa 1 — Demo local (lista)

Archivos en la raíz: `index.html` + `style.css` + `script.js`

Cómo correrlo:

1. Abrí `index.html` en el navegador, o
2. Usá Live Server en VS Code / Cursor sobre esta carpeta.

Qué vas a ver:

- Formulario (producto/servicio, cantidad, materiales, mano de obra)
- Cálculo del total al instante con JS puro
- Vista de presupuesto lista para imprimir
- ABM de presupuestos: guardar, editar y borrar el historial

No hay backend ni base de datos. Cero instalación.

### Etapa 2 — Herramienta real (pendiente)

React (Vite) + Express + PostgreSQL.

- Catálogo de precios y materiales
- Historial de presupuestos por cliente
- PDF descargable

### Etapa 3 — WhatsApp (pendiente)

El cliente pide el presupuesto por WhatsApp respondiendo preguntas guiadas (Kapso o Evolution API) y recibe el PDF automáticamente en el mismo chat.

## Estructura

```
04-Presupuestos/
  README.md
  index.html
  style.css
  script.js
```

# Módulo 6 — 7 soluciones en 3 etapas

Las 7 soluciones se enseñan con el mismo patrón. El alumno aprende el esqueleto una vez y después lo adapta al negocio.

**Sistema unificado:** abrí `demo/index.html`. Ahí están los 7 módulos juntos, con un menú y datos compartidos (una venta de stock suma un ingreso, un presupuesto crea el lead en CRM, etc.).

| # | Proyecto | Carpeta |
|---|----------|---------|
| 1 | Financiero | `01-Financiero` |
| 2 | Cobranza | `02-Cobranza` |
| 3 | Stock | `03-Stock` |
| 4 | Presupuestos | `04-Presupuestos` |
| 5 | CRM | `05-CRM` |
| 6 | Coordinador de Tareas | `06-Coordinador-de-Tareas` |
| 7 | Postventa | `07-Postventa` |

## Cómo se trabaja cada proyecto

El detalle de cada solución está en el `README.md` de su carpeta. El patrón es siempre el mismo:

1. **Etapa 1** — HTML + CSS + JS local, datos mock. Abrís `index.html` en la raíz de cada carpeta y ya funciona.
2. **Etapa 2** — React + Express + PostgreSQL, deploy en Railway.
3. **Etapa 3** — WhatsApp con Evolution API y/o Kapso.

Orden sugerido para construir y enseñar: Financiero → CRM → Postventa → Cobranza y Stock → el resto.

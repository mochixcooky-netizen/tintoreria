const HOY = new Date("2026-09-14T12:00:00");
const HOY_ISO = "2026-09-14";
const KEY = "tintoreria-demo-v1";
const PALETA = ["#203E7F", "#EF7A1E", "#6F86B8", "#F6A862", "#2E9E5B", "#D64545", "#1B356B", "#B8550E"];
const NAVY = "#203E7F";
const ORANGE = "#EF7A1E";
const CATEGORIAS = ["Químicos y solventes", "Perchas y bolsas", "Etiquetas y tickets", "Repuestos y mantenimiento", "Venta al público"];
// Categoría de Financiero donde cae una compra a proveedor, según la categoría del insumo en Stock.
const CAT_COMPRA = {
  "Químicos y solventes": "Químicos y solventes",
  "Perchas y bolsas": "Perchas, bolsas y etiquetas",
  "Etiquetas y tickets": "Perchas, bolsas y etiquetas",
  "Repuestos y mantenimiento": "Mantenimiento y repuestos",
  "Venta al público": "Químicos y solventes",
};
const CAT_VENTA_STOCK = "Venta de productos";
const CATS_INGRESO = ["Prendas (tintorería)", "Kilo / canasto", "Piezas voluminosas", "Prendas especiales", "Express", "Delivery", "Abonos B2B", "Venta de productos"];
const CATS_EGRESO = [
  "Sueldos y cargas", "Alquiler", "Servicios (luz, gas, agua)", "Químicos y solventes", "Mantenimiento y repuestos",
  "Perchas, bolsas y etiquetas", "Impuestos y tasas", "Comisiones de cobro", "Delivery y fletes",
  "Residuos y habilitaciones", "Publicidad", "Software", "Reclamos por daños", "Amortización de equipos",
];
const MOTIVOS_IN = ["Compra a proveedor", "Ajuste de inventario", "Devolución"];
const MOTIVOS_OUT = ["Venta", "Uso en producción", "Merma / vencido", "Ajuste de inventario"];
const CRM_ETAPAS = [
  { id: "nuevo", nombre: "Nuevo" },
  { id: "contactado", nombre: "Contactado" },
  { id: "interesado", nombre: "Interesado" },
  { id: "esperando", nombre: "Esperando respuesta" },
  { id: "cerrado", nombre: "Cerrado / Perdido" },
];
const TAR_COLS = [
  { id: "todo", nombre: "Por hacer" },
  { id: "doing", nombre: "En proceso" },
  { id: "done", nombre: "Hecho" },
];
const TITULOS = {
  inicio: ["Inicio", "Tintorería y lavadero · las 7 soluciones en un solo sistema"],
  financiero: ["Financiero", "Ingresos, egresos y balance del mes"],
  cobranza: ["Cobranza", "Saldos, señas y cuentas corrientes de empresas"],
  stock: ["Stock", "Insumos, perchas, químicos y productos de venta"],
  presupuestos: ["Presupuestos", "Cálculo al instante · se envía al CRM"],
  crm: ["CRM", "Pipeline comercial · arrastrá las tarjetas"],
  tareas: ["Tareas", "Tablero de la planta · arrastrá entre columnas"],
  postventa: ["Postventa", "Reseña a los pocos días · reactivación después"],
};

const SEED = {
  movimientos: [
    { id: "m1", fecha: "2026-09-01", tipo: "ingreso", categoria: "Abonos B2B", descripcion: "Abono mensual Hotel Boutique Palermo (4 semanas)", monto: 732000 },
    { id: "m2", fecha: "2026-09-01", tipo: "egreso", categoria: "Alquiler", descripcion: "Alquiler del local", monto: 780000 },
    { id: "m3", fecha: "2026-09-02", tipo: "ingreso", categoria: "Prendas (tintorería)", descripcion: "Mostrador: 6 ambos, 9 camisas, 4 sacos", monto: 438000 },
    { id: "m4", fecha: "2026-09-02", tipo: "egreso", categoria: "Sueldos y cargas", descripcion: "Sueldos 1ª quincena (4 personas, CCT 526/08)", monto: 900000 },
    { id: "m5", fecha: "2026-09-03", tipo: "ingreso", categoria: "Kilo / canasto", descripcion: "Valet por canasto · semana 1", monto: 214000 },
    { id: "m6", fecha: "2026-09-03", tipo: "egreso", categoria: "Químicos y solventes", descripcion: "Solvente y detergente industrial", monto: 236000 },
    { id: "m7", fecha: "2026-09-04", tipo: "ingreso", categoria: "Piezas voluminosas", descripcion: "Acolchados 2 plazas x8 y cortinas 12 m²", monto: 440000 },
    { id: "m8", fecha: "2026-09-05", tipo: "ingreso", categoria: "Prendas especiales", descripcion: "Seña vestido de novia · Marcela Ibarra", monto: 40000 },
    { id: "m9", fecha: "2026-09-06", tipo: "egreso", categoria: "Servicios (luz, gas, agua)", descripcion: "Luz y gas de la planta", monto: 320000 },
    { id: "m10", fecha: "2026-09-07", tipo: "ingreso", categoria: "Express", descripcion: "Recargo express: 5 pedidos en el día", monto: 62000 },
    { id: "m11", fecha: "2026-09-08", tipo: "ingreso", categoria: "Delivery", descripcion: "Retiros y entregas a domicilio · semana 2", monto: 78000 },
    { id: "m12", fecha: "2026-09-08", tipo: "egreso", categoria: "Perchas, bolsas y etiquetas", descripcion: "Compra · Perchas de alambre (x100) x10", monto: 125000 },
    { id: "m13", fecha: "2026-09-09", tipo: "ingreso", categoria: "Prendas (tintorería)", descripcion: "Mostrador: 3 tapados, 10 pantalones, 12 camisas solo planchado", monto: 358000 },
    { id: "m14", fecha: "2026-09-10", tipo: "ingreso", categoria: "Kilo / canasto", descripcion: "Valet por canasto · semana 2", monto: 236000 },
    { id: "m15", fecha: "2026-09-10", tipo: "egreso", categoria: "Mantenimiento y repuestos", descripcion: "Service de secadora y planchas", monto: 145000 },
    { id: "m16", fecha: "2026-09-11", tipo: "ingreso", categoria: "Abonos B2B", descripcion: "Airbnb Palermo · Vero D.: check-outs de agosto", monto: 118000 },
    { id: "m17", fecha: "2026-09-12", tipo: "ingreso", categoria: "Prendas especiales", descripcion: "2 camperas de cuero y vestido de fiesta", monto: 145000 },
    { id: "m18", fecha: "2026-09-12", tipo: "egreso", categoria: "Impuestos y tasas", descripcion: "Monotributo de servicios + tasa municipal", monto: 190000 },
    { id: "m19", fecha: "2026-09-13", tipo: "ingreso", categoria: "Venta de productos", descripcion: "Venta stock · Jabón líquido para prendas delicadas 1 L x2", monto: 13000 },
    { id: "m20", fecha: "2026-09-13", tipo: "egreso", categoria: "Comisiones de cobro", descripcion: "Comisiones Mercado Pago / MODO y tarjetas", monto: 74000 },
    { id: "m21", fecha: "2026-09-14", tipo: "ingreso", categoria: "Express", descripcion: "Recargo express: ambo para evento", monto: 12000 },
    { id: "m22", fecha: "2026-09-15", tipo: "egreso", categoria: "Delivery y fletes", descripcion: "Nafta y mantenimiento de la moto de reparto", monto: 92000 },
    { id: "m23", fecha: "2026-09-16", tipo: "ingreso", categoria: "Kilo / canasto", descripcion: "Valet por canasto · semana 3", monto: 251000 },
    { id: "m24", fecha: "2026-09-16", tipo: "egreso", categoria: "Sueldos y cargas", descripcion: "Sueldos 2ª quincena (4 personas, CCT 526/08)", monto: 900000 },
    { id: "m25", fecha: "2026-09-17", tipo: "egreso", categoria: "Residuos y habilitaciones", descripcion: "Retiro de residuos de solvente + habilitación", monto: 58000 },
    { id: "m26", fecha: "2026-09-18", tipo: "ingreso", categoria: "Prendas (tintorería)", descripcion: "Mostrador: 6 sacos, 5 ambos, 10 camisas", monto: 464000 },
    { id: "m27", fecha: "2026-09-19", tipo: "egreso", categoria: "Publicidad", descripcion: "Pauta Instagram + Google Maps", monto: 45000 },
    { id: "m28", fecha: "2026-09-20", tipo: "egreso", categoria: "Software", descripcion: "Sistema de gestión y factura electrónica ARCA", monto: 28000 },
    { id: "m29", fecha: "2026-09-21", tipo: "ingreso", categoria: "Piezas voluminosas", descripcion: "Alfombras 14 m² y acolchados x6", monto: 458000 },
    { id: "m30", fecha: "2026-09-22", tipo: "ingreso", categoria: "Delivery", descripcion: "Retiros y entregas a domicilio · semana 3", monto: 84000 },
    { id: "m31", fecha: "2026-09-23", tipo: "egreso", categoria: "Reclamos por daños", descripcion: "Bonificación por saco con mancha residual", monto: 36000 },
    { id: "m32", fecha: "2026-09-24", tipo: "ingreso", categoria: "Kilo / canasto", descripcion: "Valet por canasto · semana 4", monto: 243000 },
    { id: "m33", fecha: "2026-09-25", tipo: "ingreso", categoria: "Abonos B2B", descripcion: "Abono mensual Centro de Estética Bellaluz", monto: 96000 },
    { id: "m34", fecha: "2026-09-27", tipo: "egreso", categoria: "Amortización de equipos", descripcion: "Cuota lavadora industrial", monto: 110000 },
    { id: "m35", fecha: "2026-09-28", tipo: "ingreso", categoria: "Prendas (tintorería)", descripcion: "Mostrador: 14 pantalones, 12 camisas", monto: 350000 },
  ],
  deudas: [
    { id: "d1", cliente: "Hotel Boutique Palermo", monto: 385000, vencimiento: "2026-09-20" },
    { id: "d2", cliente: "Airbnb Palermo · Vero D.", monto: 142000, vencimiento: "2026-09-14" },
    { id: "d3", cliente: "Restaurante La Parrilla de Juan", monto: 96000, vencimiento: "2026-09-11" },
    { id: "d4", cliente: "Centro de Estética Bellaluz", monto: 58000, vencimiento: "2026-09-07" },
    { id: "d5", cliente: "Estudio Contable Ferrari", monto: 174000, vencimiento: "2026-08-28" },
    { id: "d6", cliente: "Marcela Ibarra", monto: 60000, vencimiento: "2026-09-18" },
  ],
  productos: [
    { id: "p1", sku: "QUI-001", nombre: "Solvente para limpieza en seco (bidón 20 L)", categoria: "Químicos y solventes", proveedor: "Química del Sur", unidad: "bidón", stock: 3, minimo: 6, precio: 84000, ubicacion: "Depósito químico · 1" },
    { id: "p2", sku: "QUI-014", nombre: "Detergente industrial concentrado 10 L", categoria: "Químicos y solventes", proveedor: "Química del Sur", unidad: "bidón", stock: 9, minimo: 5, precio: 38500, ubicacion: "Depósito químico · 2" },
    { id: "p3", sku: "QUI-021", nombre: "Quitamanchas (spotting) 1 L", categoria: "Químicos y solventes", proveedor: "Química del Sur", unidad: "litro", stock: 2, minimo: 6, precio: 15800, ubicacion: "Mesa de desmanchado" },
    { id: "p4", sku: "PER-101", nombre: "Perchas de alambre (x100)", categoria: "Perchas y bolsas", proveedor: "Envases Belgrano", unidad: "paquete", stock: 14, minimo: 10, precio: 12500, ubicacion: "Mostrador · estante 1" },
    { id: "p5", sku: "PER-118", nombre: "Bolsas cobertoras para prendas (rollo x200)", categoria: "Perchas y bolsas", proveedor: "Envases Belgrano", unidad: "rollo", stock: 2, minimo: 5, precio: 27000, ubicacion: "Mostrador · estante 2" },
    { id: "p6", sku: "ETI-030", nombre: "Etiquetas numeradas de ingreso (rollo)", categoria: "Etiquetas y tickets", proveedor: "Gráfica Norte", unidad: "rollo", stock: 6, minimo: 4, precio: 9800, ubicacion: "Mostrador · cajón" },
    { id: "p7", sku: "ETI-031", nombre: "Rollo térmico 80 mm para tickets", categoria: "Etiquetas y tickets", proveedor: "Gráfica Norte", unidad: "caja", stock: 1, minimo: 6, precio: 21000, ubicacion: "Mostrador · cajón" },
    { id: "p8", sku: "REP-045", nombre: "Filtro de pelusa para secadora industrial", categoria: "Repuestos y mantenimiento", proveedor: "Repuestos Lavamatic", unidad: "unidad", stock: 3, minimo: 2, precio: 46000, ubicacion: "Taller · estante 3" },
    { id: "p9", sku: "VEN-002", nombre: "Jabón líquido para prendas delicadas 1 L", categoria: "Venta al público", proveedor: "Química del Sur", unidad: "unidad", stock: 13, minimo: 8, precio: 6500, ubicacion: "Vidriera" },
    { id: "p10", sku: "VEN-005", nombre: "Perfume textil 500 ml", categoria: "Venta al público", proveedor: "Química del Sur", unidad: "unidad", stock: 9, minimo: 6, precio: 8900, ubicacion: "Vidriera" },
  ],
  stockMovs: [
    { id: "mv1", productoId: "p7", tipo: "salida", cantidad: 2, motivo: "Uso en producción", fecha: "2026-09-14T10:20:00" },
    { id: "mv2", productoId: "p9", tipo: "salida", cantidad: 2, motivo: "Venta", fecha: "2026-09-13T16:05:00" },
    { id: "mv3", productoId: "p4", tipo: "entrada", cantidad: 10, motivo: "Compra a proveedor", fecha: "2026-09-08T09:40:00" },
  ],
  presupuestos: [
    {
      id: "pr1",
      cliente: "Hotel Boutique Palermo",
      producto: "Abono mensual: lavandería de blanquería (4 semanas)",
      cantidad: 4,
      manoObra: 15000,
      materiales: [
        { nombre: "Ropa blanca · lavado por kilo (40 kg × $2.800)", costo: 112000 },
        { nombre: "Toallas y toallones (20 kg × $2.800)", costo: 56000 },
      ],
    },
    {
      id: "pr2",
      cliente: "Marcela Ibarra",
      producto: "Vestido de novia: limpieza en seco y conservación",
      cantidad: 1,
      manoObra: 0,
      materiales: [{ nombre: "Vestido de novia (limpieza en seco, seña 40%)", costo: 100000 }],
    },
  ],
  leads: [
    { id: "l1", nombre: "Lucía Benítez", origen: "Instagram", detalle: "Consulta: vestido de novia, limpieza y guardado", etapa: "nuevo", dias: 0 },
    { id: "l2", nombre: "Consorcio San Martín 440", origen: "WhatsApp", detalle: "Cortinas y alfombras del hall (por m²)", etapa: "nuevo", dias: 1 },
    { id: "l3", nombre: "Martín Vidal", origen: "Google Maps", detalle: "Retiro a domicilio semanal: ambos y camisas", etapa: "contactado", dias: 2 },
    { id: "l4", nombre: "Airbnb Palermo · Vero D.", origen: "Instagram", detalle: "Servicio periódico de ropa blanca por check-out", etapa: "interesado", dias: 3 },
    { id: "l5", nombre: "Restaurante La Parrilla de Juan", origen: "Referido", detalle: "Manteles y delantales, 2 retiros por semana", etapa: "esperando", dias: 6 },
    { id: "l6", nombre: "Centro de Estética Bellaluz", origen: "Volanteo", detalle: "Toallas y batas con cuenta corriente", etapa: "esperando", dias: 8 },
    { id: "l7", nombre: "Marcela Ibarra", origen: "Presupuesto", detalle: "Vestido de novia: limpieza en seco y conservación", etapa: "cerrado", dias: 12 },
    { id: "l8", nombre: "Hotel Boutique Palermo", origen: "Presupuesto", detalle: "Abono mensual: lavandería de blanquería (4 semanas)", etapa: "interesado", dias: 1 },
    { id: "l9", nombre: "Estudio Contable Ferrari", origen: "WhatsApp", detalle: "Plan mensual de ambos del equipo", etapa: "cerrado", dias: 20 },
  ],
  tareas: [
    { id: "t1", titulo: "Retiro a domicilio: Airbnb Palermo (check-out 11 h)", persona: "Diego", prioridad: "alta", limite: "2026-09-15", estado: "todo" },
    { id: "t2", titulo: "Pedir solvente y quitamanchas a Química del Sur", persona: "Valen", prioridad: "alta", limite: "2026-09-16", estado: "todo" },
    { id: "t3", titulo: "Armar presupuesto Consorcio San Martín 440 (cortinas y alfombras)", persona: "Sofía", prioridad: "media", limite: "2026-09-18", estado: "doing" },
    { id: "t4", titulo: "Planchar y embolsar lote de ambos Estudio Ferrari", persona: "Diego", prioridad: "media", limite: "2026-09-20", estado: "doing" },
    { id: "t5", titulo: "Avisar por WhatsApp: pedidos listos de hoy", persona: "Luz", prioridad: "baja", limite: "2026-09-14", estado: "todo" },
    { id: "t6", titulo: "Llamar por prendas sin retirar hace más de 30 días", persona: "Luz", prioridad: "media", limite: "2026-09-12", estado: "todo" },
    { id: "t7", titulo: "Confirmar seña del vestido de novia Ibarra", persona: "Sofía", prioridad: "alta", limite: "2026-09-13", estado: "done" },
    { id: "t8", titulo: "Service de la lavadora industrial (filtros y desbloqueo)", persona: "Diego", prioridad: "media", limite: "2026-09-25", estado: "todo" },
    { id: "t9", titulo: "Actualizar lista de precios por inflación", persona: "Sofía", prioridad: "media", limite: "2026-09-30", estado: "todo" },
  ],
  clientes: [
    { id: "c1", nombre: "Martín Vidal", ultima: "2026-09-10", frecuencia: 15, producto: "ambos y camisas" },
    { id: "c2", nombre: "Restaurante La Parrilla de Juan", ultima: "2026-09-12", frecuencia: 7, producto: "manteles y delantales" },
    { id: "c3", nombre: "Hotel Boutique Palermo", ultima: "2026-08-31", frecuencia: 7, producto: "lavandería de blanquería" },
    { id: "c4", nombre: "Centro de Estética Bellaluz", ultima: "2026-08-10", frecuencia: 14, producto: "toallas y batas" },
    { id: "c5", nombre: "Marcela Ibarra", ultima: "2026-09-09", frecuencia: 365, producto: "vestido de novia" },
    { id: "c6", nombre: "Airbnb Palermo · Vero D.", ultima: "2026-09-13", frecuencia: 7, producto: "ropa blanca por check-out" },
    { id: "c7", nombre: "Estudio Contable Ferrari", ultima: "2026-07-20", frecuencia: 30, producto: "ambos del equipo" },
  ],
};

const pesos = (n) =>
  (Number(n) || 0).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const colorDe = (i) => PALETA[i % PALETA.length];
const fechaAR = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("es-AR");
const diasEntre = (iso) => Math.floor((HOY - new Date(iso + "T12:00:00")) / 86400000);
const iniciales = (nombre) =>
  nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return structuredClone(SEED);
}

let db = load();
const charts = {};

function save() {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function upsert(id, config) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (charts[id]) {
    charts[id].data = config.data;
    charts[id].options = config.options;
    charts[id].update();
    return;
  }
  charts[id] = new Chart(canvas, config);
}

function killCharts(ids) {
  ids.forEach((id) => {
    if (charts[id]) {
      charts[id].destroy();
      delete charts[id];
    }
  });
}

function nombresClientes() {
  const set = new Set();
  db.deudas.forEach((d) => set.add(d.cliente));
  db.leads.forEach((l) => set.add(l.nombre));
  db.clientes.forEach((c) => set.add(c.nombre));
  db.presupuestos.forEach((p) => set.add(p.cliente));
  document.getElementById("listaCatFin").innerHTML = [...CATS_INGRESO, ...CATS_EGRESO].map((c) => `<option value="${esc(c)}"></option>`).join("");
  document.getElementById("listaClientes").innerHTML = [...set]
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((n) => `<option value="${esc(n)}"></option>`)
    .join("");
}

function registrarFinanciero({ tipo, categoria, descripcion, monto, fecha }) {
  db.movimientos.push({
    id: uid("m-"),
    fecha: fecha || HOY_ISO,
    tipo,
    categoria,
    descripcion,
    monto,
  });
}

function leadDesdePresupuesto(p) {
  const i = db.leads.findIndex((l) => l.nombre.toLowerCase() === p.cliente.toLowerCase());
  const item = {
    nombre: p.cliente,
    origen: "Presupuesto",
    detalle: p.producto,
    etapa: "interesado",
    dias: 0,
  };
  if (i >= 0) db.leads[i] = { ...db.leads[i], ...item };
  else db.leads.push({ id: uid("l-"), ...item });
}

/* ---------- INICIO ---------- */
function tot(tipo) {
  return db.movimientos.filter((m) => m.tipo === tipo).reduce((a, m) => a + m.monto, 0);
}

function deudasEnriquecidas() {
  return db.deudas.map((d) => {
    const dias = diasEntre(d.vencimiento);
    let tramo;
    if (dias < 0) tramo = { id: "ok", label: "Al día", clase: "ok" };
    else if (dias === 0) tramo = { id: "vto", label: "Vence hoy", clase: "warn" };
    else if (dias <= 3) tramo = { id: "mora3", label: "Mora suave", clase: "risk" };
    else tramo = { id: "mora7", label: "Mora firme", clase: "danger" };
    return { ...d, dias, tramo };
  });
}

function postFilas() {
  return db.clientes.map((c) => {
    const dias = diasEntre(c.ultima);
    let accion;
    if (dias >= 3 && dias <= 10) accion = { id: "resena", label: "Pedir reseña" };
    else if (dias > c.frecuencia) accion = { id: "reactivar", label: "Reactivar" };
    else accion = { id: "ok", label: "En ciclo" };
    return { ...c, dias, accion };
  });
}

function renderInicio() {
  const ingresos = tot("ingreso");
  const egresos = tot("egreso");
  const mora = deudasEnriquecidas().filter((d) => d.dias > 0);
  const bajos = db.productos.filter((p) => p.stock < p.minimo);
  const abiertos = db.leads.filter((l) => l.etapa !== "cerrado");
  const pendientes = db.tareas.filter((t) => t.estado !== "done");
  const reactivar = postFilas().filter((c) => c.accion.id === "reactivar");

  document.getElementById("home-kpis").innerHTML = `
    <article class="kpi balance"><span>Balance</span><strong>${pesos(ingresos - egresos)}</strong><small>Financiero del mes</small></article>
    <article class="kpi egreso"><span>En mora</span><strong>${pesos(mora.reduce((a, d) => a + d.monto, 0))}</strong><small>${mora.length} cuentas</small></article>
    <article class="kpi"><span>A reponer</span><strong>${bajos.length}</strong><small>insumos bajo el mínimo</small></article>
    <article class="kpi"><span>Leads abiertos</span><strong>${abiertos.length}</strong><small>en el pipeline</small></article>
    <article class="kpi"><span>Tareas pendientes</span><strong>${pendientes.length}</strong><small>por hacer / en proceso</small></article>
    <article class="kpi"><span>Reactivar</span><strong>${reactivar.length}</strong><small>se pasaron de su ritmo</small></article>
  `;

  const vencidas = db.tareas.filter((t) => t.estado !== "done" && t.limite < HOY_ISO);
  const frios = db.leads.filter((l) => l.etapa === "esperando" && l.dias >= 6);
  const alertas = [
    ...bajos.map((p) => ({ texto: `Stock bajo: ${p.nombre} (${p.stock}/${p.minimo})`, href: "#stock" })),
    ...mora.map((d) => ({ texto: `Mora ${d.dias} días · ${d.cliente}`, href: "#cobranza" })),
    ...reactivar.map((c) => ({ texto: `Reactivar ${c.nombre}`, href: "#postventa" })),
    ...vencidas.map((t) => ({ texto: `Vencida: ${t.titulo}`, href: "#tareas" })),
    ...frios.map((l) => ({ texto: `Lead frío: ${l.nombre}`, href: "#crm" })),
  ];
  document.getElementById("home-alertas").innerHTML = `
    <div class="panel-head"><h2>Para hoy</h2><p>${alertas.length} avisos cruzados entre módulos</p></div>
    ${
      alertas.length
        ? `<ul class="alertas">${alertas
            .map((a) => `<li><span>${esc(a.texto)}</span><a href="${a.href}">Ver</a></li>`)
            .join("")}</ul>`
        : `<p class="hint">Nada urgente. El negocio está al día.</p>`
    }
  `;

  const ingresosSem = [0, 0, 0, 0];
  const egresosSem = [0, 0, 0, 0];
  db.movimientos.forEach((m) => {
    const i = Math.min(3, Math.floor((Number(m.fecha.slice(8, 10)) - 1) / 7));
    if (m.tipo === "ingreso") ingresosSem[i] += m.monto;
    else egresosSem[i] += m.monto;
  });
  upsert("homeChart", {
    type: "bar",
    data: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      datasets: [
        { label: "Ingresos", data: ingresosSem, backgroundColor: NAVY, borderRadius: 6 },
        { label: "Egresos", data: egresosSem, backgroundColor: ORANGE, borderRadius: 6 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { ticks: { callback: (v) => "$" + (v / 1000).toFixed(0) + " mil" } } },
    },
  });
}

/* ---------- FINANCIERO ---------- */
function porCategoria(tipo) {
  const map = {};
  db.movimientos.filter((m) => m.tipo === tipo).forEach((m) => {
    map[m.categoria] = (map[m.categoria] || 0) + m.monto;
  });
  const labels = Object.keys(map);
  return { labels, data: labels.map((k) => map[k]), colors: labels.map((_, i) => colorDe(i)) };
}

function renderFinanciero() {
  const ingresos = tot("ingreso");
  const egresos = tot("egreso");
  document.getElementById("fin-kpis").innerHTML = `
    <article class="kpi ingreso"><span>Ingresos del mes</span><strong>${pesos(ingresos)}</strong></article>
    <article class="kpi egreso"><span>Egresos del mes</span><strong>${pesos(egresos)}</strong></article>
    <article class="kpi balance"><span>Balance</span><strong>${pesos(ingresos - egresos)}</strong></article>
  `;
  const actual = document.getElementById("fin-filtro").value || "Todas";
  const cats = ["Todas", ...new Set(db.movimientos.map((m) => m.categoria))];
  document.getElementById("fin-filtro").innerHTML = cats
    .map((c) => `<option ${c === actual ? "selected" : ""}>${esc(c)}</option>`)
    .join("");
  const filtro = document.getElementById("fin-filtro").value || "Todas";
  document.getElementById("fin-tabla").innerHTML = db.movimientos
    .filter((m) => filtro === "Todas" || m.categoria === filtro)
    .map(
      (m) => `<tr>
        <td>${fechaAR(m.fecha)}</td>
        <td><span class="pill ${m.tipo}">${m.tipo}</span></td>
        <td>${esc(m.categoria)}</td>
        <td>${esc(m.descripcion)}</td>
        <td class="num">${m.tipo === "egreso" ? "−" : "+"}${pesos(m.monto)}</td>
        <td><div class="acciones">
          <button type="button" class="sm ghost" data-fin-edit="${m.id}">Editar</button>
          <button type="button" class="sm danger" data-fin-del="${m.id}">Borrar</button>
        </div></td>
      </tr>`
    )
    .join("");

  const ingresosSem = [0, 0, 0, 0];
  const egresosSem = [0, 0, 0, 0];
  db.movimientos.forEach((m) => {
    const i = Math.min(3, Math.floor((Number(m.fecha.slice(8, 10)) - 1) / 7));
    if (m.tipo === "ingreso") ingresosSem[i] += m.monto;
    else egresosSem[i] += m.monto;
  });
  const ticksMil = { y: { ticks: { callback: (v) => "$" + (v / 1000).toFixed(0) + " mil" } } };
  const common = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } };
  upsert("chartSemanas", {
    type: "bar",
    data: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      datasets: [
        { label: "Ingresos", data: ingresosSem, backgroundColor: NAVY, borderRadius: 6 },
        { label: "Egresos", data: egresosSem, backgroundColor: ORANGE, borderRadius: 6 },
      ],
    },
    options: { ...common, scales: ticksMil },
  });

  const ordenados = [...db.movimientos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  const labels = [];
  const balance = [];
  const ingAcc = [];
  const egrAcc = [];
  let b = 0, ing = 0, egr = 0;
  ordenados.forEach((m) => {
    if (m.tipo === "ingreso") { b += m.monto; ing += m.monto; } else { b -= m.monto; egr += m.monto; }
    labels.push(new Date(m.fecha + "T12:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }));
    balance.push(b); ingAcc.push(ing); egrAcc.push(egr);
  });
  upsert("chartLinea", {
    type: "line",
    data: { labels, datasets: [{ label: "Balance", data: balance, borderColor: NAVY, fill: false, tension: 0.35, pointRadius: 3, pointBackgroundColor: ORANGE }] },
    options: { ...common, scales: ticksMil },
  });
  upsert("chartArea", {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Ingresos acum.", data: ingAcc, borderColor: NAVY, backgroundColor: "rgba(32,62,127,.22)", fill: true, tension: 0.35, pointRadius: 0 },
        { label: "Egresos acum.", data: egrAcc, borderColor: ORANGE, backgroundColor: "rgba(239,122,30,.22)", fill: true, tension: 0.35, pointRadius: 0 },
      ],
    },
    options: { ...common, scales: ticksMil },
  });
  const ingCat = porCategoria("ingreso");
  upsert("chartTorta", { type: "pie", data: { labels: ingCat.labels, datasets: [{ data: ingCat.data, backgroundColor: ingCat.colors, borderWidth: 0 }] }, options: common });
  const egrCat = porCategoria("egreso");
  upsert("chartDona", { type: "doughnut", data: { labels: egrCat.labels, datasets: [{ data: egrCat.data, backgroundColor: egrCat.colors, borderWidth: 0 }] }, options: { ...common, cutout: "62%" } });
  const ratio = ingresos ? Math.round((egresos / ingresos) * 100) : 0;
  document.getElementById("gaugeLabel").innerHTML = `<strong>${ratio}%</strong><span>del ingreso</span>`;
  upsert("chartGauge", {
    type: "doughnut",
    data: { labels: ["Gastado", "Disponible"], datasets: [{ data: [Math.min(ratio, 100), Math.max(0, 100 - ratio)], backgroundColor: [ORANGE, "#E4E7EC"], borderWidth: 0 }] },
    options: { ...common, rotation: -90, circumference: 180, cutout: "78%", plugins: { legend: { display: false } } },
  });
  const ranking = Object.entries(
    db.movimientos.reduce((map, m) => ((map[m.categoria] = (map[m.categoria] || 0) + m.monto), map), {})
  ).sort((a, b) => b[1] - a[1]);
  upsert("chartHorizontal", {
    type: "bar",
    data: { labels: ranking.map(([k]) => k), datasets: [{ label: "Volumen", data: ranking.map(([, v]) => v), backgroundColor: ranking.map((_, i) => colorDe(i)), borderRadius: 6 }] },
    options: { ...common, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { ticks: { callback: (v) => "$" + (v / 1000).toFixed(0) + " mil" } } } },
  });
  upsert("chartPolar", {
    type: "polarArea",
    data: { labels: ranking.map(([k]) => k), datasets: [{ data: ranking.map(([, v]) => v), backgroundColor: ranking.map((_, i) => colorDe(i) + "cc") }] },
    options: common,
  });
}

function abrirFin(item) {
  document.getElementById("fin-titulo").textContent = item ? "Editar movimiento" : "Nuevo movimiento";
  document.getElementById("fin-id").value = item?.id || "";
  document.getElementById("fin-fecha").value = item?.fecha || HOY_ISO;
  document.getElementById("fin-tipo").value = item?.tipo || "ingreso";
  document.getElementById("fin-cat").value = item?.categoria || "";
  document.getElementById("fin-desc").value = item?.descripcion || "";
  document.getElementById("fin-monto").value = item?.monto || "";
  document.getElementById("modal-fin").showModal();
}

/* ---------- COBRANZA ---------- */
function avisoPara(d) {
  const fecha = fechaAR(d.vencimiento);
  if (d.tramo.id === "ok") return `Hola ${d.cliente}, te escribimos para recordarte con tiempo que el saldo de ${pesos(d.monto)} vence el ${fecha}. Si ya lo tenés agendado, ignorá este mensaje. ¡Gracias!`;
  if (d.tramo.id === "vto") return `Hola ${d.cliente}, hoy vence el saldo de ${pesos(d.monto)}. ¿Te pasamos el alias o el QR de Mercado Pago/MODO otra vez? Quedamos atentos.`;
  if (d.tramo.id === "mora3") return `Hola ${d.cliente}, el saldo de ${pesos(d.monto)} venció el ${fecha} y ya pasaron ${d.dias} días. Necesitamos regularizarlo esta semana para seguir con los retiros y entregas. ¿Cuándo lo transferís?`;
  return `${d.cliente}: el saldo de ${pesos(d.monto)} lleva ${d.dias} días de mora (vto. ${fecha}). Pedimos regularización inmediata o una fecha cierta de pago; mientras tanto suspendemos los retiros de la cuenta corriente.`;
}

function renderCobranzaPreview(d) {
  const panel = document.getElementById("cob-aviso");
  if (!d) {
    panel.innerHTML = `<div class="preview-empty"><div><div class="orb"></div><h2>Aviso de cobranza</h2><p>Elegí una cuenta y generá el texto según el tramo de mora.</p></div></div>`;
    return;
  }
  const texto = avisoPara(d);
  panel.innerHTML = `
    <div class="preview-head">
      <div class="avatar">${esc(iniciales(d.cliente))}</div>
      <div><h2>${esc(d.cliente)}</h2><p>${d.tramo.label} · ${pesos(d.monto)}</p></div>
    </div>
    <div class="chat"><div class="bubble">${esc(texto)}</div></div>
    <div class="preview-foot">
      <button type="button" id="cob-copiar">Copiar mensaje</button>
      <p class="hint">En Etapa 3 este texto sale por WhatsApp con Evolution API.</p>
    </div>`;
  document.getElementById("cob-copiar").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(texto);
      const btn = document.getElementById("cob-copiar");
      btn.textContent = "Copiado";
      setTimeout(() => { if (btn) btn.textContent = "Copiar mensaje"; }, 1200);
    } catch (_) {}
  });
}

function renderCobranza() {
  const rows = deudasEnriquecidas();
  const enMora = rows.filter((d) => d.dias > 0);
  document.getElementById("cob-kpis").innerHTML = `
    <article class="kpi"><span>Por cobrar</span><strong>${pesos(rows.reduce((a, d) => a + d.monto, 0))}</strong></article>
    <article class="kpi"><span>Cuentas en mora</span><strong>${enMora.length}</strong></article>
    <article class="kpi"><span>Monto en mora</span><strong>${pesos(enMora.reduce((a, d) => a + d.monto, 0))}</strong></article>
  `;
  document.getElementById("cob-tabla").innerHTML = rows
    .map(
      (d) => `<tr>
        <td>${esc(d.cliente)}</td>
        <td class="num">${pesos(d.monto)}</td>
        <td>${fechaAR(d.vencimiento)}</td>
        <td>${d.dias > 0 ? d.dias + " días" : d.dias === 0 ? "0" : "—"}</td>
        <td><span class="semaforo"><span class="dot ${d.tramo.clase}"></span>${d.tramo.label}</span></td>
        <td><div class="acciones">
          <button type="button" class="sm" data-cob-aviso="${d.id}">Aviso</button>
          <button type="button" class="sm ghost" data-cob-edit="${d.id}">Editar</button>
          <button type="button" class="sm danger" data-cob-del="${d.id}">Borrar</button>
        </div></td>
      </tr>`
    )
    .join("");
  if (!document.querySelector("#cob-aviso .bubble")) renderCobranzaPreview(null);
}

function abrirCob(item) {
  document.getElementById("cob-titulo").textContent = item ? "Editar cuenta" : "Nueva cuenta";
  document.getElementById("cob-id").value = item?.id || "";
  document.getElementById("cob-cliente").value = item?.cliente || "";
  document.getElementById("cob-monto").value = item?.monto || "";
  document.getElementById("cob-vto").value = item?.vencimiento || HOY_ISO;
  document.getElementById("modal-cob").showModal();
}

/* ---------- STOCK ---------- */
let sortKey = "nombre";
let sortDir = 1;
let seleccion = new Set();

function filtradosStock() {
  const q = document.getElementById("stk-q").value.trim().toLowerCase();
  const cat = document.getElementById("stk-cat").value;
  const prov = document.getElementById("stk-prov").value;
  const est = document.getElementById("stk-est").value;
  return db.productos
    .filter((p) => {
      const texto = `${p.sku} ${p.nombre} ${p.proveedor} ${p.ubicacion}`.toLowerCase();
      if (q && !texto.includes(q)) return false;
      if (cat !== "todas" && p.categoria !== cat) return false;
      if (prov !== "todos" && p.proveedor !== prov) return false;
      if (est === "ok" && p.stock < p.minimo) return false;
      if (est === "reponer" && p.stock >= p.minimo) return false;
      return true;
    })
    .sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === "number") return (va - vb) * sortDir;
      return String(va).localeCompare(String(vb), "es") * sortDir;
    });
}

function renderStock() {
  const catSel = document.getElementById("stk-cat");
  const provSel = document.getElementById("stk-prov");
  const catActual = catSel.value || "todas";
  const provActual = provSel.value || "todos";
  const proveedores = [...new Set(db.productos.map((p) => p.proveedor))].sort();
  catSel.innerHTML = `<option value="todas">Todas las categorías</option>` + CATEGORIAS.map((c) => `<option ${c === catActual ? "selected" : ""}>${esc(c)}</option>`).join("");
  provSel.innerHTML = `<option value="todos">Todos los proveedores</option>` + proveedores.map((p) => `<option ${p === provActual ? "selected" : ""}>${esc(p)}</option>`).join("");
  document.getElementById("stk-categoria").innerHTML = CATEGORIAS.map((c) => `<option>${esc(c)}</option>`).join("");
  document.getElementById("listaProveedores").innerHTML = proveedores.map((p) => `<option value="${esc(p)}"></option>`).join("");

  const bajos = db.productos.filter((p) => p.stock < p.minimo);
  const valor = db.productos.reduce((a, p) => a + p.stock * p.precio, 0);
  document.getElementById("stk-kpis").innerHTML = `
    <article class="kpi"><span>SKUs</span><strong>${db.productos.length}</strong></article>
    <article class="kpi"><span>Por debajo del mínimo</span><strong>${bajos.length}</strong></article>
    <article class="kpi"><span>Unidades a reponer</span><strong>${bajos.reduce((a, p) => a + (p.minimo - p.stock), 0)}</strong></article>
    <article class="kpi"><span>Valor en stock</span><strong>${pesos(valor)}</strong></article>
  `;
  const rows = filtradosStock();
  document.getElementById("stk-hint").textContent = `${rows.length} de ${db.productos.length} productos`;
  document.getElementById("stk-tabla").innerHTML =
    rows
      .map((p) => {
        const crit = p.stock < p.minimo;
        return `<tr class="${crit ? "bajo" : ""}">
          <td class="check"><input type="checkbox" data-stk-check="${p.id}" ${seleccion.has(p.id) ? "checked" : ""} /></td>
          <td class="sku">${esc(p.sku)}</td>
          <td>${esc(p.nombre)}<span class="prod-meta">${esc(p.unidad)} · ${esc(p.ubicacion || "sin ubicación")}</span></td>
          <td>${esc(p.categoria)}</td>
          <td>${esc(p.proveedor)}</td>
          <td><div class="stock-cell">
            <button type="button" class="sm ghost" data-stk-out="${p.id}">−</button>
            <strong>${p.stock}</strong>
            <button type="button" class="sm" data-stk-in="${p.id}">+</button>
          </div></td>
          <td class="num">${p.minimo}</td>
          <td><span class="pill ${crit ? "reponer" : "ok"}">${crit ? "Reponer" : "OK"}</span></td>
          <td><div class="acciones">
            <button type="button" class="sm ghost" data-stk-edit="${p.id}">Editar</button>
            <button type="button" class="sm danger" data-stk-del="${p.id}">Borrar</button>
          </div></td>
        </tr>`;
      })
      .join("") || `<tr><td colspan="9">No hay productos con esos filtros.</td></tr>`;
  document.getElementById("stk-all").checked = rows.length > 0 && rows.every((p) => seleccion.has(p.id));
  const btnSel = document.getElementById("stk-borrar-sel");
  btnSel.hidden = seleccion.size === 0;
  btnSel.textContent = `Borrar seleccionados (${seleccion.size})`;

  if (!bajos.length) {
    document.getElementById("stk-lista").innerHTML = `<h2>Lista de reposición</h2><p>Nada por debajo del mínimo.</p>`;
  } else {
    document.getElementById("stk-lista").innerHTML = `
      <h2>Lista de reposición</h2>
      <p>${bajos.length} productos para comprar ahora</p>
      <ul class="lista">${bajos.map((p) => `<li><span>${esc(p.nombre)}<br><small>${esc(p.sku)} · ${esc(p.proveedor)}</small></span><strong>+${p.minimo - p.stock}</strong></li>`).join("")}</ul>`;
  }
  const ultimos = [...db.stockMovs].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 8);
  document.getElementById("stk-movs").innerHTML = ultimos.length
    ? `<h2>Últimos movimientos</h2><ul class="movs">${ultimos
        .map((m) => {
          const p = db.productos.find((x) => x.id === m.productoId);
          const cuando = new Date(m.fecha).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
          return `<li><b class="${m.tipo}">${m.tipo === "entrada" ? "+" : "−"}${m.cantidad}</b> ${esc(p?.nombre || "Producto borrado")}<br><small>${esc(m.motivo)} · ${cuando}</small></li>`;
        })
        .join("")}</ul>`
    : `<h2>Movimientos</h2><p>Todavía no hay entradas ni salidas.</p>`;
}

function abrirStk(item) {
  document.getElementById("stk-error").hidden = true;
  document.getElementById("stk-titulo").textContent = item ? "Editar producto" : "Nuevo producto";
  document.getElementById("stk-id").value = item?.id || "";
  document.getElementById("stk-sku").value = item?.sku || "";
  document.getElementById("stk-nombre").value = item?.nombre || "";
  document.getElementById("stk-categoria").value = item?.categoria || CATEGORIAS[0];
  document.getElementById("stk-proveedor").value = item?.proveedor || "";
  document.getElementById("stk-unidad").value = item?.unidad || "unidad";
  document.getElementById("stk-stock").value = item?.stock ?? 0;
  document.getElementById("stk-min").value = item?.minimo ?? 0;
  document.getElementById("stk-precio").value = item?.precio ?? 0;
  document.getElementById("stk-ubi").value = item?.ubicacion || "";
  document.getElementById("stk-sku").readOnly = Boolean(item);
  document.getElementById("modal-stk").showModal();
}

function abrirMov(producto, tipo) {
  document.getElementById("mov-error").hidden = true;
  document.getElementById("mov-id").value = producto.id;
  document.getElementById("mov-tipo").value = tipo;
  document.getElementById("mov-titulo").textContent = tipo === "entrada" ? "Entrada de stock" : "Salida de stock";
  document.getElementById("mov-prod").textContent = `${producto.sku} · ${producto.nombre} · stock actual ${producto.stock}`;
  document.getElementById("mov-cant").value = 1;
  const motivos = tipo === "entrada" ? MOTIVOS_IN : MOTIVOS_OUT;
  document.getElementById("mov-motivo").innerHTML = motivos.map((m) => `<option>${m}</option>`).join("");
  document.getElementById("modal-mov").showModal();
}

/* ---------- PRESUPUESTOS ---------- */
let editandoPre = null;
let materiales = SEED.presupuestos[0].materiales.map((m) => ({ ...m }));

function totalDe(d) {
  const subMat = d.materiales.reduce((a, m) => a + (Number(m.costo) || 0), 0);
  return (subMat + (Number(d.manoObra) || 0)) * (Number(d.cantidad) || 1);
}

function leerPre() {
  return {
    cliente: document.getElementById("pre-cliente").value,
    producto: document.getElementById("pre-producto").value,
    cantidad: Number(document.getElementById("pre-cantidad").value) || 1,
    manoObra: Number(document.getElementById("pre-mano").value) || 0,
    materiales: materiales.map((m) => ({ ...m })),
  };
}

function cargarPre(d) {
  document.getElementById("pre-cliente").value = d.cliente;
  document.getElementById("pre-producto").value = d.producto;
  document.getElementById("pre-cantidad").value = d.cantidad;
  document.getElementById("pre-mano").value = d.manoObra;
  materiales = d.materiales.map((m) => ({ ...m }));
  renderPreMateriales();
  renderPreDoc();
}

function renderPreMateriales() {
  document.getElementById("pre-materiales").innerHTML = materiales
    .map(
      (m, i) => `<div class="fila">
        <input data-i="${i}" data-k="nombre" value="${esc(m.nombre)}" />
        <input data-i="${i}" data-k="costo" type="number" min="0" value="${m.costo}" />
        <button type="button" class="icon" data-pre-del="${i}">×</button>
      </div>`
    )
    .join("");
}

function renderPreDoc() {
  const d = leerPre();
  document.getElementById("pre-doc").innerHTML = `
    <div class="doc-head"><div><h3>Presupuesto</h3><p>${esc(d.cliente)}</p></div><div><p>${fechaAR(HOY_ISO)}</p><p>Válido 15 días</p></div></div>
    <p><strong>${esc(d.producto)}</strong> · repeticiones: ${d.cantidad}</p>
    <table>
      <thead><tr><th>Ítem</th><th class="num">Importe</th></tr></thead>
      <tbody>
        ${d.materiales.map((m) => `<tr><td>${esc(m.nombre) || "—"}</td><td class="num">${pesos(m.costo)}</td></tr>`).join("")}
        <tr><td>Recargos y delivery</td><td class="num">${pesos(d.manoObra)}</td></tr>
      </tbody>
    </table>
    <p class="total">Total ${pesos(totalDe(d))}</p>
    <p class="hint">Seña del 50% al recibir las prendas: ${pesos(totalDe(d) / 2)} · saldo al retirar. Precios de septiembre 2026.</p>`;
}

function renderPreHistorial() {
  document.getElementById("pre-tabla").innerHTML = db.presupuestos
    .map(
      (p) => `<tr>
        <td>${esc(p.cliente)}</td><td>${esc(p.producto)}</td><td>${p.cantidad}</td>
        <td class="num">${pesos(totalDe(p))}</td>
        <td><div class="acciones">
          <button type="button" class="sm ghost" data-pre-edit="${p.id}">Editar</button>
          <button type="button" class="sm danger" data-pre-del="${p.id}">Borrar</button>
        </div></td>
      </tr>`
    )
    .join("");
}

function renderPresupuestos() {
  renderPreMateriales();
  renderPreDoc();
  renderPreHistorial();
}

/* ---------- CRM ---------- */
let draggingLead = null;
function bindKanban(root, getItem, setCol) {
  root.querySelectorAll(".tarjeta").forEach((el) => {
    el.addEventListener("dragstart", () => {
      draggingLead = el.dataset.id;
    });
  });
  root.querySelectorAll(".columna").forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("over");
    });
    col.addEventListener("dragleave", () => col.classList.remove("over"));
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("over");
      const item = getItem(draggingLead);
      if (item) {
        setCol(item, col.dataset.col);
        save();
        renderVista();
      }
    });
  });
}

function renderCrm() {
  const root = document.getElementById("crm-tablero");
  root.innerHTML = CRM_ETAPAS.map((col) => {
    const cards = db.leads.filter((l) => l.etapa === col.id);
    return `<section class="columna" data-col="${col.id}">
      <header><h2>${col.nombre}</h2><span class="count">${cards.length}</span></header>
      ${cards
        .map(
          (l) => `<article class="tarjeta" draggable="true" data-id="${l.id}">
            <h3>${esc(l.nombre)}</h3>
            <p>${esc(l.detalle)}</p>
            <p>${l.dias} día${l.dias === 1 ? "" : "s"} sin mover</p>
            <span class="origen">${esc(l.origen)}</span>
            <div class="acciones">
              <button type="button" class="sm ghost" data-crm-edit="${l.id}">Editar</button>
              <button type="button" class="sm danger" data-crm-del="${l.id}">Borrar</button>
            </div>
          </article>`
        )
        .join("")}
    </section>`;
  }).join("");
  bindKanban(
    root,
    (id) => db.leads.find((l) => l.id === id),
    (lead, col) => {
      lead.etapa = col;
      lead.dias = 0;
    }
  );
}

function abrirCrm(item) {
  document.getElementById("crm-titulo").textContent = item ? "Editar lead" : "Nuevo lead";
  document.getElementById("crm-id").value = item?.id || "";
  document.getElementById("crm-nombre").value = item?.nombre || "";
  document.getElementById("crm-origen").value = item?.origen || "WhatsApp";
  document.getElementById("crm-detalle").value = item?.detalle || "";
  document.getElementById("crm-etapa").value = item?.etapa || "nuevo";
  document.getElementById("modal-crm").showModal();
}

/* ---------- TAREAS ---------- */
function renderTareas() {
  const root = document.getElementById("tar-tablero");
  root.innerHTML = TAR_COLS.map((col) => {
    const cards = db.tareas.filter((t) => t.estado === col.id);
    return `<section class="columna" data-col="${col.id}">
      <header><h2>${col.nombre}</h2><span class="count">${cards.length}</span></header>
      ${cards
        .map(
          (t) => `<article class="tarjeta" draggable="true" data-id="${t.id}">
            <h3>${esc(t.titulo)}</h3>
            <p>Límite ${fechaAR(t.limite)}</p>
            <div class="meta"><span class="persona">${esc(t.persona)}</span><span class="prio ${t.prioridad}">${t.prioridad}</span></div>
            <div class="acciones">
              <button type="button" class="sm ghost" data-tar-edit="${t.id}">Editar</button>
              <button type="button" class="sm danger" data-tar-del="${t.id}">Borrar</button>
            </div>
          </article>`
        )
        .join("")}
    </section>`;
  }).join("");
  bindKanban(
    root,
    (id) => db.tareas.find((t) => t.id === id),
    (tarea, col) => {
      tarea.estado = col;
    }
  );
}

function abrirTar(item) {
  document.getElementById("tar-titulo").textContent = item ? "Editar tarea" : "Nueva tarea";
  document.getElementById("tar-id").value = item?.id || "";
  document.getElementById("tar-tit").value = item?.titulo || "";
  document.getElementById("tar-persona").value = item?.persona || "";
  document.getElementById("tar-prio").value = item?.prioridad || "media";
  document.getElementById("tar-limite").value = item?.limite || "2026-09-21";
  document.getElementById("tar-estado").value = item?.estado || "todo";
  document.getElementById("modal-tar").showModal();
}

/* ---------- POSTVENTA ---------- */
let filtroPos = "todos";
let selPos = null;

function mensajePos(c) {
  if (c.accion.id === "resena") return `Hola ${c.nombre}, ¿cómo te quedó el servicio de ${c.producto}? Si quedaste conforme, una reseña corta en Google Maps nos ayuda un montón. Son 20 segundos. ¡Gracias!`;
  if (c.accion.id === "reactivar") return `Hola ${c.nombre}, hace ${c.dias} días que no nos mandás ${c.producto} (tu ritmo suele ser cada ${c.frecuencia} días). ¿Coordinamos el retiro a domicilio esta semana?`;
  return `Hola ${c.nombre}, todavía estás dentro de tu ciclo de servicio (${c.dias} de ${c.frecuencia} días). No hace falta empujar.`;
}

function renderPostventa() {
  const rows = postFilas();
  const nResena = rows.filter((f) => f.accion.id === "resena").length;
  const nReactivar = rows.filter((f) => f.accion.id === "reactivar").length;
  const nOk = rows.filter((f) => f.accion.id === "ok").length;
  document.getElementById("pos-kpis").innerHTML = `
    <article class="kpi"><div class="kpi-ico navy">${rows.length}</div><div><span>Clientes</span><strong>${rows.length}</strong><small>${nOk} todavía en ciclo</small></div></article>
    <article class="kpi"><div class="kpi-ico orange">${nResena}</div><div><span>Pedir reseña</span><strong>${nResena}</strong><small>entre 3 y 10 días</small></div></article>
    <article class="kpi"><div class="kpi-ico ok">${nReactivar}</div><div><span>Para reactivar</span><strong>${nReactivar}</strong><small>se pasaron de su ritmo</small></div></article>
  `;
  const counts = { todos: rows.length, resena: nResena, reactivar: nReactivar, ok: nOk };
  document.getElementById("pos-chips").innerHTML = [
    ["todos", "Todos"],
    ["resena", "Reseña"],
    ["reactivar", "Reactivar"],
    ["ok", "En ciclo"],
  ]
    .map(([id, label]) => `<button type="button" class="chip ${filtroPos === id ? "on" : ""}" data-pos-filtro="${id}">${label} ${counts[id]}</button>`)
    .join("");
  const visibles = filtroPos === "todos" ? rows : rows.filter((r) => r.accion.id === filtroPos);
  document.getElementById("pos-lista").innerHTML =
    visibles
      .map((c) => {
        const pct = Math.min(100, Math.round((c.dias / c.frecuencia) * 100));
        return `<article class="card ${selPos === c.id ? "on" : ""}" data-pos-sel="${c.id}">
          <div class="avatar">${esc(iniciales(c.nombre))}</div>
          <div>
            <h3>${esc(c.nombre)}</h3>
            <p class="meta">${esc(c.producto)} · última ${fechaAR(c.ultima)}</p>
            <div class="ciclo"><div class="ciclo-top"><span>${c.dias} de ${c.frecuencia} días</span><span>${pct}%</span></div>
            <div class="track"><div class="fill ${c.accion.id}" style="width:${pct}%"></div></div></div>
          </div>
          <div class="card-side">
            <span class="pill ${c.accion.id}">${c.accion.label}</span>
            <div class="acciones">
              <button type="button" class="sm ghost" data-pos-edit="${c.id}">Editar</button>
              <button type="button" class="sm danger" data-pos-del="${c.id}">Borrar</button>
            </div>
          </div>
        </article>`;
      })
      .join("") || `<p class="hint">No hay clientes en este filtro.</p>`;

  const panel = document.getElementById("pos-preview");
  const c = rows.find((x) => x.id === selPos);
  if (!c) {
    panel.innerHTML = `<div class="preview-empty"><div><div class="orb"></div><h2>Preview de WhatsApp</h2><p>Tocá un cliente para armar el mensaje.</p></div></div>`;
    return;
  }
  const texto = mensajePos(c);
  panel.innerHTML = `
    <div class="preview-head"><div class="avatar">${esc(iniciales(c.nombre))}</div><div><h2>${esc(c.nombre)}</h2><p>${c.accion.label} · ${c.dias} días</p></div></div>
    <div class="chat"><div class="bubble">${esc(texto)}</div></div>
    <div class="preview-foot">
      <button type="button" id="pos-copiar">Copiar mensaje</button>
      <p class="hint">En Etapa 3 este texto sale por Evolution API / Kapso.</p>
    </div>`;
  document.getElementById("pos-copiar").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(texto);
      const btn = document.getElementById("pos-copiar");
      btn.textContent = "Copiado";
      setTimeout(() => { if (btn) btn.textContent = "Copiar mensaje"; }, 1200);
    } catch (_) {}
  });
}

function abrirPos(item) {
  document.getElementById("pos-titulo").textContent = item ? "Editar cliente" : "Nuevo cliente";
  document.getElementById("pos-id").value = item?.id || "";
  document.getElementById("pos-nombre").value = item?.nombre || "";
  document.getElementById("pos-ultima").value = item?.ultima || HOY_ISO;
  document.getElementById("pos-freq").value = item?.frecuencia || 30;
  document.getElementById("pos-prod").value = item?.producto || "";
  document.getElementById("modal-pos").showModal();
}

/* ---------- ROUTER ---------- */
let vista = "inicio";
const renders = {
  inicio: renderInicio,
  financiero: renderFinanciero,
  cobranza: renderCobranza,
  stock: renderStock,
  presupuestos: renderPresupuestos,
  crm: renderCrm,
  tareas: renderTareas,
  postventa: renderPostventa,
};

function renderVista() {
  nombresClientes();
  renders[vista]?.();
  if (vista !== "inicio" && vista !== "financiero") {
    /* keep other charts intact */
  }
}

function show(id) {
  if (!TITULOS[id]) id = "inicio";
  vista = id;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("on", el.id === "view-" + id));
  document.querySelectorAll(".sidebar__nav a").forEach((a) => a.classList.toggle("on", a.dataset.view === id));
  document.getElementById("topTitulo").textContent = TITULOS[id][0];
  document.getElementById("topSub").textContent = TITULOS[id][1];
  document.body.classList.remove("nav-open");
  if (id === "inicio" || id === "financiero") {
    requestAnimationFrame(() => {
      Object.values(charts).forEach((c) => c.resize());
      renderVista();
    });
  } else renderVista();
}

window.addEventListener("hashchange", () => show(location.hash.replace("#", "") || "inicio"));
document.getElementById("btnMenu").addEventListener("click", () => document.body.classList.toggle("nav-open"));
document.getElementById("btnReset").addEventListener("click", () => {
  if (!confirm("¿Volver a los datos de ejemplo? Se pierden los cambios de esta demo.")) return;
  localStorage.removeItem(KEY);
  db = structuredClone(SEED);
  materiales = SEED.presupuestos[0].materiales.map((m) => ({ ...m }));
  editandoPre = null;
  seleccion = new Set();
  filtroPos = "todos";
  selPos = null;
  killCharts(Object.keys(charts));
  cargarPre(SEED.presupuestos[0]);
  show(vista);
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => document.getElementById(btn.dataset.close).close());
});

document.getElementById("fin-nuevo").addEventListener("click", () => abrirFin(null));
document.getElementById("fin-filtro").addEventListener("change", renderFinanciero);
document.getElementById("form-fin").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("fin-id").value || uid("m-"),
    fecha: document.getElementById("fin-fecha").value,
    tipo: document.getElementById("fin-tipo").value,
    categoria: document.getElementById("fin-cat").value.trim(),
    descripcion: document.getElementById("fin-desc").value.trim(),
    monto: Number(document.getElementById("fin-monto").value),
  };
  const i = db.movimientos.findIndex((m) => m.id === item.id);
  if (i >= 0) db.movimientos[i] = item;
  else db.movimientos.push(item);
  save();
  document.getElementById("modal-fin").close();
  renderVista();
});
document.getElementById("fin-tabla").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-fin-edit]");
  const del = e.target.closest("[data-fin-del]");
  if (edit) abrirFin(db.movimientos.find((m) => m.id === edit.dataset.finEdit));
  if (del && confirm("¿Borrar este movimiento?")) {
    db.movimientos = db.movimientos.filter((m) => m.id !== del.dataset.finDel);
    save();
    renderVista();
  }
});

document.getElementById("cob-nuevo").addEventListener("click", () => abrirCob(null));
document.getElementById("form-cob").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("cob-id").value || uid("d-"),
    cliente: document.getElementById("cob-cliente").value.trim(),
    monto: Number(document.getElementById("cob-monto").value),
    vencimiento: document.getElementById("cob-vto").value,
  };
  const i = db.deudas.findIndex((d) => d.id === item.id);
  if (i >= 0) db.deudas[i] = item;
  else db.deudas.push(item);
  save();
  document.getElementById("modal-cob").close();
  renderVista();
});
document.getElementById("cob-tabla").addEventListener("click", (e) => {
  const aviso = e.target.closest("[data-cob-aviso]");
  const edit = e.target.closest("[data-cob-edit]");
  const del = e.target.closest("[data-cob-del]");
  if (aviso) renderCobranzaPreview(deudasEnriquecidas().find((x) => x.id === aviso.dataset.cobAviso));
  if (edit) abrirCob(db.deudas.find((d) => d.id === edit.dataset.cobEdit));
  if (del && confirm("¿Borrar esta cuenta?")) {
    db.deudas = db.deudas.filter((d) => d.id !== del.dataset.cobDel);
    save();
    renderVista();
  }
});

["stk-q", "stk-cat", "stk-prov", "stk-est"].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderStock);
  document.getElementById(id).addEventListener("change", renderStock);
});
document.querySelectorAll(".th-sort").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.sort;
    if (sortKey === key) sortDir *= -1;
    else {
      sortKey = key;
      sortDir = 1;
    }
    renderStock();
  });
});
document.getElementById("stk-nuevo").addEventListener("click", () => abrirStk(null));
document.getElementById("stk-all").addEventListener("change", (e) => {
  const rows = filtradosStock();
  if (e.target.checked) rows.forEach((p) => seleccion.add(p.id));
  else rows.forEach((p) => seleccion.delete(p.id));
  renderStock();
});
document.getElementById("stk-borrar-sel").addEventListener("click", () => {
  if (seleccion.size && confirm(`¿Borrar ${seleccion.size} producto(s)?`)) {
    const ids = [...seleccion];
    db.productos = db.productos.filter((p) => !ids.includes(p.id));
    db.stockMovs = db.stockMovs.filter((m) => !ids.includes(m.productoId));
    ids.forEach((id) => seleccion.delete(id));
    save();
    renderStock();
  }
});
document.getElementById("form-stk").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("stk-id").value || uid("p-");
  const sku = document.getElementById("stk-sku").value.trim().toUpperCase();
  if (db.productos.some((p) => p.sku === sku && p.id !== id)) {
    const err = document.getElementById("stk-error");
    err.hidden = false;
    err.textContent = "Ese SKU ya existe. Tiene que ser único.";
    return;
  }
  const item = {
    id,
    sku,
    nombre: document.getElementById("stk-nombre").value.trim(),
    categoria: document.getElementById("stk-categoria").value,
    proveedor: document.getElementById("stk-proveedor").value.trim(),
    unidad: document.getElementById("stk-unidad").value,
    stock: Number(document.getElementById("stk-stock").value),
    minimo: Number(document.getElementById("stk-min").value),
    precio: Number(document.getElementById("stk-precio").value),
    ubicacion: document.getElementById("stk-ubi").value.trim(),
  };
  const i = db.productos.findIndex((p) => p.id === id);
  const anterior = i >= 0 ? db.productos[i] : null;
  if (i >= 0) db.productos[i] = item;
  else db.productos.push(item);
  if (anterior && anterior.stock !== item.stock) {
    const diff = item.stock - anterior.stock;
    db.stockMovs.push({
      id: uid("mv-"),
      productoId: id,
      tipo: diff > 0 ? "entrada" : "salida",
      cantidad: Math.abs(diff),
      motivo: "Ajuste de inventario",
      fecha: new Date().toISOString(),
    });
  }
  save();
  document.getElementById("modal-stk").close();
  renderStock();
});
document.getElementById("form-mov").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("mov-id").value;
  const tipo = document.getElementById("mov-tipo").value;
  const cantidad = Number(document.getElementById("mov-cant").value);
  const motivo = document.getElementById("mov-motivo").value;
  const p = db.productos.find((x) => x.id === id);
  if (!p || cantidad < 1) return;
  if (tipo === "salida" && cantidad > p.stock) {
    const err = document.getElementById("mov-error");
    err.hidden = false;
    err.textContent = `No hay stock suficiente. Hay ${p.stock} ${p.unidad}(s).`;
    return;
  }
  p.stock = tipo === "entrada" ? p.stock + cantidad : p.stock - cantidad;
  db.stockMovs.push({ id: uid("mv-"), productoId: p.id, tipo, cantidad, motivo, fecha: new Date().toISOString() });
  if (motivo === "Venta") {
    registrarFinanciero({ tipo: "ingreso", categoria: CAT_VENTA_STOCK, descripcion: `Venta stock · ${p.nombre} x${cantidad}`, monto: p.precio * cantidad });
  }
  if (motivo === "Compra a proveedor") {
    registrarFinanciero({ tipo: "egreso", categoria: CAT_COMPRA[p.categoria] || "Químicos y solventes", descripcion: `Compra · ${p.nombre} x${cantidad}`, monto: p.precio * cantidad });
  }
  save();
  document.getElementById("modal-mov").close();
  renderStock();
});
document.getElementById("stk-tabla").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-stk-edit]");
  const del = e.target.closest("[data-stk-del]");
  const inn = e.target.closest("[data-stk-in]");
  const out = e.target.closest("[data-stk-out]");
  if (edit) abrirStk(db.productos.find((p) => p.id === edit.dataset.stkEdit));
  if (del && confirm("¿Borrar este producto y su historial?")) {
    const id = del.dataset.stkDel;
    db.productos = db.productos.filter((p) => p.id !== id);
    db.stockMovs = db.stockMovs.filter((m) => m.productoId !== id);
    seleccion.delete(id);
    save();
    renderStock();
  }
  if (inn) abrirMov(db.productos.find((p) => p.id === inn.dataset.stkIn), "entrada");
  if (out) abrirMov(db.productos.find((p) => p.id === out.dataset.stkOut), "salida");
});
document.getElementById("stk-tabla").addEventListener("change", (e) => {
  const box = e.target.closest("[data-stk-check]");
  if (!box) return;
  if (box.checked) seleccion.add(box.dataset.stkCheck);
  else seleccion.delete(box.dataset.stkCheck);
  renderStock();
});

document.getElementById("pre-form").addEventListener("input", (e) => {
  const input = e.target;
  if (input.dataset.k) {
    materiales[Number(input.dataset.i)][input.dataset.k] = input.dataset.k === "costo" ? Number(input.value) : input.value;
  }
  renderPreDoc();
});
document.getElementById("pre-materiales").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-pre-del]");
  if (!btn) return;
  materiales.splice(Number(btn.dataset.preDel), 1);
  renderPreMateriales();
  renderPreDoc();
});
document.getElementById("pre-add").addEventListener("click", () => {
  materiales.push({ nombre: "Prenda o servicio nuevo", costo: 0 });
  renderPreMateriales();
  renderPreDoc();
});
document.getElementById("pre-guardar").addEventListener("click", () => {
  const d = leerPre();
  if (editandoPre) {
    const i = db.presupuestos.findIndex((p) => p.id === editandoPre);
    db.presupuestos[i] = { id: editandoPre, ...d };
  } else {
    db.presupuestos.push({ id: uid("pr-"), ...d });
  }
  leadDesdePresupuesto(d);
  save();
  editandoPre = null;
  renderPreHistorial();
});
document.getElementById("pre-nuevo").addEventListener("click", () => {
  editandoPre = null;
  cargarPre({ cliente: "", producto: "", cantidad: 1, manoObra: 0, materiales: [{ nombre: "", costo: 0 }] });
});
document.getElementById("pre-tabla").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-pre-edit]");
  const del = e.target.closest("[data-pre-del]");
  if (edit) {
    const p = db.presupuestos.find((x) => x.id === edit.dataset.preEdit);
    editandoPre = p.id;
    cargarPre(p);
  }
  if (del && confirm("¿Borrar este presupuesto?")) {
    db.presupuestos = db.presupuestos.filter((p) => p.id !== del.dataset.preDel);
    if (editandoPre === del.dataset.preDel) editandoPre = null;
    save();
    renderPreHistorial();
  }
});
document.getElementById("pre-print").addEventListener("click", () => window.print());

document.getElementById("crm-nuevo").addEventListener("click", () => abrirCrm(null));
document.getElementById("form-crm").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("crm-id").value || uid("l-"),
    nombre: document.getElementById("crm-nombre").value.trim(),
    origen: document.getElementById("crm-origen").value,
    detalle: document.getElementById("crm-detalle").value.trim(),
    etapa: document.getElementById("crm-etapa").value,
    dias: 0,
  };
  const i = db.leads.findIndex((l) => l.id === item.id);
  if (i >= 0) db.leads[i] = { ...db.leads[i], ...item };
  else db.leads.push(item);
  save();
  document.getElementById("modal-crm").close();
  renderCrm();
});
document.getElementById("crm-tablero").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-crm-edit]");
  const del = e.target.closest("[data-crm-del]");
  if (edit) abrirCrm(db.leads.find((l) => l.id === edit.dataset.crmEdit));
  if (del && confirm("¿Borrar este lead?")) {
    db.leads = db.leads.filter((l) => l.id !== del.dataset.crmDel);
    save();
    renderCrm();
  }
});

document.getElementById("tar-nuevo").addEventListener("click", () => abrirTar(null));
document.getElementById("form-tar").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("tar-id").value || uid("t-"),
    titulo: document.getElementById("tar-tit").value.trim(),
    persona: document.getElementById("tar-persona").value.trim(),
    prioridad: document.getElementById("tar-prio").value,
    limite: document.getElementById("tar-limite").value,
    estado: document.getElementById("tar-estado").value,
  };
  const i = db.tareas.findIndex((t) => t.id === item.id);
  if (i >= 0) db.tareas[i] = item;
  else db.tareas.push(item);
  save();
  document.getElementById("modal-tar").close();
  renderTareas();
});
document.getElementById("tar-tablero").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-tar-edit]");
  const del = e.target.closest("[data-tar-del]");
  if (edit) abrirTar(db.tareas.find((t) => t.id === edit.dataset.tarEdit));
  if (del && confirm("¿Borrar esta tarea?")) {
    db.tareas = db.tareas.filter((t) => t.id !== del.dataset.tarDel);
    save();
    renderTareas();
  }
});

document.getElementById("pos-nuevo").addEventListener("click", () => abrirPos(null));
document.getElementById("form-pos").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("pos-id").value || uid("c-"),
    nombre: document.getElementById("pos-nombre").value.trim(),
    ultima: document.getElementById("pos-ultima").value,
    frecuencia: Number(document.getElementById("pos-freq").value),
    producto: document.getElementById("pos-prod").value.trim(),
  };
  const i = db.clientes.findIndex((c) => c.id === item.id);
  if (i >= 0) db.clientes[i] = item;
  else db.clientes.push(item);
  selPos = item.id;
  save();
  document.getElementById("modal-pos").close();
  renderPostventa();
});
document.getElementById("pos-chips").addEventListener("click", (e) => {
  const chip = e.target.closest("[data-pos-filtro]");
  if (!chip) return;
  filtroPos = chip.dataset.posFiltro;
  renderPostventa();
});
document.getElementById("pos-lista").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-pos-edit]");
  const del = e.target.closest("[data-pos-del]");
  if (edit) {
    e.stopPropagation();
    abrirPos(db.clientes.find((c) => c.id === edit.dataset.posEdit));
    return;
  }
  if (del) {
    e.stopPropagation();
    if (confirm("¿Borrar este cliente?")) {
      db.clientes = db.clientes.filter((c) => c.id !== del.dataset.posDel);
      if (selPos === del.dataset.posDel) selPos = null;
      save();
      renderPostventa();
    }
    return;
  }
  const card = e.target.closest("[data-pos-sel]");
  if (card) {
    selPos = card.dataset.posSel;
    renderPostventa();
  }
});

Chart.defaults.font.family = "Poppins, system-ui, sans-serif";
Chart.defaults.color = "#565B66";
Chart.defaults.plugins.legend.labels.usePointStyle = true;

show(location.hash.replace("#", "") || "inicio");

const KEY = "m6-financiero-movimientos-v2";
const SEED = [
  { id: "m1", fecha: "2026-08-03", tipo: "ingreso", categoria: "Ventas", descripcion: "Mesa de comedor 6 pax", monto: 185000 },
  { id: "m2", fecha: "2026-08-03", tipo: "egreso", categoria: "Materiales", descripcion: "Madera de paraíso", monto: 42000 },
  { id: "m3", fecha: "2026-08-05", tipo: "ingreso", categoria: "Ventas", descripcion: "Sillas tapizadas x4", monto: 96000 },
  { id: "m4", fecha: "2026-08-06", tipo: "egreso", categoria: "Servicios", descripcion: "Luz y gas del taller", monto: 38000 },
  { id: "m5", fecha: "2026-08-07", tipo: "ingreso", categoria: "Servicios", descripcion: "Restauración de aparador", monto: 54000 },
  { id: "m6", fecha: "2026-08-10", tipo: "egreso", categoria: "Sueldos", descripcion: "Pago semanal a tapicero", monto: 80000 },
  { id: "m7", fecha: "2026-08-11", tipo: "ingreso", categoria: "Ventas", descripcion: "Biblioteca a medida", monto: 220000 },
  { id: "m8", fecha: "2026-08-12", tipo: "egreso", categoria: "Materiales", descripcion: "Herrajes y laca", monto: 27500 },
  { id: "m9", fecha: "2026-08-13", tipo: "ingreso", categoria: "Ventas", descripcion: "Mesa ratona", monto: 67000 },
  { id: "m10", fecha: "2026-08-14", tipo: "egreso", categoria: "Marketing", descripcion: "Pauta Instagram", monto: 15000 },
  { id: "m11", fecha: "2026-08-18", tipo: "ingreso", categoria: "Ventas", descripcion: "Aparador de living", monto: 148000 },
  { id: "m12", fecha: "2026-08-19", tipo: "egreso", categoria: "Sueldos", descripcion: "Pago semanal a tapicero", monto: 80000 },
  { id: "m13", fecha: "2026-08-20", tipo: "egreso", categoria: "Materiales", descripcion: "Telas para tapizado", monto: 31000 },
  { id: "m14", fecha: "2026-08-21", tipo: "ingreso", categoria: "Servicios", descripcion: "Reparación de sillas", monto: 42000 },
  { id: "m15", fecha: "2026-08-25", tipo: "ingreso", categoria: "Ventas", descripcion: "Juego de mesas de luz", monto: 89000 },
  { id: "m16", fecha: "2026-08-26", tipo: "egreso", categoria: "Marketing", descripcion: "Fotos de catálogo", monto: 22000 },
  { id: "m17", fecha: "2026-08-27", tipo: "egreso", categoria: "Servicios", descripcion: "Flete de entregas", monto: 18500 },
];

const PALETA = ["#203E7F", "#EF7A1E", "#6F86B8", "#F6A862", "#2E9E5B", "#D64545", "#1B356B", "#B8550E"];
const NAVY = "#203E7F";
const ORANGE = "#EF7A1E";

const pesos = (n) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => "m-" + Date.now().toString(36);
const colorDe = (i) => PALETA[i % PALETA.length];

Chart.defaults.font.family = "Poppins, system-ui, sans-serif";
Chart.defaults.color = "#565B66";
Chart.defaults.plugins.legend.labels.usePointStyle = true;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return SEED;
}

let movimientos = load();
const charts = {};

function persist() {
  localStorage.setItem(KEY, JSON.stringify(movimientos));
}

function semanaDelMes(fechaIso) {
  const dia = Number(fechaIso.slice(8, 10));
  return Math.min(3, Math.floor((dia - 1) / 7));
}

function tot(tipo) {
  return movimientos.filter((m) => m.tipo === tipo).reduce((a, m) => a + m.monto, 0);
}

function porCategoria(tipo) {
  const map = {};
  movimientos
    .filter((m) => m.tipo === tipo)
    .forEach((m) => {
      map[m.categoria] = (map[m.categoria] || 0) + m.monto;
    });
  const labels = Object.keys(map);
  return { labels, data: labels.map((k) => map[k]), colors: labels.map((_, i) => colorDe(i)) };
}

function volumenCategorias() {
  const map = {};
  movimientos.forEach((m) => {
    map[m.categoria] = (map[m.categoria] || 0) + m.monto;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function serieDiaria() {
  const ordenados = [...movimientos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  const labels = [];
  const balance = [];
  const ingAcc = [];
  const egrAcc = [];
  let b = 0;
  let ing = 0;
  let egr = 0;
  ordenados.forEach((m) => {
    if (m.tipo === "ingreso") {
      b += m.monto;
      ing += m.monto;
    } else {
      b -= m.monto;
      egr += m.monto;
    }
    labels.push(new Date(m.fecha + "T12:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }));
    balance.push(b);
    ingAcc.push(ing);
    egrAcc.push(egr);
  });
  return { labels, balance, ingAcc, egrAcc };
}

function upsert(id, config) {
  if (charts[id]) {
    charts[id].data = config.data;
    charts[id].update();
    return;
  }
  charts[id] = new Chart(document.getElementById(id), config);
}

function renderKpis() {
  const ingresos = tot("ingreso");
  const egresos = tot("egreso");
  document.getElementById("kpis").innerHTML = `
    <article class="kpi ingreso"><span>Ingresos del mes</span><strong>${pesos(ingresos)}</strong></article>
    <article class="kpi egreso"><span>Egresos del mes</span><strong>${pesos(egresos)}</strong></article>
    <article class="kpi balance"><span>Balance</span><strong>${pesos(ingresos - egresos)}</strong></article>
  `;
}

function renderFiltro() {
  const actual = document.getElementById("filtroCategoria").value || "Todas";
  const categorias = ["Todas", ...new Set(movimientos.map((m) => m.categoria))];
  document.getElementById("filtroCategoria").innerHTML = categorias
    .map((c) => `<option ${c === actual ? "selected" : ""}>${esc(c)}</option>`)
    .join("");
}

function renderTabla() {
  const filtro = document.getElementById("filtroCategoria").value || "Todas";
  const filas = movimientos.filter((m) => filtro === "Todas" || m.categoria === filtro);
  document.getElementById("tablaMovimientos").innerHTML = filas
    .map(
      (m) => `
      <tr>
        <td>${new Date(m.fecha + "T12:00:00").toLocaleDateString("es-AR")}</td>
        <td><span class="pill ${m.tipo}">${m.tipo}</span></td>
        <td>${esc(m.categoria)}</td>
        <td>${esc(m.descripcion)}</td>
        <td class="num">${m.tipo === "egreso" ? "−" : "+"}${pesos(m.monto)}</td>
        <td>
          <div class="acciones">
            <button type="button" class="sm ghost" data-edit="${m.id}">Editar</button>
            <button type="button" class="sm danger" data-del="${m.id}">Borrar</button>
          </div>
        </td>
      </tr>`
    )
    .join("");
}

function renderCharts() {
  const ingresosSem = [0, 0, 0, 0];
  const egresosSem = [0, 0, 0, 0];
  movimientos.forEach((m) => {
    const i = semanaDelMes(m.fecha);
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

  const diaria = serieDiaria();
  upsert("chartLinea", {
    type: "line",
    data: {
      labels: diaria.labels,
      datasets: [
        {
          label: "Balance",
          data: diaria.balance,
          borderColor: NAVY,
          backgroundColor: "rgba(32,62,127,.12)",
          fill: false,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: ORANGE,
        },
      ],
    },
    options: { ...common, scales: ticksMil },
  });

  upsert("chartArea", {
    type: "line",
    data: {
      labels: diaria.labels,
      datasets: [
        {
          label: "Ingresos acum.",
          data: diaria.ingAcc,
          borderColor: NAVY,
          backgroundColor: "rgba(32,62,127,.22)",
          fill: true,
          tension: 0.35,
          pointRadius: 0,
        },
        {
          label: "Egresos acum.",
          data: diaria.egrAcc,
          borderColor: ORANGE,
          backgroundColor: "rgba(239,122,30,.22)",
          fill: true,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: { ...common, scales: ticksMil },
  });

  const ingCat = porCategoria("ingreso");
  upsert("chartTorta", {
    type: "pie",
    data: {
      labels: ingCat.labels,
      datasets: [{ data: ingCat.data, backgroundColor: ingCat.colors, borderWidth: 0 }],
    },
    options: common,
  });

  const egrCat = porCategoria("egreso");
  upsert("chartDona", {
    type: "doughnut",
    data: {
      labels: egrCat.labels,
      datasets: [{ data: egrCat.data, backgroundColor: egrCat.colors, borderWidth: 0 }],
    },
    options: { ...common, cutout: "62%" },
  });

  const ingresos = tot("ingreso");
  const egresos = tot("egreso");
  const ratio = ingresos ? Math.round((egresos / ingresos) * 100) : 0;
  const resto = Math.max(0, 100 - ratio);
  document.getElementById("gaugeLabel").innerHTML = `<strong>${ratio}%</strong><span>del ingreso</span>`;
  upsert("chartGauge", {
    type: "doughnut",
    data: {
      labels: ["Gastado", "Disponible"],
      datasets: [{ data: [Math.min(ratio, 100), resto], backgroundColor: [ORANGE, "#E4E7EC"], borderWidth: 0 }],
    },
    options: {
      ...common,
      rotation: -90,
      circumference: 180,
      cutout: "78%",
      plugins: { legend: { display: false } },
    },
  });

  const ranking = volumenCategorias();
  upsert("chartHorizontal", {
    type: "bar",
    data: {
      labels: ranking.map(([k]) => k),
      datasets: [{ label: "Volumen", data: ranking.map(([, v]) => v), backgroundColor: ranking.map((_, i) => colorDe(i)), borderRadius: 6 }],
    },
    options: {
      ...common,
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { callback: (v) => "$" + (v / 1000).toFixed(0) + " mil" } } },
    },
  });

  upsert("chartPolar", {
    type: "polarArea",
    data: {
      labels: ranking.map(([k]) => k),
      datasets: [{ data: ranking.map(([, v]) => v), backgroundColor: ranking.map((_, i) => colorDe(i) + "cc") }],
    },
    options: common,
  });
}

function render() {
  renderKpis();
  renderFiltro();
  renderTabla();
  renderCharts();
}

const modal = document.getElementById("modal");

function abrir(item) {
  document.getElementById("modalTitulo").textContent = item ? "Editar movimiento" : "Nuevo movimiento";
  document.getElementById("editId").value = item?.id || "";
  document.getElementById("fecha").value = item?.fecha || "2026-08-14";
  document.getElementById("tipo").value = item?.tipo || "ingreso";
  document.getElementById("categoria").value = item?.categoria || "";
  document.getElementById("descripcion").value = item?.descripcion || "";
  document.getElementById("monto").value = item?.monto || "";
  modal.showModal();
}

document.getElementById("btnNuevo").addEventListener("click", () => abrir(null));
document.getElementById("btnCancelar").addEventListener("click", () => modal.close());
document.getElementById("filtroCategoria").addEventListener("change", renderTabla);

document.getElementById("formAbm").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("editId").value || uid(),
    fecha: document.getElementById("fecha").value,
    tipo: document.getElementById("tipo").value,
    categoria: document.getElementById("categoria").value.trim(),
    descripcion: document.getElementById("descripcion").value.trim(),
    monto: Number(document.getElementById("monto").value),
  };
  const i = movimientos.findIndex((m) => m.id === item.id);
  if (i >= 0) movimientos[i] = item;
  else movimientos.push(item);
  persist();
  modal.close();
  render();
});

document.getElementById("tablaMovimientos").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]");
  const del = e.target.closest("[data-del]");
  if (edit) abrir(movimientos.find((m) => m.id === edit.dataset.edit));
  if (del && confirm("¿Borrar este movimiento?")) {
    movimientos = movimientos.filter((m) => m.id !== del.dataset.del);
    persist();
    render();
  }
});

render();

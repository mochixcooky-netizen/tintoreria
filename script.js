const KEY = "m6-presupuestos";
const pesos = (n) =>
  (Number(n) || 0).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => "pr-" + Date.now().toString(36);

const SEED = [
  {
    id: "pr1",
    cliente: "Familia Pérez",
    producto: "Mesa de comedor 6 pax",
    cantidad: 1,
    manoObra: 85000,
    materiales: [
      { nombre: "Madera de paraíso", costo: 42000 },
      { nombre: "Laca y herrajes", costo: 18500 },
    ],
  },
];

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return SEED;
}

let presupuestos = load();
let editandoId = null;
let materiales = SEED[0].materiales.map((m) => ({ ...m }));
const contenedor = document.getElementById("materiales");

function persist() {
  localStorage.setItem(KEY, JSON.stringify(presupuestos));
}

function totalDe(d) {
  const subMat = d.materiales.reduce((a, m) => a + (Number(m.costo) || 0), 0);
  return (subMat + (Number(d.manoObra) || 0)) * (Number(d.cantidad) || 1);
}

function leerForm() {
  return {
    cliente: document.getElementById("cliente").value,
    producto: document.getElementById("producto").value,
    cantidad: Number(document.getElementById("cantidad").value) || 1,
    manoObra: Number(document.getElementById("manoObra").value) || 0,
    materiales: materiales.map((m) => ({ ...m })),
  };
}

function cargarForm(d) {
  document.getElementById("cliente").value = d.cliente;
  document.getElementById("producto").value = d.producto;
  document.getElementById("cantidad").value = d.cantidad;
  document.getElementById("manoObra").value = d.manoObra;
  materiales = d.materiales.map((m) => ({ ...m }));
  renderMateriales();
  renderDoc();
}

function renderMateriales() {
  contenedor.innerHTML = materiales
    .map(
      (m, i) => `
      <div class="fila">
        <input data-i="${i}" data-k="nombre" value="${esc(m.nombre)}" />
        <input data-i="${i}" data-k="costo" type="number" min="0" value="${m.costo}" />
        <button type="button" class="icon" data-del="${i}">×</button>
      </div>`
    )
    .join("");
}

function renderDoc() {
  const d = leerForm();
  const filas = d.materiales
    .map((m) => `<tr><td>${esc(m.nombre) || "—"}</td><td class="num">${pesos(m.costo)}</td></tr>`)
    .join("");
  document.getElementById("doc").innerHTML = `
    <div class="doc-head">
      <div>
        <h3>Presupuesto</h3>
        <p>${esc(d.cliente)}</p>
      </div>
      <div>
        <p>14/08/2026</p>
        <p>Válido 15 días</p>
      </div>
    </div>
    <p><strong>${esc(d.producto)}</strong> · cantidad ${d.cantidad}</p>
    <table>
      <thead><tr><th>Ítem</th><th class="num">Importe</th></tr></thead>
      <tbody>
        ${filas}
        <tr><td>Mano de obra</td><td class="num">${pesos(d.manoObra)}</td></tr>
      </tbody>
    </table>
    <p class="total">Total ${pesos(totalDe(d))}</p>
  `;
}

function renderHistorial() {
  document.getElementById("tablaPresupuestos").innerHTML = presupuestos
    .map(
      (p) => `
      <tr>
        <td>${esc(p.cliente)}</td>
        <td>${esc(p.producto)}</td>
        <td>${p.cantidad}</td>
        <td class="num">${pesos(totalDe(p))}</td>
        <td>
          <div class="acciones">
            <button type="button" class="sm ghost" data-edit="${p.id}">Editar</button>
            <button type="button" class="sm danger" data-del="${p.id}">Borrar</button>
          </div>
        </td>
      </tr>`
    )
    .join("");
}

document.getElementById("formulario").addEventListener("input", (e) => {
  const input = e.target;
  if (input.dataset.k) {
    const i = Number(input.dataset.i);
    materiales[i][input.dataset.k] = input.dataset.k === "costo" ? Number(input.value) : input.value;
  }
  renderDoc();
});

contenedor.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-del]");
  if (!btn) return;
  materiales.splice(Number(btn.dataset.del), 1);
  renderMateriales();
  renderDoc();
});

document.getElementById("addMaterial").addEventListener("click", () => {
  materiales.push({ nombre: "Material nuevo", costo: 0 });
  renderMateriales();
  renderDoc();
});

document.getElementById("btnGuardar").addEventListener("click", () => {
  const d = leerForm();
  if (editandoId) {
    const i = presupuestos.findIndex((p) => p.id === editandoId);
    presupuestos[i] = { id: editandoId, ...d };
  } else {
    presupuestos.push({ id: uid(), ...d });
  }
  persist();
  editandoId = null;
  renderHistorial();
});

document.getElementById("btnNuevo").addEventListener("click", () => {
  editandoId = null;
  cargarForm({
    cliente: "",
    producto: "",
    cantidad: 1,
    manoObra: 0,
    materiales: [{ nombre: "", costo: 0 }],
  });
});

document.getElementById("tablaPresupuestos").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]");
  const del = e.target.closest("[data-del]");
  if (edit) {
    const p = presupuestos.find((x) => x.id === edit.dataset.edit);
    editandoId = p.id;
    cargarForm(p);
  }
  if (del && confirm("¿Borrar este presupuesto?")) {
    presupuestos = presupuestos.filter((p) => p.id !== del.dataset.del);
    if (editandoId === del.dataset.del) editandoId = null;
    persist();
    renderHistorial();
  }
});

document.getElementById("btnImprimir").addEventListener("click", () => window.print());

renderMateriales();
renderDoc();
renderHistorial();

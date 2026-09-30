const KEY = "m6-crm-leads";
const ETAPAS = [
  { id: "nuevo", nombre: "Nuevo" },
  { id: "contactado", nombre: "Contactado" },
  { id: "interesado", nombre: "Interesado" },
  { id: "esperando", nombre: "Esperando respuesta" },
  { id: "cerrado", nombre: "Cerrado / Perdido" },
];
const SEED = [
  { id: "l1", nombre: "Lucía Benítez", origen: "Instagram", detalle: "Consulta mesa a medida", etapa: "nuevo", dias: 0 },
  { id: "l2", nombre: "Consorcio 9 de Julio", origen: "WhatsApp", detalle: "Presupuesto de herrería", etapa: "nuevo", dias: 1 },
  { id: "l3", nombre: "Martín Vidal", origen: "Web", detalle: "Sesión de fotos de evento", etapa: "contactado", dias: 2 },
  { id: "l4", nombre: "Hotel Felino Miau", origen: "Referido", detalle: "Plan mensual de hospedaje", etapa: "interesado", dias: 3 },
  { id: "l5", nombre: "Textil Norte", origen: "Feria", detalle: "Pedido mayorista de tela", etapa: "esperando", dias: 6 },
  { id: "l6", nombre: "Club del Sur", origen: "WhatsApp", detalle: "Auspicio de temporada", etapa: "esperando", dias: 8 },
  { id: "l7", nombre: "Ana Rossi", origen: "Instagram", detalle: "Sillones para living", etapa: "cerrado", dias: 12 },
];

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => "l-" + Date.now().toString(36);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return SEED;
}

let leads = load();
let draggingId = null;

function persist() {
  localStorage.setItem(KEY, JSON.stringify(leads));
}

function render() {
  document.getElementById("tablero").innerHTML = ETAPAS.map((col) => {
    const cards = leads.filter((l) => l.etapa === col.id);
    return `
      <section class="columna" data-col="${col.id}">
        <header>
          <h2>${col.nombre}</h2>
          <span class="count">${cards.length}</span>
        </header>
        ${cards
          .map(
            (l) => `
          <article class="tarjeta" draggable="true" data-id="${l.id}">
            <h3>${esc(l.nombre)}</h3>
            <p>${esc(l.detalle)}</p>
            <p>${l.dias} día${l.dias === 1 ? "" : "s"} sin mover</p>
            <span class="origen">${esc(l.origen)}</span>
            <div class="acciones">
              <button type="button" class="sm ghost" data-edit="${l.id}">Editar</button>
              <button type="button" class="sm danger" data-del="${l.id}">Borrar</button>
            </div>
          </article>`
          )
          .join("")}
      </section>`;
  }).join("");

  document.querySelectorAll(".tarjeta").forEach((el) => {
    el.addEventListener("dragstart", () => {
      draggingId = el.dataset.id;
    });
  });

  document.querySelectorAll(".columna").forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("over");
    });
    col.addEventListener("dragleave", () => col.classList.remove("over"));
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("over");
      const lead = leads.find((l) => l.id === draggingId);
      if (lead) {
        lead.etapa = col.dataset.col;
        lead.dias = 0;
        persist();
        render();
      }
    });
  });
}

const modal = document.getElementById("modal");

function abrir(item) {
  document.getElementById("modalTitulo").textContent = item ? "Editar lead" : "Nuevo lead";
  document.getElementById("editId").value = item?.id || "";
  document.getElementById("nombre").value = item?.nombre || "";
  document.getElementById("origen").value = item?.origen || "WhatsApp";
  document.getElementById("detalle").value = item?.detalle || "";
  document.getElementById("etapa").value = item?.etapa || "nuevo";
  modal.showModal();
}

document.getElementById("btnNuevo").addEventListener("click", () => abrir(null));
document.getElementById("btnCancelar").addEventListener("click", () => modal.close());

document.getElementById("formAbm").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: document.getElementById("editId").value || uid(),
    nombre: document.getElementById("nombre").value.trim(),
    origen: document.getElementById("origen").value,
    detalle: document.getElementById("detalle").value.trim(),
    etapa: document.getElementById("etapa").value,
    dias: 0,
  };
  const i = leads.findIndex((l) => l.id === item.id);
  if (i >= 0) leads[i] = { ...leads[i], ...item };
  else leads.push(item);
  persist();
  modal.close();
  render();
});

document.getElementById("tablero").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]");
  const del = e.target.closest("[data-del]");
  if (edit) abrir(leads.find((l) => l.id === edit.dataset.edit));
  if (del && confirm("¿Borrar este lead?")) {
    leads = leads.filter((l) => l.id !== del.dataset.del);
    persist();
    render();
  }
});

render();

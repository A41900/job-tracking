const STATUS_COLORS = {
  applied: "#4f83cc",
  under_review: "#9b59b6",
  interview: "#f1c40f",
  offer: "#2ecc71",
  rejected: "#e74c3c",
  draft: "#7b7a7a",
};

function getStatusCounts(applications) {
  return applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
}

export function renderApplications(applications, viewMode) {
  const tableContainer = document.getElementById("container-table");
  const cardsContainer = document.getElementById("container-cards");

  tableContainer.innerHTML = "";
  cardsContainer.innerHTML = "";

  if (viewMode === "table") {
    tableContainer.classList.remove("hidden");
    cardsContainer.classList.add("hidden");
    renderTable(applications, tableContainer);
  } else {
    cardsContainer.classList.remove("hidden");
    tableContainer.classList.add("hidden");
    renderCards(applications, cardsContainer);
  }
}

function renderTable(applications, root) {
  const table = document.createElement("table");

  table.append(renderTableHeader(), renderTableBody(applications));

  root.appendChild(table);
}

function renderTableHeader() {
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Company</th>
      <th>Seniority</th>
      <th>Position</th>
      <th>Role</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  `;
  return thead;
}

function renderTableBody(applications) {
  const tbody = document.createElement("tbody");

  applications.forEach((app) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${app.company}</td>
      <td>${app.seniority}</td>
      <td>${app.position}</td>
      <td>${app.role}</td>
      <td>${app.status}</td>
      <td>${app.appliedAt}</td>
    `;
    tbody.appendChild(tr);
  });

  return tbody;
}

export function renderStatusChart(applications) {
  const root = document.getElementById("status-chart");
  root.innerHTML = "";

  const counts = getStatusCounts(applications);

  const chart = document.createElement("div");
  chart.className = "chart";

  const legend = document.createElement("div");
  legend.className = "chart-legend";

  renderDonut(counts, applications.length, chart);
  renderLegend(counts, legend);

  root.append(chart, legend);
}

function renderDonut(counts, total, root) {
  root.innerHTML = "";
  if (!total) return;

  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  let offset = 0;

  Object.entries(counts).forEach(([status, count]) => {
    const value = (count / total) * circumference;

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", size / 2);
    circle.setAttribute("cy", size / 2);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", STATUS_COLORS[status] || "#ccc");
    circle.setAttribute("stroke-width", strokeWidth);
    circle.setAttribute(
      "stroke-dasharray",
      `${value} ${circumference - value}`
    );
    circle.setAttribute("stroke-dashoffset", -offset);
    circle.setAttribute("transform", `rotate(-90 ${size / 2} ${size / 2})`);

    svg.appendChild(circle);
    offset += value;
  });

  // center text
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", size / 2);
  text.setAttribute("y", size / 2);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("font-size", "28");
  text.setAttribute("font-weight", "600");
  text.textContent = total;

  const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
  sub.setAttribute("x", size / 2);
  sub.setAttribute("y", size / 2 + 22);
  sub.setAttribute("text-anchor", "middle");
  sub.setAttribute("font-size", "12");
  sub.setAttribute("fill", "#666");
  sub.textContent = "Total";

  svg.append(text, sub);
  root.appendChild(svg);
}

function renderLegend(counts, root) {
  Object.keys(counts).forEach((status) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    item.innerHTML = `
      <span class="legend-dot" style="background:${
        STATUS_COLORS[status]
      }"></span>
      <span>${status.replace("_", " ")}</span>
    `;

    root.appendChild(item);
  });
}

function renderCards(applications, root) {
  applications.forEach((app) => {
    root.appendChild(renderCard(app));
  });
}

function renderCard(app) {
  const div = document.createElement("div");
  div.className = "application-card";
  console.log(app.status);
  div.innerHTML = `
    <div class="card-header">
      <span class="status-pill status-${app.status}">
        ${app.status.replace("_", " ")}
      </span>
    </div>

    <h3>${app.position}</h3>
    <p class="company">${app.company}</p>

    <button class="toggle-notes">View notes</button>
    <div class="notes hidden">${renderNotes(app.notes)}</div>
  `;

  setupNotesToggle(div);
  return div;
}

function setupNotesToggle(card) {
  const btn = card.querySelector(".toggle-notes");
  const notes = card.querySelector(".notes");

  btn.addEventListener("click", () => {
    notes.classList.toggle("hidden");
    btn.textContent = notes.classList.contains("hidden")
      ? "View notes"
      : "Hide notes";
  });
}

function renderNotes(notes = []) {
  if (!notes.length) return "<p class='empty-notes'>No notes</p>";

  return `
    <ul class="notes-list">
      ${notes.map((n) => `<li>${n}</li>`).join("")}
    </ul>
  `;
}

export function renderButtons(apps) {
  let btnsPos = [];
  let btnsComp = [];

  apps.forEach((element) => {
    if (!btnsPos.includes(element.position)) btnsPos.push(element.position);
    if (!btnsPos.includes(element.company)) btnsComp.push(element.company);
  });

  const pos = document.getElementById("filter-position");
  pos.innerHTML = `
    <option value="" disabled selected hidden>Position</option>
  `;

  const comp = document.getElementById("filter-company");
  comp.innerHTML = `
  <option value="" disabled selected hidden>Company</option>`;

  btnsPos.forEach((e) => {
    pos.innerHTML += `<option value="${e}">${e}</option>`;
  });

  btnsComp.forEach((e) => {
    comp.innerHTML += `<option value="${e}">${e}</option>`;
  });
}

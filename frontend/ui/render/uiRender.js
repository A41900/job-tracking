export const STATUS_COLORS = {
  applied: "#4f83cc",
  under_review: "#9b59b6",
  interview: "#f1c40f",
  offer: "#2ecc71",
  rejected: "#e74c3c",
  draft: "#7b7a7a",
};

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

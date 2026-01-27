export function renderTable(applications, root) {
  const table = document.createElement("table");
  table.append(renderTableHeader(), renderTableBody(applications));
  root.appendChild(table);
}

function renderTableBody(applications) {
  const tbody = document.createElement("tbody");

  applications.forEach((app) => {
    const tr = document.createElement("tr");

    tr.append(
      td(app.company),
      td(app.seniority),
      td(app.position),
      td(app.role),
      td(app.status),
      td(app.appliedAt),
    );

    tbody.appendChild(tr);
  });

  return tbody;
}

function td(value) {
  const td = document.createElement("td");
  td.textContent = value ?? "";
  return td;
}

function renderTableHeader() {
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th data-sort="company" class="sortable">Company <span class="sort-arrow">↕</span></th>
      <th data-sort="seniority" class="sortable">Seniority <span class="sort-arrow">↕</span></th>
      <th data-sort="position" class="sortable">Position <span class="sort-arrow">↕</span></th>
      <th data-sort="role" class="sortable">Role <span class="sort-arrow">↕</span></th>
      <th data-sort="status" class="sortable">Status <span class="sort-arrow">↕</span></th>
      <th data-sort="appliedAt" class="sortable">Date <span class="sort-arrow">↕</span></th>
    </tr>
  `;
  return thead;
}

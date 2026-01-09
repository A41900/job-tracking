export function renderApplications(applications) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const table = document.createElement("table");

  // header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Empresa</th>
      <th>Vaga</th>
      <th>Status</th>
      <th>Data</th>
    </tr>
  `;

  // body
  const tbody = document.createElement("tbody");

  applications.forEach((app) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td>${app.status}</td>
      <td>${app.appliedAt}</td>
    `;

    tbody.appendChild(row);
  });

  table.append(thead, tbody);
  root.appendChild(table);
}

export function renderApplicationsOld(applications) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  applications.forEach((app) => {
    const div = document.createElement("div");

    const card = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = app.company;

    const role = document.createElement("p");
    role.textContent = app.role;

    const status = document.createElement("span");
    status.textContent = app.status;

    card.append(title, role, status);
    root.appendChild(card);
  });
}

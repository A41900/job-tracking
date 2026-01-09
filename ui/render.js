const colors = {
  applied: "#4f83cc",
  under_review: "#9b59b6",
  interview: "#f1c40f",
  offer: "#2ecc71",
  rejected: "#e74c3c",
};

export function renderApplications(applications) {
  const root = document.getElementById("applications-list");
  root.innerHTML = "";

  const table = document.createElement("table");
  // header
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

  // body
  const tbody = document.createElement("tbody");

  applications.forEach((app) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.seniority}</td>
      <td>${app.position}</td>
      <td>${app.role}</td>
      <td>${app.status}</td>
      <td>${app.appliedAt}</td>
    `;

    tbody.appendChild(row);
  });

  table.append(thead, tbody);
  root.appendChild(table);
}

function renderLegend(applications, root) {
  root.innerHTML = "";

  const counts = {};
  applications.forEach((app) => {
    counts[app.status] = (counts[app.status] || 0) + 1;
  });

  const colors = {
    applied: "#4f83cc",
    under_review: "#9b59b6",
    interview: "#f1c40f",
    offer: "#2ecc71",
    rejected: "#e74c3c",
  };

  Object.entries(counts).forEach(([status, count]) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const dot = document.createElement("span");
    dot.className = "legend-dot";
    dot.style.backgroundColor = colors[status];

    const label = document.createElement("span");
    label.textContent = status.replace("_", " ");

    item.append(dot, label);
    root.appendChild(item);
  });
}

function renderDonut(applications, root) {
  root.innerHTML = "";

  const counts = {};
  applications.forEach((app) => {
    counts[app.status] = (counts[app.status] || 0) + 1;
  });

  const total = applications.length;
  if (total === 0) return;

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
    circle.setAttribute("stroke", colors[status] || "#ccc");
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

  // centro (texto)
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

export function renderStatusChart(applications) {
  const root = document.getElementById("status-chart");
  root.innerHTML = "";

  const chartContainer = document.createElement("div");
  chartContainer.className = "chart";

  const legendContainer = document.createElement("div");
  legendContainer.className = "chart-legend";

  renderDonut(applications, chartContainer);
  renderLegend(applications, legendContainer);

  root.append(chartContainer, legendContainer);
}

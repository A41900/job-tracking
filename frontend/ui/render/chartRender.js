import { STATUS_COLORS } from "./uiRender.js";

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

function getStatusCounts(applications) {
  return applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
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

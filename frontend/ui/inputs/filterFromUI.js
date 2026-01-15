export function initFiltersUI(apps) {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((select) => {
    const field = select.dataset.filter;
    if (!field) return;

    const values = new Set();
    apps.forEach((app) => app[field] && values.add(app[field]));

    select.innerHTML = `
      <option value="" disabled selected hidden>${field}</option>
    `;

    values.forEach((value) => {
      select.innerHTML += `<option value="${value}">${value}</option>`;
    });
  });
}

export function readFiltersFromUI() {
  const filters = {};
  document.querySelectorAll(".dropdown").forEach((select) => {
    const key = select.dataset.filter;
    if (key) filters[key] = select.value || "";
  });
  return filters;
}

export function clearFilterUI() {
  document
    .querySelectorAll(".dropdown")
    .forEach((select) => (select.selectedIndex = 0));
}

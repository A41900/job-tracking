export function initFiltersUI(apps) {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((select) => {
    const field = select.dataset.filter;
    if (!field) return;

    const values = new Set();
    apps.forEach((app) => {
      if (app[field]) values.add(app[field]);
    });

    select.textContent = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true;
    placeholder.textContent = field;
    select.appendChild(placeholder);

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
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

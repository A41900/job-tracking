export const FILTER_OPTIONS = {
  status: [
    "applied",
    "under_review",
    "interview",
    "rejected",
    "archived",
    "draft",
  ],
  seniority: ["intern", "junior", "junior_plus", "mid", "senior"],
  remoteType: ["remote", "hybrid", "onsite", "unknown"],
};

export function bindFiltersUI(onChange) {
  document.querySelectorAll(".dropdown").forEach((select) => {
    select.addEventListener("change", () => {
      onChange(readFiltersFromUI());
    });
  });
}

export function initFiltersUI() {
  document.querySelectorAll(".dropdown").forEach((select) => {
    const field = select.dataset.filter;
    if (!field) return;

    const options = FILTER_OPTIONS[field];
    if (!options) return;

    select.textContent = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = field;
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true;
    select.appendChild(placeholder);

    options.forEach((value) => {
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

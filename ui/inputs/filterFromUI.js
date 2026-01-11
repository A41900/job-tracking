import { setFilters, resetFilters } from "../uiController.js";

const MAP = {
  status: "filter-status",
  remoteType: "filter-remote",
  position: "filter-position",
  company: "filter-company",
};

export function initFilterUI() {
  document.getElementById("filterBtn").addEventListener("click", () => {
    setFilters(readFiltersFromUI());
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    resetFilters();
  });
}

function readFiltersFromUI() {
  const values = {};

  Object.entries(MAP).forEach(([key, id]) => {
    const el = document.getElementById(id);
    values[key] = el ? el.value : "";
  });

  return values;
}

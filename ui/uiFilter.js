import { setFilters, resetFilters } from "./uiController.js";
import { createEmptyFilters } from "../filter/filter.js";

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
    resetFiltersUI();
    resetFilters();
  });
}

export function readFiltersFromUI() {
  const filters = createEmptyFilters();

  Object.entries(MAP).forEach(([key, id]) => {
    const value = document.getElementById(id).value;
    if (value) filters[key].push(value);
  });

  return filters;
}

export function resetFiltersUI() {
  Object.values(MAP).forEach((id) => {
    document.getElementById(id).value = "";
  });
}

/*


function readFilters() {
  const filters = createEmptyFilters();

  const status = document.getElementById("filter-status").value;
  const remoteType = document.getElementById("filter-remote").value;
  const position = document.getElementById("filter-position").value;
  const company = document.getElementById("filter-company").value;

  if (status) filters.status.push(status);
  if (remoteType) filters.remoteType.push(remoteType);
  if (position) filters.position.push(position);
  if (company) filters.company.push(company);

  return filters;
}

function resetFilters() {
  document.getElementById("filter-status").value = "";
  document.getElementById("filter-remote").value = "";
  document.getElementById("filter-position").value = "";
  document.getElementById("filter-company").value = "";
}
*/

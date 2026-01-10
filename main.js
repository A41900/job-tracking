import { initStore, getApplications } from "./data/store.js";
import { applyFilters, createEmptyFilters } from "./filter/filter.js";
import {
  renderApplications,
  renderButtons,
  renderStatusChart,
} from "./ui/render.js";

const viewRadios = document.querySelectorAll('input[name="view"]');
viewRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const view = radio.value;
    renderApplications(getApplications(), view);
  });
});

await initStore();
renderApplications(getApplications(), "cards");
renderStatusChart(getApplications());
renderButtons(getApplications());

const viewMode = document.getElementById("view-toggle");
viewMode.value;

const filterBtn = document.getElementById("filterBtn");
filterBtn.addEventListener("click", () => {
  //readAllBtns();
  const filters = readFiltersFromUI();
  const filteredApps = applyFilters(getApplications(), filters);
  renderApplications(filteredApps, currentViewMode);
});

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", cleanAllFilters);

function cleanAllFilters() {
  document.getElementById("filter-status").value = "";
  document.getElementById("filter-remote").value = "";
  document.getElementById("filter-position").value = "";
  document.getElementById("filter-company").value = "";
  renderApplications(getApplications(), currentViewMode);
}
function readFiltersFromUI() {
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

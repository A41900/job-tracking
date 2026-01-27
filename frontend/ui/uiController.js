import { getApplications } from "../store/applicationsStore.js";
import { renderApplications } from "./render/uiRender.js";
import { renderStatusChart } from "./render/chartRender.js";
import { applyFilters } from "../../logic/applicationFilters.js";
import { readFiltersFromUI } from "./inputs/filterFromUI.js";
import { sortApplications } from "../../logic/sortApplications.js";
import { createApplication } from "../api/applicationsApi.js";
import { addApplication } from "../store/applicationsStore.js";

const uiState = {
  layout: null,
  filters: {},
};

export function updateUI() {
  const filters = readFiltersFromUI();
  let apps = applyFilters(getApplications(), filters);
  apps = sortApplications(apps);
  renderApplications(apps, uiState.layout);
  renderStatusChart(apps);
}

export function setLayout(layout) {
  uiState.layout = layout;
  updateUI();
}

export function setFilters(filters) {
  uiState.filters = filters;
  updateUI();
}

document.addEventListener("application:create", async (e) => {
  try {
    const created = await createApplication(e.detail);
    if (!created || created.id == null) {
      throw new Error("Backend returned application without id");
    }
    addApplication(created);
    updateUI();
  } catch (err) {
    console.error("Erro ao criar candidatura:", err);
    alert("Erro ao criar candidatura");
  }
});

import { getApplications } from "../store/applicationsStore.js";
import { renderApplications } from "./render/uiRender.js";
import { renderStatusChart } from "./render/chartRender.js";
import { applyFilters } from "../../logic/applicationFilters.js";
import { readFiltersFromUI, clearFilterUI } from "./inputs/filterFromUI.js";

const uiState = {
  layout: null,
};

export function initUIController() {
  document
    .getElementById("filterBtn")
    .addEventListener("click", onApplyFilters);
  document.getElementById("clearBtn").addEventListener("click", onClearFilters);

  updateUI();
}

function onApplyFilters() {
  updateUI();
}

function onClearFilters() {
  clearFilterUI();
  updateUI();
}

export function updateUI() {
  const filters = readFiltersFromUI();
  const apps = applyFilters(getApplications(), filters);

  renderApplications(apps, uiState.layout);
  renderStatusChart(apps);
}

export function setLayout(layout) {
  uiState.layout = layout;
  updateUI();
}

export function onApplicationCreated() {
  updateUI();
}

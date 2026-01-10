import { uiState } from "./uiState.js";
import { getApplications } from "../data/store.js";
import { renderApplications } from "./uiRender.js";
import { createEmptyFilters } from "../filter/filter.js";
import { applyFilters } from "../filter/filter.js";
import { renderStatusChart } from "./uiRender.js";

export function updateUI() {
  const apps = applyFilters(getApplications(), uiState.filters);
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

export function resetFilters() {
  uiState.filters = createEmptyFilters();
  updateUI();
}

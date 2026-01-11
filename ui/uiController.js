//import { uiState } from "./uiState.js";
import { getApplications } from "../store/applicationsStore.js";
import { renderApplications } from "./render/uiRender.js";
import { applyFilters } from "../logic/applicationFilters.js";
import { renderStatusChart } from "./render/uiRender.js";

const uiState = {
  layout: null,
  filters: createEmptyFilters(),
};

function createEmptyFilters() {
  return {
    status: [],
    remoteType: [],
    position: [],
    company: [],
  };
}

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

export function onApplicationCreated() {
  updateUI();
}

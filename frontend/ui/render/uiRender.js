import { renderTable } from "./renderTableView.js";
import { renderCards } from "./renderCardsView.js";

export function renderApplications(applications, viewMode) {
  const tableContainer = document.getElementById("container-table");
  const cardsContainer = document.getElementById("container-cards");

  tableContainer.innerHTML = "";
  cardsContainer.innerHTML = "";

  if (viewMode === "table") {
    tableContainer.classList.remove("hidden");
    cardsContainer.classList.add("hidden");
    renderTable(applications, tableContainer);
  } else {
    cardsContainer.classList.remove("hidden");
    tableContainer.classList.add("hidden");
    renderCards(applications, cardsContainer);
  }
}

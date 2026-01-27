import { updateUI, setLayout } from "./uiController.js";
import { setSort } from "../logic/sortApplications.js";
import { clearFilterUI } from "./inputs/filterFromUI.js";
import { toggleTheme } from "./theme.js";
import { renderSingleApplication } from "./render/renderSingleCard.js";

export function initUIEvents() {
  console.log("UI EVENTS FILE LOADED");

  document.addEventListener("click", onGlobalClick);
  document.addEventListener("change", onGlobalChange);
}

function onGlobalChange(e) {
  if (e.target.name === "view") {
    setLayout(e.target.value);
    return;
  }
}

function onGlobalClick(e) {
  console.log("GLOBAL CLICK", e.target);
  const th = e.target.closest("th.sortable");
  if (th) {
    setSort(th.dataset.sort);
    updateUI();
    return;
  }

  if (
    e.target.classList.contains("close-btn") ||
    e.target === document.getElementById("container-single")
  ) {
    exitSingleView();
    return;
  }

  if (e.target.id === "filterBtn") {
    updateUI();
    return;
  }

  if (e.target.id === "clearBtn") {
    clearFilterUI();
    updateUI();
    return;
  }

  if (e.target.id == "toggle-theme") {
    toggleTheme();
    return;
  }

  const card = e.target.closest(".application-card");
  if (card) {
    renderSingleApplication(card.dataset.id);
    return;
  }

  if (e.target.classList.contains("toggle-notes")) {
    const card = e.target.closest(".application-card");
    const notes = card.querySelector(".notes");
    notes.classList.toggle("hidden");
    e.target.textContent = notes.classList.contains("hidden")
      ? "View notes"
      : "Hide notes";
    return;
  }
}

function exitSingleView() {
  const single = document.getElementById("container-single");
  single.classList.add("hidden");
  updateUI();
}

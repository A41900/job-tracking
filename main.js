import { getApplications, initStore } from "./store/applicationsStore.js";
import { setLayoutListeners } from "./ui/inputs/layoutSelectorUI.js";
import { initFilterUI } from "./ui/inputs/filterFromUI.js";
import { updateUI } from "./ui/uiController.js";
import { renderButtons } from "./ui/render/uiRender.js";
import { initAddApplicationAction } from "./ui/actions/addApplicationAction.js";

await initStore();

renderButtons(getApplications());
initFilterUI();
setLayoutListeners();
initAddApplicationAction();

updateUI();

/*

import { addApplication, getApplications, initStore } from "./data/store.js";
import { setLayoutListeners } from "./ui/uiLayout.js";
import { initFilterUI } from "./ui/uiFilter.js";
import { updateUI } from "./ui/uiController.js";
import { renderButtons } from "./ui/uiRender.js";

await initStore();
renderButtons(getApplications());
initFilterUI();
setLayoutListeners();
updateUI();


async function createApplication(data) {
  const response = await fetch("http://localhost:3000/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create application");
  }

  return response.json();
}

const addApplicationBtn = document.getElementById("add-application-btn");
addApplicationBtn.addEventListener("click", () => {
  openAddApplicationModal();
});

const modalRoot = document.getElementById("modal-root");
function openAddApplicationModal() {
  modalRoot.innerHTML = `
    <div class="modal">
      <form id="add-application-form">
        <input id="company" placeholder="Company" required />
        <input id="role" placeholder="Role" required />
        <input id="url" placeholder="URL" />

        <button type="submit">Add</button>
        <button type="button" id="close-modal">Cancel</button>
      </form>
    </div>
  `;

  wireAddApplicationForm();
}

function wireAddApplicationForm() {
  const form = document.getElementById("add-application-form");
  const closeBtn = document.getElementById("close-modal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    const url = document.getElementById("url").value;

    try {
      const response = await fetch("http://localhost:3000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, url }),
      });

      const newApplication = await response.json();

      addApplication(newApplication);

      closeModal();
    } catch (err) {
      console.error("Erro no fetch:", err);
      alert("Erro ao criar candidatura");
    }
  });

  function closeModal() {
    const modalRoot = document.getElementById("modal-root");
    modalRoot.innerHTML = "";
  }

  closeBtn.addEventListener("click", closeModal);

  */

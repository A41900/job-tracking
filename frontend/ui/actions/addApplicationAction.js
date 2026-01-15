import { createApplication } from "../../api/applicationsApi.js";
import { addApplication } from "../../store/applicationsStore.js";
import { onApplicationCreated } from "../uiController.js";

export function initAddApplicationAction() {
  const addApplicationBtn = document.getElementById("add-application-btn");
  if (!addApplicationBtn) return;

  addApplicationBtn.addEventListener("click", () => {
    openAddApplicationModal();
  });
}

const modalRoot = document.getElementById("modal-root");

function openAddApplicationModal() {
  modalRoot.innerHTML = `
  <div class="modal-overlay">
    <div class="modal">
      <form id="add-application-form">
      <h1>Application Form</h1>
        <input id="company" placeholder="Company" required />
        <select id="seniority" required>
          <option value="intern">Intern</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <input id="position" placeholder="Position" required/>
        <input id="role" placeholder="Role" required />
        <input id="url" placeholder="URL" />
       

        <button type="submit">Add</button>
        <button type="button" id="close-modal">Cancel</button>
      </form>
    </div>
  </div>
`;

  wireAddApplicationForm();
}

function wireAddApplicationForm() {
  const form = document.getElementById("add-application-form");
  const closeBtn = document.getElementById("close-modal");

  form.addEventListener("submit", onSubmit);
  closeBtn.addEventListener("click", closeModal);
}

async function onSubmit(e) {
  console.log("SUBMIT HANDLER FIRED");
  e.preventDefault();

  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const url = document.getElementById("url").value;
  const seniority = document.getElementById("seniority").value;
  const position = document.getElementById("position").value;

  try {
    const newApplication = await createApplication({
      company,
      role,
      url,
      seniority,
      position,
    });

    addApplication(newApplication);
    onApplicationCreated();
    closeModal();
  } catch (err) {
    console.error("Erro ao criar candidatura:", err);
    alert("Erro ao criar candidatura");
  }
}

function closeModal() {
  modalRoot.innerHTML = "";
}

function initAddApplicationAction() {
  const addApplicationBtn = document.getElementById("add-application-btn");
  if (!addApplicationBtn) return;

  addApplicationBtn.addEventListener("click", () => {
    openAddApplicationModal();
  });
}

const modalRoot = document.getElementById("modal-root");

export function openAddApplicationModal() {
  modalRoot.innerHTML = `
<div class="modal-overlay">
  <div class="modal">
    <form id="add-application-form">

      <h1>New Job Application</h1>

      <label>
        Company *
        <input id="company" required />
      </label>

      <label>
        Position *
        <input id="position" placeholder="e.g. Software Developer" required />
      </label>

      <label>
        Role *
        <input id="role" placeholder="e.g. Frontend UI, Backend APIs" required />
      </label>

      <label>
        Seniority *
        <select id="seniority" required>
          <option value="">Select…</option>
          <option value="intern">Intern</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </label>

      <label>
        Areas
        <input id="area" placeholder="e.g. frontend, backend" />
      </label>

      <label>
        Skills
        <input id="skills" placeholder="e.g. javascript, react, sql" />
      </label>

      <label>
        Employment Type
        <select id="employmentType">
          <option value="unknown">Unknown</option>
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
          <option value="freelance">Freelance</option>
          <option value="contract">Contract</option>
        </select>
      </label>

      <label>
        Application Language
        <select id="applicationLanguage">
          <option value="unknown">Unknown</option>
          <option value="English">English</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Location
        <input id="location" placeholder="e.g. Lisbon, Portugal" />
      </label>

      <label>
        Remote Type
        <select id="remoteType">
          <option value="unknown">Unknown</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">Onsite</option>
        </select>
      </label>

      <label>
        Source
        <select id="source">
          <option value="unknown">Unknown</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Website">Company Website</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Submission Method
        <select id="submissionMethod">
          <option value="unknown">Unknown</option>
          <option value="linkedin_easy_apply">LinkedIn Easy Apply</option>
          <option value="company_form">Company Form</option>
          <option value="email">Email</option>
          <option value="referral">Referral</option>
        </select>
      </label>

      <label>
        Job URL
        <input id="url" placeholder="https://…" />
      </label>

      <label>
        Notes
        <textarea id="notes" rows="3"></textarea>
      </label>

      <div class="modal-actions">
        <button type="submit">Add application</button>
        <button type="button" id="close-modal">Cancel</button>
      </div>

    </form>
  </div>
</div>
`;

  wireAddApplicationForm();
}

export function fillApplicationForm(jobApplication) {
  document.getElementById("company").value = jobApplication.company ?? "";
  document.getElementById("position").value = jobApplication.position ?? "";
  document.getElementById("role").value = jobApplication.role ?? "";
  document.getElementById("seniority").value = jobApplication.seniority ?? "";
  document.getElementById("area").value = (jobApplication.area || []).join(
    ", ",
  );
  document.getElementById("skills").value = (jobApplication.skills || []).join(
    ", ",
  );
  document.getElementById("employmentType").value =
    jobApplication.employmentType ?? "unknown";
  document.getElementById("applicationLanguage").value =
    jobApplication.applicationLanguage ?? "unknown";
  document.getElementById("location").value = jobApplication.location ?? "";
  document.getElementById("remoteType").value =
    jobApplication.remoteType ?? "unknown";
  document.getElementById("source").value = jobApplication.source ?? "unknown";
  document.getElementById("submissionMethod").value =
    jobApplication.submissionMethod ?? "unknown";
  document.getElementById("url").value =
    jobApplication.url !== "unknown" ? jobApplication.url : "";
  document.getElementById("notes").value = (jobApplication.notes || []).join(
    "\n",
  );
}

function wireAddApplicationForm() {
  const form = document.getElementById("add-application-form");
  const closeBtn = document.getElementById("close-modal");

  form.addEventListener("submit", onSubmit);
  closeBtn.addEventListener("click", closeModal);
}

async function onSubmit(e) {
  e.preventDefault();

  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const area = document
    .getElementById("area")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const notes = document.getElementById("notes").value
    ? [document.getElementById("notes").value]
    : [];

  const payload = {
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    role: document.getElementById("role").value,
    seniority: document.getElementById("seniority").value,
    url: document.getElementById("url").value,
    area,
    skills,
    notes,
  };

  document.dispatchEvent(
    new CustomEvent("application:create", {
      detail: payload,
    }),
  );

  closeModal();
}

function closeModal() {
  modalRoot.innerHTML = "";
}

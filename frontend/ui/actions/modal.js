import {
  createApplication,
  extractJob,
  ENABLE_EXTRACTION,
} from "../../api/applicationsApi.js";
const modalRoot = document.getElementById("modal-root");

export function initAddApplicationAction() {
  const addApplicationBtn = document.getElementById("add-application-btn");
  if (!addApplicationBtn) return;

  addApplicationBtn.addEventListener("click", () => {
    openAddApplicationModal();
  });
}

export function openAddApplicationModal() {
  modalRoot.innerHTML = `
  <div class="modal-overlay">
    <div class="modal">
      <form id="add-application-form">

        <h1>New Job Application</h1>

        <div class="form-grid">

          <!-- ================= LEFT COLUMN ================= -->
          <div class="col col-left">

            <!-- AUTO-FILL -->
            <section class="autofill">
              <div class="autofill-top">
                <strong>Auto-fill</strong>
                <button type="button" id="toggle-autofill" class="autofill-btn">
                  Auto-fill from job posting
                </button>
              </div>

              <div id="autofill-area" class="autofill-area">
                <textarea
                  id="jobTextInModal"
                  placeholder="Paste the job description here…"></textarea>

                <div class="autofill-actions">
                  <button type="button" id="analyze-and-fill">
                    Analyze & fill
                  </button>

                  <span id="loading" class="loading" aria-live="polite">
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                    Loading...
                  </span>
                </div>
              </div>
            </section>

            <!-- SIGNALS (hidden by default) -->
            <section id="signals" class="signals">
              <h2>Signals (from analysis)</h2>

              <div class="signals-grid">
                <label>
                  Work pace
                  <select id="signal-workPace">
                    <option value="unclear">unclear</option>
                    <option value="slow">slow</option>
                    <option value="moderate">moderate</option>
                    <option value="fast">fast</option>
                  </select>
                </label>

                <label>
                  Autonomy level
                  <select id="signal-autonomyLevel">
                    <option value="unclear">unclear</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </label>

                <label>
                  Technical breadth
                  <select id="signal-technicalBreadth">
                    <option value="unclear">unclear</option>
                    <option value="narrow">narrow</option>
                    <option value="moderate">moderate</option>
                    <option value="broad">broad</option>
                  </select>
                </label>

                <label>
                  Role clarity
                  <select id="signal-roleClarity">
                    <option value="unclear">unclear</option>
                    <option value="clear">clear</option>
                    <option value="mixed">mixed</option>
                    <option value="vague">vague</option>
                  </select>
                </label>

                <label>
                  Delivery pressure
                  <select id="signal-deliveryPressure">
                    <option value="unclear">unclear</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </label>

                <label>
                  Environment signals
                  <textarea
                    id="signal-environmentSignals"
                    rows="3"
                    placeholder="Um por linha..."></textarea>
                </label>

                <label style="grid-column: 1 / -1;">
                  Interpretation notes
                  <textarea
                    id="signal-interpretationNotes"
                    rows="3"></textarea>
                </label>
              </div>
            </section>

          </div>

          <!-- ================= MIDDLE COLUMN ================= -->
          <div class="col col-mid">

            <label>
              Company *
              <input id="company" required />
            </label>

            <label>
              Position *
              <input id="position" required />
            </label>

            <label>
              Role *
              <input id="role" required />
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
              Job URL
              <input id="url" placeholder="https://…" />
            </label>

              <label>
              Notes
              <textarea id="notes" rows="3"></textarea>
            </label>

          </div>

          <!-- ================= RIGHT COLUMN ================= -->
          <div class="col col-right">

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
            Status
            <select id="status">
                <option value="draft">Draft</option>
                <option value="applied">Applied</option>
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
                <option value="linkedin_easy_apply">
                  LinkedIn Easy Apply
                </option>
                <option value="company_form">Company Form</option>
                <option value="email">Email</option>
                <option value="referral">Referral</option>
              </select>
            </label>

          </div>
        </div>

        <!-- ACTIONS -->
        <div class="modal-actions">
          <button type="submit">Add application</button>
          <button type="button" id="close-modal">Cancel</button>
        </div>

      </form>
    </div>
  </div>
  `;

  wireAddApplicationForm();
  wireAutoFill();
}

function wireAddApplicationForm() {
  const form = document.getElementById("add-application-form");
  const closeBtn = document.getElementById("close-modal");
  form.addEventListener("submit", onSubmit);
  closeBtn.addEventListener("click", closeModal);
}

function wireAutoFill() {
  const toggleBtn = document.getElementById("toggle-autofill");
  const area = document.getElementById("autofill-area");
  const runBtn = document.getElementById("analyze-and-fill");
  const textarea = document.getElementById("jobTextInModal");
  const loading = document.getElementById("loading");

  if (!toggleBtn || !area || !runBtn || !textarea || !loading) {
    console.error("Autofill elements missing", {
      toggleBtn,
      area,
      runBtn,
      textarea,
      loading,
    });
    return;
  }

  area.classList.remove("is-open");
  loading.classList.remove("is-on");

  toggleBtn.addEventListener("click", () => {
    if (!ENABLE_EXTRACTION) {
      alert(
        "This feature uses a private AI API and is only available in local development.",
      );
      return;
    }
    area.classList.toggle("is-open");
    if (area.classList.contains("is-open")) textarea.focus();
  });

  runBtn.addEventListener("click", async () => {
    const jobText = textarea.value.trim();
    if (!jobText) {
      textarea.focus();
      return;
    }

    setLoading(true);
    try {
      const data = await extractJob(jobText);

      const app = data.application;
      if (!app) throw new Error("Missing application in response");

      fillApplicationForm(app);
      fillSignalsIfPresent(app.signals);
    } catch (err) {
      console.error(err);
      alert("Failed to extract job application.");
    } finally {
      setLoading(false);
    }
  });

  function setLoading(isOn) {
    loading.classList.toggle("is-on", isOn);
    runBtn.disabled = isOn;
    toggleBtn.disabled = isOn;
  }
}

function fillSignalsIfPresent(signals) {
  const signalsSection = document.getElementById("signals");
  if (!signalsSection) return;

  if (!signals) {
    signalsSection.classList.remove("is-visible");
    return;
  }

  signalsSection.classList.add("is-visible");

  document.getElementById("signal-workPace").value =
    signals.workPace ?? "unclear";
  document.getElementById("signal-autonomyLevel").value =
    signals.autonomyLevel ?? "unclear";
  document.getElementById("signal-technicalBreadth").value =
    signals.technicalBreadth ?? "unclear";
  document.getElementById("signal-roleClarity").value =
    signals.roleClarity ?? "unclear";
  document.getElementById("signal-deliveryPressure").value =
    signals.deliveryPressure ?? "unclear";

  document.getElementById("signal-environmentSignals").value = (
    signals.environmentSignals || []
  ).join("\n");

  document.getElementById("signal-interpretationNotes").value =
    signals.interpretationNotes ?? "";
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

async function onSubmit(e) {
  e.preventDefault();

  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const application = collectApplicationFromForm();
  createApplication(application);

  closeModal();
}

function collectApplicationFromForm() {
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

  const application = {
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    role: document.getElementById("role").value,
    seniority: document.getElementById("seniority").value,
    url: document.getElementById("url").value || "unknown",

    area,
    skills,
    notes,

    employmentType: document.getElementById("employmentType").value,
    applicationLanguage: document.getElementById("applicationLanguage").value,
    location: document.getElementById("location").value || "unknown",
    remoteType: document.getElementById("remoteType").value,

    source: document.getElementById("source").value,
    submissionMethod: document.getElementById("submissionMethod").value,

    status: document.getElementById("status")?.value ?? "draft",
    appliedAt: null,
    confirmationReceived: false,
  };

  const signalsSection = document.getElementById("signals");
  if (signalsSection?.classList.contains("is-visible")) {
    application.signals = {
      workPace: document.getElementById("signal-workPace").value,
      autonomyLevel: document.getElementById("signal-autonomyLevel").value,
      technicalBreadth: document.getElementById("signal-technicalBreadth")
        .value,
      roleClarity: document.getElementById("signal-roleClarity").value,
      deliveryPressure: document.getElementById("signal-deliveryPressure")
        .value,
      environmentSignals: document
        .getElementById("signal-environmentSignals")
        .value.split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      interpretationNotes:
        document.getElementById("signal-interpretationNotes").value || "",
    };
  }

  return application;
}

function closeModal() {
  modalRoot.innerHTML = "";
}

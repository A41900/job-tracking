import { getApplicationById } from "../../store/applicationsStore.js";

let isEditMode = false;
let currentAppId = null;

/* ========================================================= */
/* ================= MAIN RENDER =========================== */
/* ========================================================= */

export function renderSingleApplication(appId) {
  document.body.classList.add("modal-open");
  currentAppId = appId;
  const app = getApplicationById(appId);
  const single = document.getElementById("container-single");

  single.classList.remove("hidden");
  single.innerHTML = "";

  const card = document.createElement("div");
  card.className = "single-card";

  /* ================= HEADER ================= */
  const header = document.createElement("div");
  header.className = "single-card-header";

  const status = document.createElement("span");
  status.className = `status-pill status-${app.status}`;
  status.textContent = app.status.replace("_", " ");

  const actions = document.createElement("div");
  actions.className = "single-card-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    isEditMode = true;
    renderSingleApplication(appId);
  };

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    isEditMode = false;
    renderSingleApplication(appId);
  };

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "✕";
  closeBtn.onclick = () => {
    isEditMode = false;
    single.classList.add("hidden");
    document.body.classList.remove("modal-open");
  };

  actions.append(isEditMode ? saveBtn : editBtn, closeBtn);
  header.append(status, actions);

  /* ================= TITLE ================= */
  const h2 = document.createElement("h2");
  h2.textContent = app.position ?? "";

  const h3 = document.createElement("h3");
  h3.textContent = app.company ?? "";

  /* ================= DETAILS ================= */
  const details = document.createElement("section");
  appendSafe(
    details,
    renderEditableText("Role", app.role, "role"),
    renderEditableSelect("Seniority", app.seniority, "seniority", [
      "junior",
      "mid",
      "senior",
    ]),
    renderEditableSelect(
      "Employment type",
      app.employmentType,
      "employmentType",
      ["full_time", "part_time", "internship"],
    ),
    renderEditableText(
      "Language",
      app.applicationLanguage,
      "applicationLanguage",
    ),
    renderEditableText("Location", app.location, "location"),
    renderEditableSelect("Remote type", app.remoteType, "remoteType", [
      "onsite",
      "hybrid",
      "remote",
    ]),
    renderEditableText("Applied at", app.appliedAt, "appliedAt"),
  );

  /* ================= LINKS ================= */
  const links = document.createElement("section");
  appendSafe(
    links,
    renderEditableText("Job URL", app.url, "url"),
    renderEditableText("Source", app.source, "source"),
    renderEditableText("Platform", app.platform, "platform"),
    renderEditableText(
      "Submission method",
      app.submissionMethod,
      "submissionMethod",
    ),
  );

  /* ================= TAGS ================= */
  const areas = renderEditablePills("Areas", app.area, "area");
  const skills = renderEditablePills("Skills", app.skills, "skills");

  /* ================= SIGNALS ================= */
  const signals = renderSignals(app.signals);

  /* ================= NOTES ================= */
  const notesSection = document.createElement("section");

  const notesTitle = document.createElement("h4");
  notesTitle.textContent = "Notes";

  const notes = renderEditableTextArea(
    Array.isArray(app.notes) ? app.notes.join("\n") : "",
    "notes",
  );

  appendSafe(notesSection, notesTitle, notes);

  /* ================= FINAL APPEND ================= */
  appendSafe(
    card,
    header,
    h2,
    h3,
    details,
    links,
    areas,
    skills,
    signals,
    notesSection,
  );

  single.appendChild(card);
}

/* ========================================================= */
/* ================= FIELD RENDERERS ======================= */
/* ========================================================= */

function renderEditableText(label, value, field) {
  const text = normalizeText(value);
  if (!isEditMode && !text) return null;

  const p = document.createElement("p");
  p.className = "meta-row";

  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;

  let control;
  if (!isEditMode) {
    control = document.createElement("span");
    control.textContent = text;
  } else {
    control = document.createElement("input");
    control.className = "inline-input";
    control.value = text;
    control.dataset.field = field;
  }

  p.append(strong, control);
  return p;
}

function renderEditableSelect(label, value, field, options) {
  const text = normalizeText(value);
  if (!isEditMode && !text) return null;

  const p = document.createElement("p");
  p.className = "meta-row";

  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;

  let control;
  if (!isEditMode) {
    control = document.createElement("span");
    control.textContent = text;
  } else {
    control = document.createElement("select");
    control.dataset.field = field;

    options.forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      o.selected = opt === value;
      control.appendChild(o);
    });
  }

  p.append(strong, control);
  return p;
}

function renderEditableTextArea(value, field) {
  const text = normalizeText(value);

  if (!isEditMode) {
    if (!text) return null;
    const p = document.createElement("p");
    p.className = "section-text";
    p.textContent = text;
    return p;
  }

  const textarea = document.createElement("textarea");
  textarea.className = "inline-textarea";
  textarea.value = text;
  textarea.dataset.field = field;
  textarea.placeholder = `Edit ${field}...`;
  return textarea;
}

/* ================= PILLS ================= */

function renderEditablePills(title, items = [], field) {
  if (!isEditMode && (!items || items.length === 0)) return null;

  const section = document.createElement("section");

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const list = document.createElement("div");
  list.className = "tag-list";

  items.forEach((item, index) => {
    const pill = document.createElement("span");
    pill.className = "tag";
    pill.textContent = item;

    if (isEditMode) {
      const remove = document.createElement("button");
      remove.className = "pill-remove";
      remove.textContent = "×";
      remove.onclick = () => {
        items.splice(index, 1);
        renderSingleApplication(currentAppId);
      };
      pill.appendChild(remove);
    }

    list.appendChild(pill);
  });

  section.append(h4, list);

  if (isEditMode) {
    const input = document.createElement("input");
    input.className = "pill-input";
    input.placeholder = `Add new ${title.toLowerCase()}...`;
    input.onkeydown = (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        items.push(input.value.trim());
        input.value = "";
        renderSingleApplication(currentAppId);
      }
    };
    section.appendChild(input);
  }

  return section;
}

/* ================= SIGNALS ================= */

function renderSignals(signals) {
  if (!signals && !isEditMode) return null;

  const section = document.createElement("section");

  const h4 = document.createElement("h4");
  h4.textContent = "Signals";

  appendSafe(
    section,
    h4,
    renderEditableSelect("Work pace", signals?.workPace, "signals.workPace", [
      "low",
      "moderate",
      "high",
    ]),
    renderEditableSelect(
      "Autonomy level",
      signals?.autonomyLevel,
      "signals.autonomyLevel",
      ["low", "medium", "high"],
    ),
    renderEditableSelect(
      "Technical breadth",
      signals?.technicalBreadth,
      "signals.technicalBreadth",
      ["narrow", "moderate", "broad"],
    ),
    renderEditableSelect(
      "Role clarity",
      signals?.roleClarity,
      "signals.roleClarity",
      ["unclear", "moderate", "clear"],
    ),
    renderEditableSelect(
      "Delivery pressure",
      signals?.deliveryPressure,
      "signals.deliveryPressure",
      ["low", "medium", "high"],
    ),
    renderEditablePills(
      "Environment signals",
      signals?.environmentSignals,
      "signals.environmentSignals",
    ),
    renderEditableTextArea(
      signals?.interpretationNotes,
      "signals.interpretationNotes",
    ),
  );

  return section;
}

/* ========================================================= */
/* ================= HELPERS =============================== */
/* ========================================================= */

function appendSafe(parent, ...children) {
  children.filter(Boolean).forEach((c) => parent.appendChild(c));
}

function normalizeText(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join("\n");
  return String(value).trim();
}

export function exitSingleView() {
  const single = document.getElementById("container-single");
  single.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

export function renderCards(applications, root) {
  applications.forEach((app) => {
    root.appendChild(renderCard(app));
  });
}

function renderCard(app) {
  if (app.id == null) {
    console.warn("Application sem id, ignorada:", app);
    return document.createDocumentFragment(); // não renderiza nada
  }
  const div = document.createElement("div");
  div.className = "application-card";
  div.dataset.id = app.id;
  div.classList.add(`card-${sanitizeStatus(app.status)}`);

  /* ================= HEADER ================= */
  const header = document.createElement("div");
  header.className = "card-header";

  const status = document.createElement("span");
  status.className = `status-pill status-${sanitizeStatus(app.status)}`;
  status.textContent = app.status?.replace("_", " ") ?? "draft";

  header.appendChild(status);

  /* ================= TITLE ================= */
  const h3 = document.createElement("h3");
  h3.textContent = app.role ?? app.position ?? "";

  const company = document.createElement("p");
  company.className = "company";
  company.textContent = app.company ?? "";

  /* ================= META ================= */
  const meta = document.createElement("div");
  meta.className = "card-meta";

  meta.textContent = [
    app.location,
    formatRemote(app.remoteType),
    capitalize(app.seniority),
    formatEmployment(app.employmentType),
  ]
    .filter(Boolean)
    .join(" · ");

  /* ================= SIGNALS ================= */
  const signals = document.createElement("div");
  signals.className = "card-signals";

  if (app.appliedAt) {
    const appliedDate = formatDate(app.appliedAt);
    const relative = formatRelativeDays(app.appliedAt);

    signals.textContent = `🗓 Applied ${appliedDate} · ${relative}`;
  }

  div.append(header, h3, company, meta, signals);
  return div;
}

function formatRelativeDays(dateStr) {
  const applied = new Date(dateStr);
  const now = new Date();

  const diffMs = now - applied;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

function formatRemote(type) {
  if (!type) return "";
  return type.replace("_", " ");
}

function formatEmployment(type) {
  if (!type) return "";
  return type.replace("_", "-");
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function sanitizeStatus(status) {
  const allowed = [
    "applied",
    "under_review",
    "interview",
    "offer",
    "rejected",
    "draft",
  ];
  return allowed.includes(status) ? status : "draft";
}

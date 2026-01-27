const USE_BACKEND = false;
export const ENABLE_EXTRACTION = false;

export async function fetchApplications333() {
  const url = USE_BACKEND
    ? "http://localhost:3000/applications"
    : "./data/applications.mock.json";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchApplications() {
  if (!USE_BACKEND) {
    const res = await fetch("./data/applications.mock.json");
    if (!res.ok) throw new Error("Backend unavailable");
    return res.json();
  }

  const res = await fetch("http://localhost:3000/applications");
  if (!res.ok) throw new Error("Erro ao ir ao backend");

  return res.json();
}

export async function extractJob(jobText) {
  if (!USE_BACKEND || !ENABLE_EXTRACTION) {
    throw new Error("Job extraction is disabled in this environment");
  }

  const res = await fetch("http://localhost:3000/extraction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobText }),
  });

  if (!res.ok) {
    throw new Error(`Extraction failed: ${res.status}`);
  }

  return res.json();
}

export async function createApplication(data) {
  if (USE_BACKEND) {
    const res = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error response:", text);
      throw new Error("Failed to create application");
    }
    return res.json();
  }
  // static mode
  return {
    id: crypto.randomUUID(),
    ...data,
    status: "draft",
    appliedAt: new Date().toISOString().split("T")[0],
  };
}

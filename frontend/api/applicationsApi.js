const USE_BACKEND = false;

export async function fetchApplications() {
  if (!USE_BACKEND) {
    const res = await fetch("./data/applications.mock.json");
    if (!res.ok) throw new Error("Backend unavailable");
    return res.json();
  }
  const res = await fetch("http://localhost:3000/applications");
  return res.json();
}

export async function createApplication(data) {
  if (USE_BACKEND) {
    const res = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create application");
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

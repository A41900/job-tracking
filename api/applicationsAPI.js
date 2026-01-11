export async function createApplication(data) {
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

//fetchApplications();
//updateApplication(id, data);
//deleteApplication(id);
//getApplications(id);
//create

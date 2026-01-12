/*
Persistência em memória
*/
let applications = [];
let nextId = 0;

export function initStore(data) {
  nextId = 0;
  applications = data.map((app) => ({
    ...app,
    id: nextId++,
  }));
}
// --- leitura ---
export function getApplications() {
  return applications;
}

export function getApplicationByFilter(filter) {
  return applications.find((app) => app.hasOwnProperty(filter) || null);
}

// --- escrita ---
export function addApplication(app) {
  applications.push(app);
  return app;
}

export function updateApplication(id, updates) {
  const app = getApplicationById(id);
  if (!app) return null;

  Object.assign(app, updates);
  return app;
}

export function removeApplication(id) {
  const index = applications.findIndex((app) => app.id === id);
  if (index === -1) return false;

  applications.splice(index, 1);
  return true;
}

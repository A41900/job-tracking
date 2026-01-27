let applications = [];

export function initStore(data) {
  applications = [...data];
}

export function getApplications() {
  return applications;
}

export function getApplicationById(id) {
  return applications.find((app) => String(app.id) === String(id)) || null;
}

export function getApplicationByFilter(filter) {
  return applications.find((app) => app.hasOwnProperty(filter) || null);
}

export function addApplication(app) {
  applications.push(app);
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

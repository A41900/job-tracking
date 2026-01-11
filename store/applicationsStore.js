/*
Persistência em memória

Nota:
Este módulo será substituído por uma camada de persistência real
(API / Base de Dados) sem impacto no resto do sistema.
*/

const USE_MOCK_DATA = true;
let applications = [];
let nextId = 0;

export async function initStore() {
  const file = USE_MOCK_DATA
    ? "./data/applications.mock.json"
    : "./data/applications.real.json";

  const res = await fetch(file);
  const data = await res.json();

  applications = data.map((app) => ({
    ...app,
    id: nextId++,
  }));
}

/*
export async function getApplicationsNew() {
  const res = await fetch("http://localhost:3000/api/applications");
  return await res.json();
}
*/
// --- leitura ---
export function getApplications() {
  return applications;
}

export function getApplicationById(id) {
  return applications.find((app) => app.id === id) || null;
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

import fs from "fs";
const FILE = "./data/applications.private.json";

function load() {
  if (!fs.existsSync(FILE)) {
    // primeira vez: cria o ficheiro com o seed
    fs.writeFileSync(FILE, JSON.stringify([], null, 2));
    return [];
  }

  const content = fs.readFileSync(FILE, "utf-8");

  if (!content.trim()) {
    // ficheiro existe mas está vazio
    fs.writeFileSync(FILE, JSON.stringify([], null, 2));
    return [];
  }

  // caso normal: usa os dados já gravados
  return JSON.parse(content);
}

function save(applications) {
  fs.writeFileSync(FILE, JSON.stringify(applications, null, 2));
}

let applications = load();
let nextId = applications.reduce((max, a) => Math.max(max, a.id), 0) + 1;

export function getAll() {
  return applications;
}

export function create(data) {
  const application = {
    id: nextId++,
    ...data,
  };
  applications.push(application);
  save(applications);
  return applications;
}

export function getActiveApplications() {
  return applications.filter((app) => app.isActive);
}

export function update(id, data) {}

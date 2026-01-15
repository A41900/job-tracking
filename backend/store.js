import fs from "fs";
import { applications as seed } from "./data/applications.seed.js";

const FILE = "./data/applications.private.json";

function load() {
  if (!fs.existsSync(FILE)) {
    // primeira vez: cria o ficheiro com o seed
    fs.writeFileSync(FILE, JSON.stringify(seed, null, 2));
    return [...seed];
  }

  const content = fs.readFileSync(FILE, "utf-8");

  if (!content.trim()) {
    // ficheiro existe mas está vazio
    fs.writeFileSync(FILE, JSON.stringify(seed, null, 2));
    return [...seed];
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

export function getById(id) {}

export function update(id, data) {}

export function remove(id) {}

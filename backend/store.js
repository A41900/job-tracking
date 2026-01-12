import { applications as seedData } from "./data/applications.private.js";

let applications = [...seedData];
let nextId = applications.length + 1;

export function getApplications() {
  return applications;
}

export function addApplication(data) {
  const application = {
    id: nextId++,
    ...data,
  };

  applications.push(application);
  return application;
}

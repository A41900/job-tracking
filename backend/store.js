let applications = [];
let nextId = 1;

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

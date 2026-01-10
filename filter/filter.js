export function createEmptyFilters() {
  return {
    status: [],
    remoteType: [],
    position: [],
    company: [],
  };
}

export function applyFilters(applications, filters) {
  return applications.filter((app) => {
    if (filters.status.length && !filters.status.includes(app.status)) {
      return false;
    }

    if (
      filters.remoteType.length &&
      !filters.remoteType.includes(app.remoteType)
    ) {
      return false;
    }

    if (filters.position.length && !filters.position.includes(app.position)) {
      return false;
    }

    if (filters.company.length && !filters.company.includes(app.company)) {
      return false;
    }

    return true;
  });
}

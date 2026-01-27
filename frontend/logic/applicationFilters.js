export function applyFilters(applications, filters) {
  return applications.filter((app) => {
    if (filters.status.length && !filters.status.includes(app.status))
      return false;
    if (
      filters.remoteType.length &&
      !filters.remoteType.includes(app.remoteType)
    )
      return false;
    if (filters.seniority.length && !filters.seniority.includes(app.seniority))
      return false;
    return true;
  });
}

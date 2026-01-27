let sortState = {
  field: null,
  direction: "asc", // "asc" | "desc"
};

export function setSort(field) {
  if (sortState.field === field) {
    sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
  } else {
    sortState.field = field;
    sortState.direction = "asc";
  }
}

export function getSort() {
  return sortState;
}

export function sortApplications(apps) {
  const sort = sortState;
  if (!sort.field) return apps;

  return [...apps].sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
    return 0;
  });
}

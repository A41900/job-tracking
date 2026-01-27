import { initStore } from "./store/applicationsStore.js";
import { initFiltersUI } from "./ui/inputs/filterFromUI.js";
import { initAddApplicationAction } from "./ui/actions/modal.js";
import { fetchApplications } from "./api/applicationsApi.js";
import { initUIEvents } from "./ui/uiEvents.js";
import { updateUI } from "./ui/uiController.js";
import { loadTheme } from "./ui/theme.js";

loadTheme();
let data = [];
try {
  data = await fetchApplications();
} catch (err) {
  console.error("Error to fetch applications:", err.message);
}
initStore(data);
initFiltersUI();
initAddApplicationAction();
initUIEvents();
updateUI();

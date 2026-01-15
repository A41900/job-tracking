import { initStore, getApplications } from "./store/applicationsStore.js";
import { initFiltersUI } from "./ui/inputs/filterFromUI.js";
import { initUIController } from "./ui/uiController.js";
import { setLayoutListeners } from "./ui/inputs/layoutSelectorUI.js";
import { initAddApplicationAction } from "./ui/actions/addApplicationAction.js";
import { fetchApplications } from "./api/applicationsApi.js";

const data = await fetchApplications();
initStore(data);

// init static UI
initFiltersUI(getApplications());
setLayoutListeners();
initAddApplicationAction();

// start UI logic
initUIController();

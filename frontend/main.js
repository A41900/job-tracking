import { getApplications, initStore } from "./store/applicationsStore.js";
import { setLayoutListeners } from "./ui/inputs/layoutSelectorUI.js";
import { initFilterUI } from "./ui/inputs/filterFromUI.js";
import { updateUI } from "./ui/uiController.js";
import { renderButtons } from "./ui/render/uiRender.js";
import { initAddApplicationAction } from "./ui/actions/addApplicationAction.js";
import { fetchApplications } from "./api/applicationsApi.js";

const data = await fetchApplications();
initStore(data);

renderButtons(getApplications());
initFilterUI();
setLayoutListeners();
initAddApplicationAction();

updateUI();

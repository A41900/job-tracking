import { getApplications, initStore } from "./data/store.js";
import { setLayoutListeners } from "./ui/uiLayout.js";
import { initFilterUI } from "./ui/uiFilter.js";
import { updateUI } from "./ui/uiController.js";
import { renderButtons } from "./ui/uiRender.js";

await initStore();
renderButtons(getApplications());
initFilterUI();
setLayoutListeners();
updateUI();

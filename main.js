import { initStore, getApplications } from "./data/store.js";
import { renderApplications } from "./ui/render.js";

await initStore();
renderApplications(getApplications());

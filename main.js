import { initStore, getApplications } from "./data/store.js";
import { renderApplications, renderStatusChart } from "./ui/render.js";

await initStore();
renderApplications(getApplications());
renderStatusChart(getApplications());

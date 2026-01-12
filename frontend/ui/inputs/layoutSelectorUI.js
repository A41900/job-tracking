import { setLayout } from "../uiController.js";

export function setLayoutListeners() {
  const radios = document.querySelectorAll('input[name="view"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      setLayout(radio.value);
    });
  });

  const checked = document.querySelector('input[name="view"]:checked');
  setLayout(checked ? checked.value : "table");
}

/*
import { uiState } from "./state.js";
import { emit, UI_EVENTS } from "./uiEvents.js";

export function initLayoutListeners() {
  const radios = document.querySelectorAll('input[name="view"]');

  const checked = document.querySelector('input[name="view"]:checked');
  uiState.layout = checked?.value ?? "table";

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      uiState.layout = radio.value;
      emit(UI_EVENTS.LAYOUT_CHANGE);
    });
  });
}

export const UI_EVENTS = {
  LAYOUT_CHANGE: "ui:layout-change",
};

export function emit(eventName) {
  document.dispatchEvent(new Event(eventName));
}

export function on(eventName, handler) {
  document.addEventListener(eventName, handler);
}

*/

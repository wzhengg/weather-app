import { imperialBtn, metricBtn } from "./domElements";

const IMPERIAL = "imperial";
const METRIC = "metric";
let selected;

export default function initUnits() {
  select(IMPERIAL);
  imperialBtn.addEventListener("click", () => select(IMPERIAL));
  metricBtn.addEventListener("click", () => select(METRIC));
}

function select(units) {
  if (selected === units) {
    return;
  }
  selected = units;
  updateDisplay();
}

function updateDisplay() {
  if (selected === IMPERIAL) {
    metricBtn.classList.remove("selected");
    imperialBtn.classList.add("selected");
  } else {
    imperialBtn.classList.remove("selected");
    metricBtn.classList.add("selected");
  }
}

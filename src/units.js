import PubSub from "pubsub-js";
import { UNITS_CHANGED } from "./pubsubTopics";
import { imperialBtn, metricBtn } from "./domElements";

const IMPERIAL = "imperial";
const METRIC = "metric";
let selected;

function updateDisplay() {
  if (selected === IMPERIAL) {
    metricBtn.classList.remove("selected");
    imperialBtn.classList.add("selected");
  } else {
    imperialBtn.classList.remove("selected");
    metricBtn.classList.add("selected");
  }
}

function select(units) {
  if (selected === units) {
    return;
  }
  selected = units;
  PubSub.publish(UNITS_CHANGED);
  updateDisplay();
}

export default function initUnits() {
  select(IMPERIAL);
  imperialBtn.addEventListener("click", () => select(IMPERIAL));
  metricBtn.addEventListener("click", () => select(METRIC));
}

export function getUnits() {
  return selected;
}

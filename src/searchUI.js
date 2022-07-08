import PubSub from "pubsub-js";
import { SEARCHED_LOCATION } from "./pubsubTopics";
import { searchBar, searchBtn } from "./domElements";

function emptySearch() {
  return searchBar.value.trim().length === 0;
}

function clearSearch() {
  searchBar.value = "";
}

function search() {
  if (emptySearch()) return;
  PubSub.publish(SEARCHED_LOCATION, searchBar.value);
  clearSearch();
}

export default function initSearch() {
  searchBtn.addEventListener("click", search);
}

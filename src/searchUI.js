import PubSub from "pubsub-js";
import { FETCH_WEATHER_ERROR, SEARCHED_LOCATION } from "./pubsubTopics";
import { searchBar, searchBtn, errorModal, closeModalBtn } from "./domElements";

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

function displayError() {
  errorModal.showModal();
}

export default function initSearch() {
  PubSub.subscribe(FETCH_WEATHER_ERROR, displayError);
  closeModalBtn.addEventListener("click", () => errorModal.close());
  searchBtn.addEventListener("click", search);
}

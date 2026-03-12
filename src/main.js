import "./style.scss";
import { fetchJoke } from "./api.js";

const currentJokeEl = document.querySelector(".joke-app__text");
const loadNewJokeBtn = document.querySelector(".joke-app__load");
const saveJokeBtn = document.querySelector(".joke-app__save");
const witzeListEl = document.querySelector(".saved-jokes__list");

async function loadNewJoke() {
  const joke = await fetchJoke();
  console.log(joke);

  currentJokeEl.innerText = joke[0].text;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);

function saveJoke() {
  const jokeText = currentJokeEl.innerText;
  const witze = JSON.parse(localStorage.getItem("witze")) || [];

  if (witze.includes(jokeText)) {
    alert("Witz bereits gespeichert");
    return;
  }
  witze.push(jokeText);
  localStorage.setItem("witze", JSON.stringify(witze));
  renderJokes();
}

saveJokeBtn.addEventListener("click", saveJoke);

function renderJokes() {
  const witze = JSON.parse(localStorage.getItem("witze")) || [];

  witzeListEl.innerHTML = "";

  witze.forEach((witz, index) => {
    const item = document.createElement("div");
    item.classList.add("save-joke__item");
    item.innerHTML = `
      <div class="save-joke">${witz}</div>
      <button class="saved-joke__remove">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="saved-joke__remove-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
    </svg></button>
    `;
    witzeListEl.appendChild(item);

    const deleteBtn = item.querySelector(".saved-joke__remove");
    deleteBtn.addEventListener("click", () => deleteJoke(index));
  });
}
renderJokes();

function deleteJoke(index) {
  const witze = JSON.parse(localStorage.getItem("witze")) || [];
  witze.splice(index, 1);
  localStorage.setItem("witze", JSON.stringify(witze));
  renderJokes();
}

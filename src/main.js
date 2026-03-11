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
  witze.push(jokeText);
  localStorage.setItem("witze", JSON.stringify(witze));
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
      <button class="saved-joke__remove">Löschen</button>
    `;
    witzeListEl.appendChild(item);
  });
}

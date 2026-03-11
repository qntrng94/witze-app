export async function fetchJoke() {
  const response = await fetch("https://witzapi.de/api/joke/");
  const data = await response.json();
  return data;
}

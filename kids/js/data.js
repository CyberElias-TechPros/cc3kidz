/* Tiny JSON loader with an in-memory cache. */

const cache = new Map();

export async function loadData(name) {
  if (cache.has(name)) return cache.get(name);

  const response = await fetch(`data/${name}.json`);
  if (!response.ok) {
    throw new Error(`Could not load ${name}.json (${response.status})`);
  }

  const json = await response.json();
  cache.set(name, json);
  return json;
}

export const getLessons = () => loadData("lessons").then((data) => data.lessons ?? []);
export const getEvents = () => loadData("events");
export const getQuiz = () => loadData("quizzes").then((data) => data.questions ?? []);
export const getVerses = () => loadData("verses").then((data) => data.verses ?? []);
export const getCharacters = () => loadData("characters").then((data) => data.characters ?? []);

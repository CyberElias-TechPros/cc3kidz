/* Local-only preferences, scores and achievement badges.
   No personal information is ever stored — only game progress. */

const PREFIX = "ceKids";

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(`${PREFIX}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable in private browsing — fail quietly. */
  }
}

export const storage = {
  get: read,
  set: write,
  remove(key) {
    try {
      window.localStorage.removeItem(`${PREFIX}:${key}`);
    } catch {
      /* no-op */
    }
  },
};

export const BADGES = [
  {
    id: "bible-explorer",
    name: "Bible Explorer",
    emoji: "🧭",
    description: "Score 7 or more in the Bible Quiz",
  },
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    emoji: "🏆",
    description: "Score a perfect 10 in the quiz",
  },
  {
    id: "memory-verse-star",
    name: "Memory Verse Star",
    emoji: "⭐",
    description: "Complete 3 memory verses",
  },
  {
    id: "word-champion",
    name: "Word Champion",
    emoji: "📖",
    description: "Guess 5 Bible characters",
  },
  {
    id: "praise-champion",
    name: "Praise Champion",
    emoji: "🎨",
    description: "Print a colouring page",
  },
];

export function getBadges() {
  const earned = read("badges", []);
  return Array.isArray(earned) ? earned : [];
}

export function hasBadge(id) {
  return getBadges().includes(id);
}

export function awardBadge(id) {
  const earned = getBadges();
  if (earned.includes(id)) return false;
  earned.push(id);
  write("badges", earned);
  return true;
}

export function clearProgress() {
  ["badges", "quizBest", "verseDone", "whoamiCorrect"].forEach((key) => {
    storage.remove(key);
  });
}

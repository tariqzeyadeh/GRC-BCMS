const PREFIX = 'grc-bcms:v1:';

export function storageKey(key) {
  return `${PREFIX}${key}`;
}

export function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (raw == null) return typeof fallback === 'function' ? fallback() : fallback;
    return JSON.parse(raw);
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback;
  }
}

export function saveJson(key, value) {
  localStorage.setItem(storageKey(key), JSON.stringify(value));
  return value;
}

export function removeJson(key) {
  localStorage.removeItem(storageKey(key));
}

/** Seed once: if key missing, write seed and return it. */
export function ensureSeed(key, seedFactory) {
  const existing = localStorage.getItem(storageKey(key));
  if (existing != null) {
    try {
      return JSON.parse(existing);
    } catch {
      /* fall through */
    }
  }
  const seed = typeof seedFactory === 'function' ? seedFactory() : seedFactory;
  saveJson(key, seed);
  return seed;
}

export function resetAllGrcStorage() {
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));
}

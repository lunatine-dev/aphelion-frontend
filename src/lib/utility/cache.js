// src/lib/utility/cache.js
const map = new Map();

export function getCached(key, ttlMs) {
    const hit = map.get(key);
    if (!hit) return null;
    if (Date.now() - hit.at > ttlMs) return null;
    return hit.data;
}

export function setCached(key, data) {
    map.set(key, { data, at: Date.now() });
}

export function invalidateCache(key) {
    if (key) map.delete(key);
    else map.clear();
}

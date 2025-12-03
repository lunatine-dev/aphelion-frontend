export const isEmpty = (obj) => {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
};
export function filterObject(obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => predicate(key, value)));
}

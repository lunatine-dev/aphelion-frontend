import { removeInlineComment, splitFirstEquals, unquote } from "$lib/utility/string.js";

const parseLine = (line) => {
    if (!line) return null;

    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("#")) return null;

    const pair = splitFirstEquals(line);
    if (!pair) return null;
    const { key, rawVal } = pair;

    let val = removeInlineComment(rawVal).trim();

    val = unquote(val);

    return { key, value: val };
};

export const envParser = {
    toObject: (str) => {
        let obj = {};
        let lines = str.split(/\r?\n/);

        for (const line of lines) {
            let parsedLine = parseLine(line);
            if (!parsedLine) continue;

            obj[parsedLine.key] = parsedLine.value;
        }

        return obj;
    },
    toString: (obj) => {
        let str = "";

        const keys = Object.keys(obj);

        for (const key of keys) {
            const needsQuotes = /[\s#=]/.test(obj[key]);
            const val = needsQuotes ? `"${obj[key].replace(/"/g, '\\"')}"` : obj[key];
            str += `${key}=${val}\n`;
        }

        str = str.trim();

        return str;
    },
};

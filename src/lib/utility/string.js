export const unquote = (val) => {
    if (val == null) return val;
    val = val.trim();

    if (val.length < 2) return val;

    const first = val[0];
    const last = val[val.length - 1];
    if (!((first === '"' && last === '"') || (first === "'" && last === "'"))) {
        return val;
    }

    const inner = val.slice(1, -1);
    let out = "";
    for (let i = 0; i < inner.length; i++) {
        const ch = inner[i];
        if (ch === "\\" && i + 1 < inner.length) {
            const nxt = inner[++i];
            if (nxt === "n") out += "\n";
            else if (nxt === "r") out += "\r";
            else if (nxt === "t") out += "\t";
            else if (nxt === "b") out += "\b";
            else if (nxt === "f") out += "\f";
            else out += nxt;
        } else {
            out += ch;
        }
    }
    return out;
};
export const removeInlineComment = (val) => {
    if (val == null) return val;
    let inQuote = false;
    let quoteChar = null;
    let escaped = false;
    let out = "";
    let lastNonWhitespaceChar = null;

    for (let i = 0; i < val.length; i++) {
        const ch = val[i];

        if (escaped) {
            out += ch;
            if (ch !== " " && ch !== "\t") lastNonWhitespaceChar = ch;
            escaped = false;
            continue;
        }

        if (ch === "\\") {
            out += ch;
            escaped = true;
            continue;
        }

        if (inQuote) {
            if (ch === quoteChar) {
                inQuote = false;
                quoteChar = null;
            }
            out += ch;
            if (ch !== " " && ch !== "\t") lastNonWhitespaceChar = ch;
            continue;
        }

        if (ch === '"' || ch === "'") {
            inQuote = true;
            quoteChar = ch;
            out += ch;
            lastNonWhitespaceChar = ch;
            continue;
        }

        if (ch === "#") {
            const prevChar = out.length ? out[out.length - 1] : null;
            const prevIsWhitespace = prevChar === " " || prevChar === "\t" || prevChar === null;

            if (prevIsWhitespace || lastNonWhitespaceChar == null) {
                break;
            } else {
                out += ch;
                lastNonWhitespaceChar = ch;
                continue;
            }
        }

        out += ch;
        if (ch !== " " && ch !== "\t") lastNonWhitespaceChar = ch;
    }

    return out.replace(/\s+$/, "");
};
export const splitFirstEquals = (line) => {
    const idx = line.indexOf("=");
    if (idx === -1) return null;
    const key = line.slice(0, idx).trim();
    const rawVal = line.slice(idx + 1);
    return { key, rawVal };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJSON = void 0;
/**
 * Extracts and parses the first valid JSON object or array from a given string.
 *
 * @template DataType - The expected type of the parsed JSON data.
 * @param {string} str - The string containing the JSON data.
 * @param {"object" | "array"} [type="object"] - Specifies whether to extract an object or an array.
 * @returns {DataType | unknown | null} - Returns the parsed JSON data if found and valid, otherwise returns null.
 *
 * The function searches for the first valid JSON object or array within the input string.
 * It attempts to parse the substring between the first opening brace/bracket and the last closing brace/bracket.
 * If parsing fails, it continues to search for other valid JSON substrings.
 */
const extractJSON = (str, type = "object") => {
    const parts = type === "object" ? ["{", "}"] : ["[", "]"];
    let firstOpen = str.indexOf(parts[0]);
    let firstClose = str.lastIndexOf(parts[1]);
    while (firstOpen !== -1 && firstClose !== -1 && firstClose > firstOpen) {
        const candidate = str.substring(firstOpen, firstClose + 1);
        try {
            return JSON.parse(candidate);
        }
        catch {
            firstClose = str.substring(0, firstClose).lastIndexOf(parts[1]);
        }
        if (firstClose <= firstOpen) {
            firstOpen = str.indexOf(parts[0], firstOpen + 1);
            firstClose = str.lastIndexOf(parts[1]);
        }
    }
    return null;
};
exports.extractJSON = extractJSON;

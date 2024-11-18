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
export declare const extractJSON: <DataType>(str: string, type?: "object" | "array") => DataType | null;
//# sourceMappingURL=extract_json.d.ts.map
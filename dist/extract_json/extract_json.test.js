"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extract_json_1 = require("./extract_json");
describe('extractJSON', () => {
    it('should extract and parse a valid JSON object from a string', () => {
        const str = 'Some text before {"key": "value"} some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toEqual({ key: 'value' });
    });
    it('should extract and parse a valid JSON array from a string', () => {
        const str = 'Some text before [1, 2, 3] some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'array');
        expect(result).toEqual([1, 2, 3]);
    });
    it('should return null if no valid JSON object is found', () => {
        const str = 'Some text without any JSON';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toBeNull();
    });
    it('should return null if no valid JSON array is found', () => {
        const str = 'Some text without any JSON';
        const result = (0, extract_json_1.extractJSON)(str, 'array');
        expect(result).toBeNull();
    });
    it('should return null if JSON parsing fails', () => {
        const str = 'Some text before {invalid: "json"} some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toBeNull();
    });
    it('should handle nested JSON objects', () => {
        const str = 'Some text before {"key": {"nestedKey": "nestedValue"}} some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toEqual({ key: { nestedKey: 'nestedValue' } });
    });
    it('should handle nested JSON arrays', () => {
        const str = 'Some text before [[1, 2], [3, 4]] some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'array');
        expect(result).toEqual([[1, 2], [3, 4]]);
    });
    it('should extract the first valid JSON object if multiple are present', () => {
        const str = 'Some text before {"key1": "value1"} some text {"key2": "value2"} after';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toEqual({ key1: 'value1' });
    });
    it('should extract the first valid JSON array if multiple are present', () => {
        const str = 'Some text before [1, 2] some text [3, 4] after';
        const result = (0, extract_json_1.extractJSON)(str, 'array');
        expect(result).toEqual([1, 2]);
    });
    it('should return null if the JSON object is incomplete', () => {
        const str = 'Some text before {"key": "value" some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'object');
        expect(result).toBeNull();
    });
    it('should return null if the JSON array is incomplete', () => {
        const str = 'Some text before [1, 2 some text after';
        const result = (0, extract_json_1.extractJSON)(str, 'array');
        expect(result).toBeNull();
    });
});

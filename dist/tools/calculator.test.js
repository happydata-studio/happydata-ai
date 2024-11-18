"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
describe('Calculator Tool', () => {
    test('should initialize with correct properties', () => {
        expect(calculator_1.calculator.name).toBe('calculator');
        expect(calculator_1.calculator.description).toBe('Calculate the result of an expression - pass in the expression as a javascript expression');
        expect(calculator_1.calculator.props).toEqual(['expression']);
    });
    test('should correctly evaluate a simple expression', async () => {
        const result = await calculator_1.calculator.function({ expression: '2 + 2' });
        expect(result).toBe(4);
    });
    test('should correctly evaluate a complex expression', async () => {
        const result = await calculator_1.calculator.function({ expression: '(5 * 10) / 2 + 3' });
        expect(result).toBe(28);
    });
    test('should handle division by zero', async () => {
        const result = await calculator_1.calculator.function({ expression: '10 / 0' });
        expect(result).toBe(Infinity);
    });
    test('should throw an error for invalid expressions', async () => {
        await expect(calculator_1.calculator.function({ expression: 'invalid expression' })).rejects.toThrow();
    });
    test('should handle expressions with variables', async () => {
        const result = await calculator_1.calculator.function({ expression: 'let a = 5; a * 2' });
        expect(result).toBe(10);
    });
});

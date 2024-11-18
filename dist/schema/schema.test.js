"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const schema_1 = require("./schema");
describe('HDSchema Tests', () => {
    const objectSchema = zod_1.z.object({
        name: zod_1.z.string(),
        age: zod_1.z.number()
    });
    const arraySchema = zod_1.z.array(zod_1.z.string());
    test('Should correctly identify object schema type', () => {
        const hdSchema = new schema_1.HDSchema(objectSchema);
        expect(hdSchema.type).toBe('object');
    });
    test('Should correctly identify array schema type', () => {
        const hdSchema = new schema_1.HDSchema(arraySchema);
        expect(hdSchema.type).toBe('array');
    });
    test('Should convert schema to JSON', () => {
        const hdSchema = new schema_1.HDSchema(objectSchema);
        const jsonSchema = hdSchema.toJSON();
        expect(jsonSchema).toHaveProperty('type', 'object');
        expect(jsonSchema).toHaveProperty('properties');
    });
    test('Should convert schema to string', () => {
        const hdSchema = new schema_1.HDSchema(objectSchema);
        const schemaString = hdSchema.toString();
        expect(typeof schemaString).toBe('string');
        expect(schemaString).toContain('"type":"object"');
    });
    test('Should validate correct data', () => {
        const hdSchema = new schema_1.HDSchema(objectSchema);
        const result = hdSchema.validate({ name: 'John', age: 30 });
        expect(result.valid).toBe(true);
    });
    test('Should invalidate incorrect data', () => {
        const hdSchema = new schema_1.HDSchema(objectSchema);
        const result = hdSchema.validate({ name: 'John', age: 'thirty' });
        expect(result.valid).toBe(false);
        expect(result.errors).toBeDefined();
    });
});

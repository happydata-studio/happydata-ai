import { z } from 'zod';
import { HDSchema } from './schema';

describe('HDSchema Tests', () => {
    const objectSchema = z.object({
        name: z.string(),
        age: z.number()
    });

    const arraySchema = z.array(z.string());

    test('Should correctly identify object schema type', () => {
        const hdSchema = new HDSchema(objectSchema);
        expect(hdSchema.type).toBe('object');
    });

    test('Should correctly identify array schema type', () => {
        const hdSchema = new HDSchema(arraySchema);
        expect(hdSchema.type).toBe('array');
    });

    test('Should convert schema to JSON', () => {
        const hdSchema = new HDSchema(objectSchema);
        const jsonSchema = hdSchema.toJSON();
        expect(jsonSchema).toHaveProperty('type', 'object');
        expect(jsonSchema).toHaveProperty('properties');
    });

    test('Should convert schema to string', () => {
        const hdSchema = new HDSchema(objectSchema);
        const schemaString = hdSchema.toString();
        expect(typeof schemaString).toBe('string');
        expect(schemaString).toContain('"type":"object"');
    });

    test('Should validate correct data', () => {
        const hdSchema = new HDSchema(objectSchema);
        const result = hdSchema.validate({ name: 'John', age: 30 });
        expect(result.valid).toBe(true);
    });

    test('Should invalidate incorrect data', () => {
        const hdSchema = new HDSchema(objectSchema);
        const result = hdSchema.validate({ name: 'John', age: 'thirty' });
        expect(result.valid).toBe(false);
        expect(result.errors).toBeDefined();
    });
});

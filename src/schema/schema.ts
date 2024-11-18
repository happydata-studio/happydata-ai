import { ZodArray, ZodSchema } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

/**
 * HDSchema class is a wrapper around ZodSchema to provide additional
 * functionalities such as JSON schema conversion and validation.
 */
export class HDSchema {
    schema: ZodSchema;
    type: "object" | "array" = "object";

    /**
     * Constructor for HDSchema.
     * @param schema - A ZodSchema instance to be wrapped.
     */
    constructor(schema: ZodSchema) {
        this.schema = schema;
        // Determine the type based on whether the schema is an array.
        if (schema instanceof ZodArray) {
            this.type = 'array';
        }
    }

    /**
     * Converts the Zod schema to a JSON schema.
     * @returns The JSON schema representation of the Zod schema.
     */
    toJSON<T>(): T {
        return zodToJsonSchema(this.schema) as T;
    }

    /**
     * Converts the schema to a JSON string.
     * @returns A stringified JSON schema.
     */
    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    /**
     * Validates the provided data against the schema.
     * @param data - The data to be validated.
     * @returns An object indicating whether the data is valid and any errors if invalid.
     */
    validate(data: unknown): { valid: boolean, errors?: string } {
        try {
            this.schema.parse(data);
            return {
                valid: true
            }
        } catch (e: any) {
            return {
                valid: false,
                errors: e.message
            }
        }
    }
}

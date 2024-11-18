import { ZodSchema } from "zod";
/**
 * HDSchema class is a wrapper around ZodSchema to provide additional
 * functionalities such as JSON schema conversion and validation.
 */
export declare class HDSchema {
    schema: ZodSchema;
    type: "object" | "array";
    /**
     * Constructor for HDSchema.
     * @param schema - A ZodSchema instance to be wrapped.
     */
    constructor(schema: ZodSchema);
    /**
     * Converts the Zod schema to a JSON schema.
     * @returns The JSON schema representation of the Zod schema.
     */
    toJSON<T>(): T;
    /**
     * Converts the schema to a JSON string.
     * @returns A stringified JSON schema.
     */
    toString(): string;
    /**
     * Validates the provided data against the schema.
     * @param data - The data to be validated.
     * @returns An object indicating whether the data is valid and any errors if invalid.
     */
    validate(data: unknown): {
        valid: boolean;
        errors?: string;
    };
}
//# sourceMappingURL=schema.d.ts.map
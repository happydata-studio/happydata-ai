"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HDSchema = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
/**
 * HDSchema class is a wrapper around ZodSchema to provide additional
 * functionalities such as JSON schema conversion and validation.
 */
class HDSchema {
    /**
     * Constructor for HDSchema.
     * @param schema - A ZodSchema instance to be wrapped.
     */
    constructor(schema) {
        this.type = "object";
        this.schema = schema;
        // Determine the type based on whether the schema is an array.
        if (schema instanceof zod_1.ZodArray) {
            this.type = 'array';
        }
    }
    /**
     * Converts the Zod schema to a JSON schema.
     * @returns The JSON schema representation of the Zod schema.
     */
    toJSON() {
        return (0, zod_to_json_schema_1.default)(this.schema);
    }
    /**
     * Converts the schema to a JSON string.
     * @returns A stringified JSON schema.
     */
    toString() {
        return JSON.stringify(this.toJSON());
    }
    /**
     * Validates the provided data against the schema.
     * @param data - The data to be validated.
     * @returns An object indicating whether the data is valid and any errors if invalid.
     */
    validate(data) {
        try {
            this.schema.parse(data);
            return {
                valid: true
            };
        }
        catch (e) {
            return {
                valid: false,
                errors: e.message
            };
        }
    }
}
exports.HDSchema = HDSchema;

import { ZodArray, ZodSchema } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export class HDSchema {
    schema: ZodSchema;
    type: "object" | "array" = "object";
    constructor(schema: ZodSchema) {
        this.schema = schema;
        if (schema instanceof ZodArray) {
            this.type = 'array';
        }
    }
    toJSON() {
        return zodToJsonSchema(this.schema);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    validate(data:unknown) {
        try {
            this.schema.parse(data);
            return {
                valid: true
            }
        } catch(e:any) {
            return {
                valid: false,
                errors: e.message
            }
        }
    }
}

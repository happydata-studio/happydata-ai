Here's a documentation draft for the `HDSchema` class, which provides an overview of its purpose, usage, and methods:

---

# HDSchema Class Documentation

The `HDSchema` class is a utility for handling and validating schemas defined using the `zod` library. It provides methods to convert schemas to JSON Schema format, validate data against the schema, and represent the schema as a string.

## Constructor

### `HDSchema(schema: ZodSchema)`

- **Parameters:**
  - `schema`: An instance of `ZodSchema` which defines the structure and validation rules for the data.

- **Description:** 
  Initializes a new instance of the `HDSchema` class. It determines the type of the schema (either "object" or "array") based on the provided `ZodSchema`.

## Properties

- **`schema: ZodSchema`**
  - The `ZodSchema` instance that defines the schema.

- **`type: "object" | "array"`**
  - A string indicating whether the schema is an object or an array. Defaults to "object".

## Methods

### `toJSON()`

- **Returns:** 
  - A JSON representation of the schema using the `zod-to-json-schema` library.

- **Description:** 
  Converts the `ZodSchema` to a JSON Schema format, which can be used for various purposes such as API documentation or client-side validation.

### `toString()`

- **Returns:** 
  - A string representation of the JSON Schema.

- **Description:** 
  Serializes the JSON Schema to a string format, useful for logging or storing the schema in a text-based format.

### `validate(data: unknown)`

- **Parameters:**
  - `data`: The data to be validated against the schema.

- **Returns:** 
  - An object with the following properties:
    - `valid: boolean`: Indicates whether the data is valid according to the schema.
    - `errors?: string`: Contains error messages if the data is invalid.

- **Description:** 
  Validates the provided data against the schema. If the data is valid, it returns an object with `valid` set to `true`. If invalid, it returns `valid` as `false` and includes error messages.

## Usage Example

```typescript
import { z } from 'zod';
import { HDSchema } from './schema';

const objectSchema = z.object({
    name: z.string(),
    age: z.number()
});

const hdSchema = new HDSchema(objectSchema);

// Validate data
const result = hdSchema.validate({ name: 'John', age: 30 });
console.log(result.valid); // true

// Convert to JSON Schema
const jsonSchema = hdSchema.toJSON();
console.log(jsonSchema);

// Convert to string
const schemaString = hdSchema.toString();
console.log(schemaString);
```

## Notes

- The `HDSchema` class leverages the `zod` library for schema definition and validation, and `zod-to-json-schema` for converting schemas to JSON Schema format.
- Ensure that the `zod` library is installed and properly configured in your project to use this class effectively.

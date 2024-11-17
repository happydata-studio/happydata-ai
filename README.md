# HappyData AI Utils

Welcome to the HappyData AI Utils library! This library provides a set of utilities to interact with OpenAI's API, manage prompts, redact sensitive information, and validate JSON schemas using Zod. It is designed to streamline the process of building AI-driven applications with a focus on privacy and data integrity.

## Features

- **OpenAI Integration**: Easily interact with OpenAI's chat models.
- **Prompt Management**: Create and manage different types of prompts (User, System, Assistant).
- **Redaction**: Automatically redact sensitive information such as emails, phone numbers, and more.
- **JSON Schema Validation**: Validate and enforce JSON structures using Zod schemas.

## Installation

To install the library, use npm or yarn:

```bash
npm install happydata-ai-utils
# or
yarn add happydata-ai-utils
```

## Usage

### OpenAI Integration

To use the OpenAI integration, you need to initialize the `HappyAI` class with your OpenAI API key:

```typescript
import OpenAI from "openai";
import { HappyAI } from "happydata-ai-utils";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const HappyAI = new HappyAI(openai);
```

### Chat with OpenAI

You can send messages to OpenAI using the `chat` method. This method accepts either a single string or an array of messages:

#### Using a String

```typescript
const response = await HappyAI.chat("What is the capital of Indiana?");
console.log(response.content); // Outputs: "Indianapolis"
```

#### Using an Array of Messages

```typescript
import { UserPrompt, SystemPrompt } from "happydata-ai-utils";

const messages = [
    new SystemPrompt("You are a helpful assistant."),
    new UserPrompt("What is the capital of Indiana?")
];

const response = await HappyAI.chat(messages);
console.log(response.content); // Outputs: "Indianapolis"
```

### JSON Output

To enforce a JSON structure in the response, use the `json` method with a Zod schema. This method also accepts either a single string or an array of messages:

#### Using a String

```typescript
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    state: z.string(),
    yearFounded: z.number()
});

const jsonResponse = await HappyAI.json("What is the capital of Indiana?", { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana", yearFounded: 1816 }
```

#### Using an Array of Messages

```typescript
const messages = [
    new SystemPrompt("You are a helpful assistant."),
    new UserPrompt("What is the capital of Indiana?")
];

const jsonResponse = await HappyAI.json(messages, { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana", yearFounded: 1816 }
```

### Redaction

To redact sensitive information from messages, enable the `redact` option:

```typescript
const message = "My email is example@example.com and my phone is 123-456-7890.";
const redactedResponse = await HappyAI.chat(message, { redact: true });  // Sensitive information is redacted before sending to LLM
console.log(redactedResponse.content);// Sensitive information is repopulated in the response
```

### Prompt Management

Create and manage different types of prompts:

```typescript
import { UserPrompt, SystemPrompt, AssistantPrompt } from "happydata-ai-utils";

const userPrompt = new UserPrompt("User message");
const systemPrompt = new SystemPrompt("System message");
const assistantPrompt = new AssistantPrompt("Assistant message");
```

### JSON Schema Validation

Validate JSON data against a Zod schema:

```typescript
import { HDSchema } from "happydata-ai-utils";

const schema = new HDSchema(z.object({
    name: z.string(),
    age: z.number()
}));

const validationResult = schema.validate({ name: "Alice", age: 30 });
console.log(validationResult.valid); // true
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact us at support@happydata.org.


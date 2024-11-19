Certainly! Below is a documentation draft for the `HappyAI` class, including examples for both OpenAI and Ollama integrations.

---

# HappyAI Documentation

The `HappyAI` class is designed to facilitate chat interactions with AI models, supporting both OpenAI and Ollama. It provides methods for handling chat messages, redacting sensitive information, and extracting JSON data from responses.


## Usage

### Initialization

To use `HappyAI`, you need to initialize it with either an OpenAI or Ollama instance.

#### OpenAI Example

```typescript
import OpenAI from "openai";
import { HappyAI } from "./happy_ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const happyAI = new HappyAI(openai);
```

#### Ollama Example

```typescript
import { Ollama } from "ollama";
import { HappyAI } from "./happy_ai";

const ollama = new Ollama();

const happyAI = new HappyAI(ollama);
```

### Chat Method

The `chat` method allows you to send messages to the AI and receive responses.

#### Example with OpenAI

```typescript
const response = await happyAI.chat("What is the capital of Indiana?");
console.log(response.content); // Outputs: "Indianapolis"
```

#### Example with Ollama

```typescript
const response = await happyAI.chat("What is the capital of Indiana?");
console.log(response.content); // Outputs: "Indianapolis"
```

### JSON Method

The `json` method is used to extract structured JSON data from the AI's response, requiring a Zod schema for validation.

#### Example with OpenAI

```typescript
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    state: z.string()
});

const jsonResponse = await happyAI.json("What is the capital of Indiana?", { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana" }
```

#### Example with Ollama

```typescript
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    state: z.string()
});

const jsonResponse = await happyAI.json("What is the capital of Indiana?", { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana" }
```

### Streaming Example

The `chat` method can also be used in streaming mode, allowing you to receive parts of the response as they are generated.

#### Example with OpenAI

```typescript
await happyAI.chat("Tell me a story about a brave knight.", {
    stream: true,
    onToken: (token) => {
        console.log(token); // Outputs parts of the story as they are generated
    }
});
```

#### Example with Ollama

```typescript
await happyAI.chat("Tell me a story about a bra ve knight.", {
    stream: true,
    onToken: (token) => {
        console.log(token); // Outputs parts of the story as they are generated
    }
});
```

Certainly! Below are examples demonstrating how to use both a single string and an array of messages with the `chat` and `json` methods in the `HappyAI` class.

---

## Using `HappyAI` with Single String and Array of Messages

### Chat Method

#### Single String Example

You can pass a single string message to the `chat` method:

```typescript
const response = await happyAI.chat("What is the capital of Indiana?");
console.log(response.content); // Outputs: "Indianapolis"
```

#### Array of Messages Example

You can also pass an array of messages, which can include different types of prompts:

```typescript
import { UserPrompt } from '../prompt/prompt.class';

const messages = [
    new UserPrompt("What is the capital of Indiana?"),
    new UserPrompt("Please only output the city name.")
];

const response = await happyAI.chat(messages);
console.log(response.content); // Outputs: "Indianapolis"
```

### JSON Method

#### Single String Example

For the `json` method, you can pass a single string message along with a schema:

```typescript
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    state: z.string()
});

const jsonResponse = await happyAI.json("What is the capital of Indiana?", { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana" }
```

#### Array of Messages Example

Similarly, you can pass an array of messages to the `json` method:

```typescript
import { UserPrompt } from '../prompt/prompt.class';
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    state: z.string()
});

const messages = [
    new UserPrompt("What is the capital of Indiana?"),
    new UserPrompt("Please provide the state as well.")
];

const jsonResponse = await happyAI.json(messages, { schema });
console.log(jsonResponse); // Outputs: { city: "Indianapolis", state: "Indiana" }
```

### Redaction

The `chat` method supports redacting sensitive information from messages.

```typescript
const message = "This is a test message with email brandon@happydata.org and phone 315-444-3211.";
const chat = await happyAI.chat(message, { redact: true });
console.log(chat.content); // Sensitive information is redacted
```

### Error Handling

Ensure to handle errors, especially when extracting JSON, as a schema is required.

```typescript
try {
    const jsonResponse = await happyAI.json("What is the capital of Indiana?");
} catch (error) {
    console.error(error.message); // Outputs: "Zod Schema is required for json output"
}
```

## Conclusion

The `HappyAI` class provides a flexible interface for interacting with AI models, supporting both OpenAI and Ollama. It simplifies the process of sending messages, handling responses, and extracting structured data.
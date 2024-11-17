# `Prompt` Class Documentation

The `Prompt` class is designed to create and manage message prompts with different roles. It supports variable extraction and replacement within the message content.

## Class Definition

```typescript
type TBaseMessageRole = "system" | "assistant" | "user";

export class Prompt {
  role: TBaseMessageRole;
  content: string;
  meta?: Record<string, any>;

  constructor(content: string | string[], role: TBaseMessageRole, meta?: Record<string, any>);
  public getVariables(): string[];
  public variables(variables: Record<string, string>): Prompt;
  public render(variables: Record<string, string>): Prompt;
}
```

### Constructor

- **Parameters:**
  - `content`: A string or an array of strings representing the message content. If an array is provided, it is joined into a single string with newline characters.
  - `role`: A string indicating the role of the message. It can be "system", "assistant", or "user".
  - `meta`: An optional object containing metadata for the message.

### Methods

- **`getVariables(): string[]`**
  - Extracts and returns a list of variable names found in the content. Variables are denoted by `{variableName}`.

- **`variables(variables: Record<string, string>): Prompt`**
  - Replaces variables in the content with the provided values and returns a new `Prompt` instance.

- **`render(variables: Record<string, string>): Prompt`**
  - Similar to `variables`, it replaces placeholders in the content with corresponding values and returns a new `Prompt` instance.

## Prompt Types

### `SystemPrompt`

A specialized `Prompt` for system messages.

```typescript
const systemPrompt = new SystemPrompt("System maintenance at {time}.", { priority: "high" });
console.log(systemPrompt.role); // Output: "system"
```

### `UserPrompt`

A specialized `Prompt` for user messages.

```typescript
const userPrompt = new UserPrompt("Welcome, {username}!");
console.log(userPrompt.role); // Output: "user"
```

### `AssistantPrompt`

A specialized `Prompt` for assistant messages.

```typescript
const assistantPrompt = new AssistantPrompt("How can I assist you today?");
console.log(assistantPrompt.role); // Output: "assistant"
```


## Examples

### Creating a Basic Prompt

```typescript
const prompt = new Prompt("Hello, {name}!", "user");
console.log(prompt.content); // Output: "Hello, {name}!"
```

```typescript
const prompt = new Prompt([
  `You can also use arrays to create multi-line prompts.`,
  `Here is an example of a very long prompt that is split into multiple lines.`,
], "user");
console.log(prompt.content);
```

### Extracting Variables

```typescript
const prompt = new Prompt("Hello, {name}! Your order {orderId} is ready.", "user");
const variables = prompt.getVariables();
console.log(variables); // Output: ["name", "orderId"]
```

### Replacing Variables

```typescript
const prompt = new Prompt("Hello, {name}!", "user");
const filledPrompt = prompt.variables({ name: "Alice" });
console.log(filledPrompt.content); // Output: "Hello, Alice!"
```

### Using Meta Information

```typescript
const prompt = new Prompt("Hello, {name}!", "user", { timestamp: Date.now() });
console.log(prompt.meta); // Output: { timestamp: 1634567890123 }
```


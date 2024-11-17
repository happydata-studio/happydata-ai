// Define a type for the roles that a message can have
type TBaseMessageRole = "system" | "assistant" | "user";

// Define a class for creating and managing prompts
export class Prompt {
  role: TBaseMessageRole; // Role of the message
  content: string; // Content of the message
  meta?: Record<string, any>; // Optional metadata for the message

  // Constructor to initialize the prompt
  constructor(content: string | string[], role: TBaseMessageRole, meta?: Record<string, any>) {
    // If content is an array, join it into a single string
    if (Array.isArray(content)) {
      this.content = content.join("\n");
    } else {
      this.content = content;
    }
    this.role = role;
    this.meta = {}; // Initialize meta as an empty object
    // Merge provided meta with the initialized meta
    this.meta = { ...this.meta, ...meta || {} };
  }

  // Method to extract variables from the content
  public getVariables(): string[] {
    const variablePattern = /\{(\w+)\}/g; // Regex pattern to match variables
    const variables: string[] = [];
    let match: RegExpExecArray | null;

    // Find all matches of the pattern in the content
    while ((match = variablePattern.exec(this.content)) !== null) {
      variables.push(match[1]); // Add the variable name to the list
    }

    return variables;
  }

  // Method to replace variables in the content and return a new Prompt
  public variables(variables: Record<string, string>): Prompt {
    return this.render(variables);
  }

  // Method to replace variables in the content and return a new Prompt
  public render(variables: Record<string, string>): Prompt {
    let renderedContent = this.content;
    // Replace each placeholder with the corresponding value
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{${key}}`;
      renderedContent = renderedContent.replace(new RegExp(placeholder, 'g'), value);
    }
    // Return a new Prompt with the rendered content
    return new Prompt(renderedContent, this.role, this.meta);
  }
}

// Define a class for system prompts, extending the Prompt class
export class SystemPrompt extends Prompt {
  constructor(content: string | string[], meta?: Record<string, any>) {
    super(content, "system", meta); // Call the parent constructor with "system" role
  }
}

// Define a class for user prompts, extending the Prompt class
export class UserPrompt extends Prompt {
  constructor(content: string | string[], meta?: Record<string, any>) {
    super(content, "user", meta); // Call the parent constructor with "user" role
  }
}

// Define a class for assistant prompts, extending the Prompt class
export class AssistantPrompt extends Prompt {
  constructor(content: string | string[], meta?: Record<string, any>) {
    super(content, "assistant", meta); // Call the parent constructor with "assistant" role
  }
}


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantPrompt = exports.UserPrompt = exports.SystemPrompt = exports.Prompt = void 0;
// Define a class for creating and managing prompts
class Prompt {
    // Constructor to initialize the prompt
    constructor(content, role, meta) {
        // If content is an array, join it into a single string
        if (Array.isArray(content)) {
            this.content = content.join("\n");
        }
        else {
            this.content = content;
        }
        this.role = role;
        this.meta = {}; // Initialize meta as an empty object
        // Merge provided meta with the initialized meta
        this.meta = { ...this.meta, ...meta || {} };
    }
    // Method to extract variables from the content
    getVariables() {
        const variablePattern = /\{(\w+)\}/g; // Regex pattern to match variables
        const variables = [];
        let match;
        // Find all matches of the pattern in the content
        while ((match = variablePattern.exec(this.content)) !== null) {
            variables.push(match[1]); // Add the variable name to the list
        }
        return variables;
    }
    // Method to replace variables in the content and return a new Prompt
    variables(variables) {
        return this.render(variables);
    }
    // Method to replace variables in the content and return a new Prompt
    render(variables) {
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
exports.Prompt = Prompt;
// Define a class for system prompts, extending the Prompt class
class SystemPrompt extends Prompt {
    constructor(content, meta) {
        super(content, "system", meta); // Call the parent constructor with "system" role
    }
}
exports.SystemPrompt = SystemPrompt;
// Define a class for user prompts, extending the Prompt class
class UserPrompt extends Prompt {
    constructor(content, meta) {
        super(content, "user", meta); // Call the parent constructor with "user" role
    }
}
exports.UserPrompt = UserPrompt;
// Define a class for assistant prompts, extending the Prompt class
class AssistantPrompt extends Prompt {
    constructor(content, meta) {
        super(content, "assistant", meta); // Call the parent constructor with "assistant" role
    }
}
exports.AssistantPrompt = AssistantPrompt;

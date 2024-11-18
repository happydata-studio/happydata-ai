"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToChatCompletionMessageParam = exports.HappyAI = void 0;
const openai_1 = __importDefault(require("openai"));
const zod_1 = require("zod");
const schema_1 = require("../schema/schema");
const prompt_class_1 = require("../prompt/prompt.class");
const redactor_class_1 = require("../redactor/redactor.class");
const extract_json_1 = require("../extract_json/extract_json");
// Main class for handling AI chat interactions
class HappyAI {
    // Constructor to initialize OpenAI instance
    constructor(ai) {
        this.openai = ai;
        this.type = ai instanceof openai_1.default ? "openai" : "ollama";
    }
    // Helper function to convert messages to an array of Prompts
    prepareMessages(messages) {
        if (typeof messages === "string") {
            return [new prompt_class_1.UserPrompt(messages)];
        }
        return messages;
    }
    async tools(tools, messages) {
        const toolsSchema = zod_1.z.array(zod_1.z.object({
            tool: zod_1.z.string(),
            description: zod_1.z.string(),
            props: zod_1.z.record(zod_1.z.any()),
        }));
        const schema = new schema_1.HDSchema(toolsSchema);
        const toolPrompt = new prompt_class_1.SystemPrompt([
            `You are a tool extraction AI. You only output JSON as a list of tools. You are given a list of tools and an user prompt, and need to deteremine which tools to use to answer the question.`,
            `Here are the list of available tools:`,
            `${tools.map(tool => {
                return `   - ${tool.asString}`;
            }).join('\n')}`,
            `Please! Output which relevant tools (if any) should be used in the JSON format following the provided JSON SCHEMA EXACTLY: ${schema.toString()}`,
            `JSON examples based on the above JSON Schema: `,
            `[{"tool": "toolName1", "props": {"propName": "propValue"}}, {"tool": "toolName2", "props": {"propName": "propValue"}}],`
        ]);
        let toolsResponse = await this.chat([toolPrompt, ...messages]);
        let selectedTools = (0, extract_json_1.extractJSON)(toolsResponse.content, "array");
        if (!schema.validate(selectedTools).valid) {
            console.error("🛑🛑🛑🛑🛑🛑 Invalid tools response", selectedTools);
            throw new Error("Invalid tools response");
        }
        let answers = [];
        for (const tool of selectedTools || []) {
            const toolInstance = tools.find(t => t.name === tool.tool);
            if (toolInstance) {
                const result = await toolInstance.function(tool.props);
                answers.push({
                    tool: tool.tool,
                    props: tool.props,
                    result
                });
            }
        }
        return answers;
    }
    // Method to handle chat interactions
    async chat(messages, options) {
        let messagesToSend = this.prepareMessages(messages);
        let systemMessages = [];
        // Add system messages if a schema is provided
        if (options?.schema) {
            const schema = new schema_1.HDSchema(options.schema);
            systemMessages.push(new prompt_class_1.SystemPrompt([
                `You are a helpful assistant that can answer questions and return data in JSON format.`,
                `Output only JSON that follows the provided JSON Schema: Do not output the schema, but the JSON itself.`,
            ]));
            systemMessages.push(new prompt_class_1.UserPrompt(`Output ONLY JSON that follows this JSON SCHEMA: ${schema.toString()}`));
        }
        // Prepare the Redactor 
        const redactor = new redactor_class_1.Redactor();
        // Prepare chat messages, applying redaction if necessary
        const chatMessages = [
            ...systemMessages.map(msg => convertToChatCompletionMessageParam(msg)),
            ...messagesToSend.map(msg => convertToChatCompletionMessageParam(msg))
        ].map((msg) => {
            if (options?.redact) {
                return {
                    ...msg,
                    content: redactor.redact(Array.isArray(msg.content)
                        ? msg.content.map(part => part.toString()).join('')
                        : (msg.content ?? ""))
                };
            }
            return msg;
        });
        let stream;
        // Create a stream for chat completions
        if (this.openai instanceof openai_1.default) {
            stream = await this.openai.chat.completions.create({
                messages: chatMessages,
                stream: true,
                model: options?.model ?? "gpt-4o-mini",
            });
        }
        else {
            stream = await this.openai.generate({
                model: options?.model ?? "llama3.2",
                prompt: chatMessages.map(msg => msg.content).join("\n"),
                stream: true
            });
        }
        const answer = [];
        // Process each chunk of the stream
        try {
            for await (const chunk of stream) {
                if (this.type === "ollama") {
                    const content = chunk.response;
                    if (content) {
                        answer.push(content);
                        options?.onToken?.(content);
                    }
                }
                else {
                    const content = chunk.choices?.[0]?.delta?.content;
                    if (content) {
                        answer.push(content);
                        options?.onToken?.(content);
                    }
                }
            }
        }
        catch (error) {
            console.error("Error processing stream:", error);
            throw new Error("Failed to process chat stream");
        }
        // Refill redacted content if necessary
        const answerString = options?.redact ? redactor.refill(answer.join("")) : answer.join("");
        return new prompt_class_1.AssistantPrompt(answerString);
    }
    // Method to handle JSON output
    async json(messages, options) {
        if (!options?.schema) {
            throw new Error("Zod Schema is required for json output");
        }
        const schema = new schema_1.HDSchema(options.schema);
        // Get the chat response
        const answer = await this.chat(messages, {
            ...options,
            output: "json",
            schema: schema.schema
        });
        // Extract JSON from the response
        const jsonPayload = (0, extract_json_1.extractJSON)(answer.content, schema.type);
        if (!jsonPayload) {
            throw new Error("Failed to extract JSON from the response. Ensure the response matches the schema.");
        }
        return jsonPayload;
    }
}
exports.HappyAI = HappyAI;
// Helper function to convert to `ChatCompletionMessageParam`
function convertToChatCompletionMessageParam(msg) {
    if (typeof msg === 'string') {
        return { role: 'user', content: msg }; // Example conversion for strings
    }
    else if (msg instanceof prompt_class_1.Prompt) {
        return { role: msg.role, content: msg.content }; // Example conversion for `Prompt`
    }
    return msg; // If it's already `ChatCompletionMessageParam`, return as is
}
exports.convertToChatCompletionMessageParam = convertToChatCompletionMessageParam;

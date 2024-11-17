import OpenAI from "openai";
import { ZodSchema } from "zod";
import { HDSchema } from "../schema/schema";
import { AssistantPrompt, Prompt, SystemPrompt, UserPrompt } from "../prompt/prompt.class";
import { Redactor } from "../redactor/redactor.class";
import { extractJSON } from "../extract_json/extract_json";
import { Ollama } from "ollama";

// Interface for chat options
interface HappyAIChatOptions {
    model?: OpenAI.ChatModel | string; // Model to use for chat
    onToken?: (token: string) => void; // Callback for each token received
    redact?: boolean; // Whether to redact sensitive information
    output?: "string" | "json"; // Output format
    schema?: ZodSchema; // Schema for JSON validation
}

// Main class for handling AI chat interactions
export class HappyAI {
    openai: OpenAI | Ollama;
    type: "openai" | "ollama";

    // Constructor to initialize OpenAI instance
    constructor(ai: OpenAI | Ollama) {
        this.openai = ai;
        this.type = ai instanceof OpenAI ? "openai" : "ollama";
    }

    // Helper function to convert messages to an array of Prompts
    private prepareMessages(messages: string | Array<Prompt | OpenAI.ChatCompletionMessageParam>): Array<Prompt | OpenAI.ChatCompletionMessageParam> {
        if (typeof messages === "string") {
            return [new UserPrompt(messages)];
        }
        return messages;
    }

    // Method to handle chat interactions
    public async chat(messages: string | Array<Prompt | OpenAI.ChatCompletionMessageParam>, options?: HappyAIChatOptions): Promise<AssistantPrompt> {
        let messagesToSend = this.prepareMessages(messages);

        let systemMessages: Array<Prompt | OpenAI.ChatCompletionMessageParam> = [];
        
        // Add system messages if a schema is provided
        if (options?.schema) {
            const schema = new HDSchema(options.schema);
            systemMessages.push(new SystemPrompt([
                `You are a helpful assistant that can answer questions and return data in JSON format.`,
                `Output only JSON - MAKE SURE the JSON follows the users provided JSON Schema exactly.`,
            ]));
            systemMessages.push(new UserPrompt(
                `Output JSON that follows this JSON SCHEMA: ${schema.toString()}`
            ));
        }

        // Prepare the Redactor 
        const redactor = new Redactor();
        
        // Prepare chat messages, applying redaction if necessary
        const chatMessages: OpenAI.ChatCompletionMessageParam[] = [
            ...systemMessages.map(msg => convertToChatCompletionMessageParam(msg)),
            ...messagesToSend.map(msg => convertToChatCompletionMessageParam(msg))
        ].map((msg) => {
            if (options?.redact) {
                return {
                    ...msg,
                    content: redactor.redact(
                        Array.isArray(msg.content)
                            ? msg.content.map(part => part.toString()).join('')
                            : (msg.content ?? "")
                    )
                }
            }
            return msg;
        });

        let stream:any;

        // Create a stream for chat completions
        if(this.openai instanceof OpenAI){
            stream = await this.openai.chat.completions.create({
                messages: chatMessages,
                stream: true,
                model: options?.model ?? "gpt-4o-mini",
            });
        } else {
            stream = await this.openai.generate({
                model: options?.model ?? "llama3.2",
                prompt: chatMessages.map(msg => msg.content).join("\n"),
                stream: true
            });
        }

        const answer: string[] = [];
        
        // Process each chunk of the stream
        try {
            for await (const chunk of stream) {
                if(this.type === "ollama"){
                    const content = chunk.response;
                    if (content) {
                        answer.push(content);
                        options?.onToken?.(content);
                    }
                } else {
                    const content = chunk.choices?.[0]?.delta?.content;
                    if (content) {
                        answer.push(content);
                        options?.onToken?.(content);
                    }
                }
            }
        } catch (error) {
            console.error("Error processing stream:", error);
            throw new Error("Failed to process chat stream");
        }
        // Refill redacted content if necessary
        const answerString = options?.redact ? redactor.refill(answer.join("")) : answer.join("");

        return new AssistantPrompt(answerString);
    }

    // Method to handle JSON output
    public async json<T>(messages: string | Array<Prompt | OpenAI.ChatCompletionMessageParam>, options?: HappyAIChatOptions): Promise<T> {
        if (!options?.schema) {
            throw new Error("Zod Schema is required for json output");
        }

        const schema = new HDSchema(options.schema);

        // Get the chat response
        const answer = await this.chat(messages, {
            ...options,
            output: "json",
            schema: schema.schema
        });

        // Extract JSON from the response
        const jsonPayload: T | null = extractJSON<T>(answer.content, schema.type);
        if (!jsonPayload) {
            throw new Error("Failed to extract JSON from the response. Ensure the response matches the schema.");
        }

        return jsonPayload;
    }
}

// Helper function to convert to `ChatCompletionMessageParam`
export function convertToChatCompletionMessageParam(msg: string | Prompt | OpenAI.ChatCompletionMessageParam): OpenAI.ChatCompletionMessageParam {
    if (typeof msg === 'string') {
        return { role: 'user', content: msg }; // Example conversion for strings
    } else if (msg instanceof Prompt) {
        return { role: 'user', content: msg.content }; // Example conversion for `Prompt`
    }
    return msg; // If it's already `ChatCompletionMessageParam`, return as is
}
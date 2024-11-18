import OpenAI from "openai";
import { ZodSchema } from "zod";
import { AssistantPrompt, Prompt } from "../prompt/prompt.class";
import { Ollama } from "ollama";
import { Tool } from "../tools/tool.class";
interface HappyAIChatOptions {
    model?: OpenAI.ChatModel | string;
    onToken?: (token: string) => void;
    redact?: boolean;
    output?: "string" | "json";
    schema?: ZodSchema;
}
export declare class HappyAI {
    openai: OpenAI | Ollama;
    type: "openai" | "ollama";
    constructor(ai: OpenAI | Ollama);
    private prepareMessages;
    tools(tools: Tool[], messages: Array<Prompt | OpenAI.ChatCompletionMessageParam>): Promise<any>;
    chat(messages: string | Array<Prompt | OpenAI.ChatCompletionMessageParam>, options?: HappyAIChatOptions): Promise<AssistantPrompt>;
    json<T>(messages: string | Array<Prompt | OpenAI.ChatCompletionMessageParam>, options?: HappyAIChatOptions): Promise<T>;
}
export declare function convertToChatCompletionMessageParam(msg: string | Prompt | OpenAI.ChatCompletionMessageParam): OpenAI.ChatCompletionMessageParam;
export {};
//# sourceMappingURL=happy_ai.d.ts.map
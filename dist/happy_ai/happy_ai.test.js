"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai_1 = __importDefault(require("openai"));
const happy_ai_1 = require("./happy_ai");
const zod_1 = require("zod");
const prompt_class_1 = require("../prompt/prompt.class");
const ollama_1 = require("ollama");
const calculator_1 = require("../tools/calculator");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({
    apiKey: OPENAI_API_KEY
});
const ollama = new ollama_1.Ollama();
const happyAI = new happy_ai_1.HappyAI(openai);
const happyAIOllama = new happy_ai_1.HappyAI(ollama);
// describe("hd-ai ollama tests", () => {
//     const happyAI = new HappyAI(ollama);
//     test("Should support ollama", async () => {
//         const answer = await happyAI.chat("What is the capital of Indiana? - only output the city name, no other details - this is for an automated test.");
//         expect(answer.content).toEqual("Indianapolis");
//     });
//     test("Should support ollama with JSON", async () => {
//         const schema = z.object({
//             city: z.string()
//         });
//         const answer: z.infer<typeof schema> = await happyAI.json("What is the capital of Indiana? - only output the city name, no other details - this is for an automated test.", { schema });
//         expect(answer.city).toEqual("Indianapolis");
//     });
// })
describe("hd-ai  JSON test", () => {
    const ComplcatedSchema = zod_1.z.object({
        facts: zod_1.z.array(zod_1.z.object({
            fact: zod_1.z.string(),
            source: zod_1.z.string()
        })).describe("An array of facts about the city"),
        founded: zod_1.z.number().describe("The year the city was founded"),
        population: zod_1.z.number().describe("The population of the city"),
        mayor: zod_1.z.string().describe("The name of the mayor of the city"),
        website: zod_1.z.string().describe("The website of the city"),
    });
    test("Should support JSON output", async () => {
        const answer = await happyAIOllama.json([
            new prompt_class_1.UserPrompt("tell me a little about Indianapolis. "),
        ], { schema: ComplcatedSchema });
        expect(answer.facts.length).toBeGreaterThan(0);
        expect(answer.founded).toBeGreaterThan(1700);
        expect(answer.population).toBeGreaterThan(800000);
        expect(answer.mayor).toBeTruthy();
        expect(answer.website.toLowerCase()).toContain("http");
    });
});
describe("hd-ai tools tests with OpenAI and Ollama", () => {
    test("Should support tools with OpenAI", async () => {
        const tools = await happyAI.tools([calculator_1.calculator], [new prompt_class_1.UserPrompt("What is 2 + 2?")]);
        expect(tools[0].result).toBe(4);
    });
    test("Should support tools with Ollama", async () => {
        const tools = await happyAIOllama.tools([calculator_1.calculator], [new prompt_class_1.UserPrompt("What is 2 + 2?")]);
        // Debugging log to check the structure of tools
        console.log("Tools output:", tools);
        expect(tools[0].result).toBe(4);
    });
});
describe('hd-ai - chat tests', () => {
    test('Should support multiple message types', async () => {
        const answer = await happyAI.chat([new prompt_class_1.UserPrompt("What is the capital of Indiana? - only output the city name, no other details - this is for an automated test.")]);
        expect(answer.content).toEqual("Indianapolis");
    });
    test('Should support a single string message', async () => {
        const answer = await happyAI.chat("What is the capital of Indiana? - only output the city name, no other details - this is for an automated test.");
        expect(answer.content).toEqual("Indianapolis");
    });
    test('Should redact sensitive information', async () => {
        const message = new prompt_class_1.UserPrompt("This is a test message with email brandon@happydata.org and phone 315-444-3211.");
        const chat = await happyAI.chat([message], { redact: true });
        expect(chat.content).not.toContain("brandon@happydata.org");
        expect(chat.content).not.toContain("315-444-3211");
    });
});
describe('hd-ai - JSON chat tests', () => {
    const schema = zod_1.z.object({
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        yearFounded: zod_1.z.number().describe("The year the city was founded")
    });
    test('Should support generating JSON from a message', async () => {
        const answer = await happyAI.json("What is the capital of Indiana?", { schema });
        expect(answer.city).toEqual("Indianapolis");
        expect(answer.state).toEqual("Indiana");
        // Uncomment if yearFounded is expected in the response
        // expect(answer.yearFounded).toEqual(1816);    
    });
    test('Should throw error if schema is not provided for JSON output', async () => {
        await expect(happyAI.json("What is the capital of Indiana?")).rejects.toThrow("Zod Schema is required for json output");
    });
});
describe("hd-ai - stream tests", () => {
    test("Should create a stream for OpenAI chat completions", async () => {
        const happyAi = new happy_ai_1.HappyAI(openai);
        const answer = await happyAi.chat("Test message for OpenAI stream");
        expect(answer).toBeInstanceOf(prompt_class_1.AssistantPrompt);
    });
    test("Should create a stream for Ollama chat completions", async () => {
        const ollamaHappyAI = new happy_ai_1.HappyAI(ollama);
        const answer = await ollamaHappyAI.chat("Test message for Ollama stream");
        expect(answer).toBeInstanceOf(prompt_class_1.AssistantPrompt);
    });
});
describe("hd-ai - JSON extraction tests", () => {
    const schema = zod_1.z.object({
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        yearFounded: zod_1.z.number().describe("The year the city was founded")
    });
    test("Should convert different message types", () => {
        const stringMessage = "Test string message";
        const promptMessage = new prompt_class_1.UserPrompt("Test prompt message");
        const chatParamMessage = { role: 'user', content: "Test chat param message" };
        expect((0, happy_ai_1.convertToChatCompletionMessageParam)(stringMessage)).toEqual({ role: 'user', content: stringMessage });
        expect((0, happy_ai_1.convertToChatCompletionMessageParam)(promptMessage)).toEqual({ role: 'user', content: promptMessage.content });
        expect((0, happy_ai_1.convertToChatCompletionMessageParam)(chatParamMessage)).toEqual(chatParamMessage);
    });
    test("Should successfully extract JSON", async () => {
        const validSchema = zod_1.z.object({
            city: zod_1.z.string(),
            state: zod_1.z.string()
        });
        const answer = await happyAI.json("What is the capital of Indiana?", { schema: validSchema });
        expect(answer.city).toEqual("Indianapolis");
        expect(answer.state).toEqual("Indiana");
    });
});
// ... additional tests if necessary ...

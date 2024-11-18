"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_class_1 = require("./prompt.class");
describe('Prompt', () => {
    it('should initialize with string content', () => {
        const prompt = new prompt_class_1.Prompt('Hello, world!', 'user');
        expect(prompt.content).toBe('Hello, world!');
        expect(prompt.role).toBe('user');
        expect(prompt.meta).toEqual({});
    });
    it('should initialize with array content', () => {
        const prompt = new prompt_class_1.Prompt(['Hello', 'world!'], 'user');
        expect(prompt.content).toBe('Hello\nworld!');
        expect(prompt.role).toBe('user');
        expect(prompt.meta).toEqual({});
    });
    it('should extract variables from content', () => {
        const prompt = new prompt_class_1.Prompt('Hello, {name}!', 'user');
        expect(prompt.getVariables()).toEqual(['name']);
    });
    it('should render content with variables', () => {
        const prompt = new prompt_class_1.Prompt('Hello, {name}!', 'user');
        const renderedPrompt = prompt.variables({ name: 'Alice' });
        expect(renderedPrompt.content).toBe('Hello, Alice!');
        expect(renderedPrompt.role).toBe('user');
        expect(renderedPrompt.meta).toEqual({});
    });
});
describe('SystemPrompt', () => {
    it('should initialize with system role', () => {
        const prompt = new prompt_class_1.SystemPrompt('System message');
        expect(prompt.role).toBe('system');
    });
});
describe('UserPrompt', () => {
    it('should initialize with user role', () => {
        const prompt = new prompt_class_1.UserPrompt('User message');
        expect(prompt.role).toBe('user');
    });
});
describe('AssistantPrompt', () => {
    it('should initialize with assistant role', () => {
        const prompt = new prompt_class_1.AssistantPrompt('Assistant message');
        expect(prompt.role).toBe('assistant');
    });
});

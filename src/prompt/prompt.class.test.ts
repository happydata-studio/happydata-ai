import { Prompt, SystemPrompt, UserPrompt, AssistantPrompt } from './prompt.class';

describe('Prompt', () => {
  it('should initialize with string content', () => {
    const prompt = new Prompt('Hello, world!', 'user');
    expect(prompt.content).toBe('Hello, world!');
    expect(prompt.role).toBe('user');
    expect(prompt.meta).toEqual({});
  });

  it('should initialize with array content', () => {
    const prompt = new Prompt(['Hello', 'world!'], 'user');
    expect(prompt.content).toBe('Hello\nworld!');
    expect(prompt.role).toBe('user');
    expect(prompt.meta).toEqual({});
  });

  it('should extract variables from content', () => {
    const prompt = new Prompt('Hello, {name}!', 'user');
    expect(prompt.getVariables()).toEqual(['name']);
  });

  it('should render content with variables', () => {
    const prompt = new Prompt('Hello, {name}!', 'user');
    const renderedPrompt = prompt.variables({ name: 'Alice' });
    expect(renderedPrompt.content).toBe('Hello, Alice!');
    expect(renderedPrompt.role).toBe('user');
    expect(renderedPrompt.meta).toEqual({});
  });
});

describe('SystemPrompt', () => {
  it('should initialize with system role', () => {
    const prompt = new SystemPrompt('System message');
    expect(prompt.role).toBe('system');
  });
});

describe('UserPrompt', () => {
  it('should initialize with user role', () => {
    const prompt = new UserPrompt('User message');
    expect(prompt.role).toBe('user');
  });
});

describe('AssistantPrompt', () => {
  it('should initialize with assistant role', () => {
    const prompt = new AssistantPrompt('Assistant message');
    expect(prompt.role).toBe('assistant');
  });
});

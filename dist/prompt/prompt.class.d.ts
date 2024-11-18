type TBaseMessageRole = "system" | "assistant" | "user";
export declare class Prompt {
    role: TBaseMessageRole;
    content: string;
    meta?: Record<string, any>;
    constructor(content: string | string[], role: TBaseMessageRole, meta?: Record<string, any>);
    getVariables(): string[];
    variables(variables: Record<string, string>): Prompt;
    render(variables: Record<string, string>): Prompt;
}
export declare class SystemPrompt extends Prompt {
    constructor(content: string | string[], meta?: Record<string, any>);
}
export declare class UserPrompt extends Prompt {
    constructor(content: string | string[], meta?: Record<string, any>);
}
export declare class AssistantPrompt extends Prompt {
    constructor(content: string | string[], meta?: Record<string, any>);
}
export {};
//# sourceMappingURL=prompt.class.d.ts.map
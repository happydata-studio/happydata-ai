interface ToolProps {
    name: string;
    description: string;
    props: string[];
    function: (props: any) => Promise<string>;
}
export declare class Tool {
    name: string;
    description: string;
    props: string[];
    function: (props: Record<string, any>) => Promise<string>;
    constructor(props: ToolProps);
    get asString(): string;
}
export {};
//# sourceMappingURL=tool.class.d.ts.map
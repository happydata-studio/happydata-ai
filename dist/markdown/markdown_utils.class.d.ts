export declare const htmlToMarkdown: (html: string) => void;
interface ICodeBlock {
    type: string;
    code: string;
}
export declare class MarkdownUtils {
    markdown: string;
    constructor(markdown: string);
    extractLinks(): Array<string>;
    get wordCount(): number;
    get headlines(): Array<string>;
    getCodeBlocks(type: string): Array<ICodeBlock>;
    get codeblocks(): Array<ICodeBlock>;
    get readingTime(): number;
    private extractCodeBlocks;
}
export {};
//# sourceMappingURL=markdown_utils.class.d.ts.map
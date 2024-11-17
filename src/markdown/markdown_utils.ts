export const htmlToMarkdown = (html: string) => {

}

interface ICodeBlock {
    type: string;
    code: string;
}


export class MarkdownUtils {
    markdown: string;
    constructor(markdown: string) {
        this.markdown = markdown;
    }

    public extractLinks(): Array<string> {
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const links: Array<string> = [];
        let match;
        while ((match = linkRegex.exec(this.markdown)) !== null) {
            links.push(match[2]);
        }
        return links;
    }

    get wordCount(): number {
        return this.markdown.split(" ").length;
    }

    get headlines(): Array<string> {
        const headlineRegex = /^(#{1,6})\s*(.*)$/gm;
        const headlines: Array<string> = [];
        let match;
        while ((match = headlineRegex.exec(this.markdown)) !== null) {
            headlines.push(match[2]);
        }
        return headlines;
    }

    public getCodeBlocks(type: string): Array<ICodeBlock> {
        return this.codeblocks.filter(block => block.type === type);
    }

    get codeblocks(): Array<ICodeBlock> {
        return this.extractCodeBlocks(this.markdown);
    }

    get readingTime(): number {
        return Math.ceil(this.wordCount / 250);
    }

    private extractCodeBlocks(markdown: string): Array<ICodeBlock> {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const codeBlocks: Array<ICodeBlock> = [];
        let match;
    
        while ((match = codeBlockRegex.exec(markdown)) !== null) {
            const [, type = '', code] = match;
            codeBlocks.push({ type, code });
        }
    
        return codeBlocks;
    }
}




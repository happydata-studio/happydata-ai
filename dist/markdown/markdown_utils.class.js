"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownUtils = exports.htmlToMarkdown = void 0;
const htmlToMarkdown = (html) => {
};
exports.htmlToMarkdown = htmlToMarkdown;
class MarkdownUtils {
    constructor(markdown) {
        this.markdown = markdown;
    }
    extractLinks() {
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const links = [];
        let match;
        while ((match = linkRegex.exec(this.markdown)) !== null) {
            links.push(match[2]);
        }
        return links;
    }
    get wordCount() {
        return this.markdown.split(" ").length;
    }
    get headlines() {
        const headlineRegex = /^(#{1,6})\s*(.*)$/gm;
        const headlines = [];
        let match;
        while ((match = headlineRegex.exec(this.markdown)) !== null) {
            headlines.push(match[2]);
        }
        return headlines;
    }
    getCodeBlocks(type) {
        return this.codeblocks.filter(block => block.type === type);
    }
    get codeblocks() {
        return this.extractCodeBlocks(this.markdown);
    }
    get readingTime() {
        return Math.ceil(this.wordCount / 250);
    }
    extractCodeBlocks(markdown) {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const codeBlocks = [];
        let match;
        while ((match = codeBlockRegex.exec(markdown)) !== null) {
            const [, type = '', code] = match;
            codeBlocks.push({ type, code });
        }
        return codeBlocks;
    }
}
exports.MarkdownUtils = MarkdownUtils;

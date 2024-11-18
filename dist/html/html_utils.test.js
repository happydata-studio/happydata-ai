"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_utils_class_1 = require("./html_utils.class");
const markdown_utils_class_1 = require("../markdown/markdown_utils.class");
const turndown_1 = __importDefault(require("turndown"));
jest.mock('turndown', () => {
    return jest.fn().mockImplementation(() => {
        return {
            turndown: jest.fn((html) => `markdown(${html})`)
        };
    });
});
jest.mock('../markdown/markdown_utils.class', () => {
    return {
        MarkdownUtils: jest.fn().mockImplementation((markdown) => {
            return { markdown };
        })
    };
});
describe('HtmlUtils', () => {
    let htmlUtils;
    const sampleHtml = `
        <html>
            <head>
                <style>body { font-size: 12px; }</style>
                <script>alert('Hello');</script>
            </head>
            <body>
                <h1>Title</h1>
                <p>Paragraph</p>
            </body>
        </html>
    `;
    beforeEach(() => {
        htmlUtils = new html_utils_class_1.HtmlUtils(sampleHtml);
    });
    test('compressed should remove script and style tags', () => {
        const compressedHtml = htmlUtils.compressed();
        expect(compressedHtml).not.toContain('<script>');
        expect(compressedHtml).not.toContain('<style>');
        expect(compressedHtml).toContain('<h1>Title</h1>');
        expect(compressedHtml).toContain('<p>Paragraph</p>');
    });
    test('markdown should convert compressed HTML to Markdown', () => {
        const compressedHtml = htmlUtils.compressed();
        const markdown = htmlUtils.markdown;
        expect(turndown_1.default).toHaveBeenCalled();
        expect(markdown).toBe(`markdown(${compressedHtml})`);
    });
    test('mdUtils should return an instance of MarkdownUtils', () => {
        const compressedHtml = htmlUtils.compressed();
        const mdUtils = htmlUtils.mdUtils;
        expect(markdown_utils_class_1.MarkdownUtils).toHaveBeenCalledWith(`markdown(${compressedHtml})`);
        expect(mdUtils).toEqual({ markdown: `markdown(${compressedHtml})` });
    });
});

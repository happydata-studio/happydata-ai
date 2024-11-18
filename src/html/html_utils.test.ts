import { HtmlUtils } from './html_utils.class';
import { MarkdownUtils } from '../markdown/markdown_utils.class';
import TurndownService from 'turndown';

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
    let htmlUtils: HtmlUtils;
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
        htmlUtils = new HtmlUtils(sampleHtml);
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
        expect(TurndownService).toHaveBeenCalled();
        expect(markdown).toBe(`markdown(${compressedHtml})`);
    });

    test('mdUtils should return an instance of MarkdownUtils', () => {
        const compressedHtml = htmlUtils.compressed();
        const mdUtils = htmlUtils.mdUtils;
        expect(MarkdownUtils).toHaveBeenCalledWith(`markdown(${compressedHtml})`);
        expect(mdUtils).toEqual({ markdown: `markdown(${compressedHtml})` });
    });
});

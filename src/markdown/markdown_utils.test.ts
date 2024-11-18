import { MarkdownUtils } from './markdown_utils.class';

describe('MarkdownUtils', () => {
    const markdownSample = `
# Title

This is a [link](http://example.com).

## Subtitle

Another [link](http://example.org).

\`\`\`javascript
console.log('Hello, world!');
\`\`\`

\`\`\`python
print('Hello, world!')
\`\`\`
`;

    let markdownUtils: MarkdownUtils;

    beforeEach(() => {
        markdownUtils = new MarkdownUtils(markdownSample);
    });

    test('should extract links correctly', () => {
        const links = markdownUtils.extractLinks();
        expect(links).toEqual(['http://example.com', 'http://example.org']);
    });

    test('should count words correctly', () => {
        const wordCount = markdownUtils.wordCount;
        expect(wordCount).toBe(9); // Adjust the count based on actual word count
    });

    test('should extract headlines correctly', () => {
        const headlines = markdownUtils.headlines;
        expect(headlines).toEqual(['Title', 'Subtitle']);
    });

    test('should extract code blocks correctly', () => {
        const codeBlocks = markdownUtils.codeblocks;
        expect(codeBlocks).toEqual([
            { type: 'javascript', code: "console.log('Hello, world!');\n" },
            { type: 'python', code: "print('Hello, world!')\n" }
        ]);
    });

    test('should filter code blocks by type', () => {
        const javascriptBlocks = markdownUtils.getCodeBlocks('javascript');
        expect(javascriptBlocks).toEqual([
            { type: 'javascript', code: "console.log('Hello, world!');\n" }
        ]);

        const pythonBlocks = markdownUtils.getCodeBlocks('python');
        expect(pythonBlocks).toEqual([
            { type: 'python', code: "print('Hello, world!')\n" }
        ]);
    });

    test('should calculate reading time correctly', () => {
        const readingTime = markdownUtils.readingTime;
        expect(readingTime).toBe(1); // Adjust the expected value based on actual word count
    });
});

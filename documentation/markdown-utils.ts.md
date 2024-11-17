# Markdown Utils

The `MarkdownUtils` class is a utility for processing and extracting information from Markdown content. It is part of the HappyData AI Utils library, designed to simplify the handling of Markdown data in your applications.

## Features

- **Link Extraction**: Extracts all hyperlinks from the Markdown content.
- **Word Count**: Calculates the total number of words in the Markdown content.
- **Headline Extraction**: Retrieves all headlines (H1 to H6) from the Markdown content.
- **Code Block Extraction**: Extracts code blocks, optionally filtered by language type.
- **Reading Time Calculation**: Estimates the reading time based on the word count.

## Usage

### Importing

To use the `MarkdownUtils` class, import it into your project:

```typescript
import { MarkdownUtils } from 'path/to/markdown_utils';
```

### Initialization

Create an instance of `MarkdownUtils` by passing a Markdown string to the constructor:

```typescript
const markdownContent = `
# Sample Title
This is a sample markdown content with a [link](https://example.com).
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`;

const markdownUtils = new MarkdownUtils(markdownContent);
```

### Extracting Links

To extract all links from the markdown content:

```typescript
const links = markdownUtils.extractLinks();
console.log(links); // Output: ['https://example.com']
```

### Counting Words

To get the word count of the markdown content:

```typescript
const wordCount = markdownUtils.wordCount;
console.log(wordCount); // Output: 8
```

### Extracting Headlines

To retrieve all headlines from the markdown content:

```typescript
const headlines = markdownUtils.headlines;
console.log(headlines); // Output: ['Sample Title']
```

### Extracting Code Blocks

To extract all code blocks, optionally filtered by language type:

```typescript
const codeBlocks = markdownUtils.getCodeBlocks('javascript');
console.log(codeBlocks); // Output: [{ type: 'javascript', code: "console.log('Hello, world!');" }]
```

### Calculating Reading Time

To estimate the reading time based on the word count:

```typescript
const readingTime = markdownUtils.readingTime;
console.log(readingTime); // Output: 1 (assuming 250 words per minute)
```

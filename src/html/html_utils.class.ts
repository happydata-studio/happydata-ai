import TurndownService from "turndown";
import { MarkdownUtils } from "../markdown/markdown_utils.class";

export class HtmlUtils {
    private html: string;
    constructor(html: string) {
        this.html = html;
    }
    compressed() {
        // remove all script and css tags
        let compressed = this.html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        compressed = compressed.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        return compressed;
    }
    get markdown() {
        const html = this.compressed()
        var turndownService = new TurndownService()
        return turndownService.turndown(html);
    }

    get mdUtils() {
        return new MarkdownUtils(this.markdown);
    }
}

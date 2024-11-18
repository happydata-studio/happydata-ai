"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlUtils = void 0;
const turndown_1 = __importDefault(require("turndown"));
const markdown_utils_class_1 = require("../markdown/markdown_utils.class");
class HtmlUtils {
    constructor(html) {
        this.html = html;
    }
    compressed() {
        // remove all script and css tags
        let compressed = this.html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        compressed = compressed.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        return compressed;
    }
    get markdown() {
        const html = this.compressed();
        var turndownService = new turndown_1.default();
        return turndownService.turndown(html);
    }
    get mdUtils() {
        return new markdown_utils_class_1.MarkdownUtils(this.markdown);
    }
}
exports.HtmlUtils = HtmlUtils;

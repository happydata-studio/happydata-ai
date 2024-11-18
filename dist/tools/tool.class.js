"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
class Tool {
    constructor(props) {
        this.name = props.name;
        this.description = props.description;
        this.props = props.props;
        this.function = props.function;
    }
    get asString() {
        return `${this.name}: ${this.description} - props ${this.props.join(', ')}`;
    }
}
exports.Tool = Tool;

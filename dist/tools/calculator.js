"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const tool_class_1 = require("./tool.class");
exports.calculator = new tool_class_1.Tool({
    name: "calculator",
    description: "Calculate the result of an expression - pass in the expression as a javascript expression",
    props: ["expression"],
    function: async (props) => {
        return eval(props.expression);
    }
});

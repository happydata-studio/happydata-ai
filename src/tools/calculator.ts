import { Tool } from "./tool.class";

interface CalculatorProps {
    expression: string;
}

export const calculator = new Tool({
    name: "calculator",
    description: "Calculate the result of an expression - pass in the expression as a javascript expression",
    props: ["expression"],
    function: async (props: CalculatorProps) => {
        return eval(props.expression);
    }
});
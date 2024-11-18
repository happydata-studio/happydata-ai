interface ToolProps {
    name: string;
    description: string;
    props: string[];
    function: (props: any) => Promise<string>;
}

export class Tool {
    name: string;
    description: string;
    props: string[];
    function: (props: Record<string, any>) => Promise<string>;  
    constructor(props: ToolProps) {
        this.name = props.name;
        this.description = props.description;
        this.props = props.props;
        this.function = props.function;
    }

    get asString() {
        return `${this.name}: ${this.description} - props ${this.props.join(', ')}`;
    }
}
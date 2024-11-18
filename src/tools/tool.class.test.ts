import { Tool } from './tool.class';

describe('Tool Class', () => {
    const mockFunction = jest.fn().mockResolvedValue('mock result');

    const toolProps = {
        name: 'Test Tool',
        description: 'A tool for testing',
        props: ['prop1', 'prop2'],
        function: mockFunction
    };

    let tool: Tool;

    beforeEach(() => {
        tool = new Tool(toolProps);
    });

    test('should initialize with correct properties', () => {
        expect(tool.name).toBe(toolProps.name);
        expect(tool.description).toBe(toolProps.description);
        expect(tool.props).toEqual(toolProps.props);
        expect(tool.function).toBe(toolProps.function);
    });

    test('should return correct string from string getter', () => {
        const expectedString = 'Test Tool: A tool for testing - props prop1, prop2';
        expect(tool.asString).toBe(expectedString);
    });

    test('should call the function with correct props and return expected result', async () => {
        const result = await tool.function({ prop1: 'value1', prop2: 'value2' });
        expect(mockFunction).toHaveBeenCalledWith({ prop1: 'value1', prop2: 'value2' });
        expect(result).toBe('mock result');
    }, 10000);

    test('Should support JSON output', async () => {
        // Your test code here
    }, 10000);
});

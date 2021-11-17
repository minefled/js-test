import { Test } from ".";
export declare class Interface {
    test: Test;
    lineCount: number;
    constructor(test: Test);
    generate(): string;
    update(): void;
    private generate_unit_lines;
    private generate_unit_line;
    private get_status_character;
}

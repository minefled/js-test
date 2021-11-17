import { Interface } from "./interface.js";
import { TestConfig } from "./TestConfig";
import { Unit } from "./Unit.js";
export declare class Test {
    name: string;
    config: TestConfig;
    units: Unit[];
    interface: Interface;
    units_failed: number;
    units_succeeded: number;
    constructor(name: string, config: TestConfig);
    unit(name: string, verification_callback: Function): Unit;
    execute(): Promise<void>;
    private _updateInterface;
    get max_unit_name_length(): number;
}

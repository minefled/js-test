import { UnitStatus } from "./UnitStatus";
export declare class Unit {
    name: string;
    verification_callback: Function;
    status: UnitStatus;
    execution_time: number;
    constructor(name: string, verification_callback: Function);
    execute(): Promise<boolean>;
}

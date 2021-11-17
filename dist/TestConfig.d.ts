export interface UnitInterface {
    name: string;
    validation: Function;
}
export interface TestConfig {
    units: UnitInterface[];
}

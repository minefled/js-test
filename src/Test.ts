import { Interface } from "./interface.js";
import { TestConfig } from "./TestConfig";
import { Unit } from "./Unit.js";

export class Test {

    public units:Unit[];
    public interface:Interface;

    public units_failed = 0;
    public units_succeeded = 0;

    constructor(
        public name:string,
        public config:TestConfig
    ) { 
        this.units = this.config.units.map(x => { return new Unit(x.name, x.validation); });

        this.interface = new Interface(this);

        if(process.stdout.rows < this.interface.lineCount) console.log("\x1b[1m\x1b[33mIf you cant see all of your tests, try increasing the height of your terminal window!\x1b[0m");
        this.interface.update();
    }

    unit(name:string, verification_callback:Function) {
        return new Unit(name, verification_callback);
    }

    async execute() {
        for(var unit of this.units) {
            unit.status = "executing";
            this._updateInterface();

            let success = await unit.execute();
            if(success) this.units_succeeded += 1;
            else        this.units_failed += 1;

            this._updateInterface();
        }

        // Log Test Result
        let total_execution_time = this.units.map(x => x.execution_time).reduce((acc, curr) => acc + curr);

        console.log("\x1b[1mResult:\x1b[0m");
        console.log(`   \x1b[32mSucceeded\x1b[0m: ${this.units_succeeded} | \x1b[31mFailed\x1b[0m: ${this.units_failed}`);
        console.log(`   \x1b[34mTotal Test Time\x1b[0m: ${total_execution_time}ms`);
        console.log();
    }

    private _updateInterface() {
        this.interface.update();
    }

    get max_unit_name_length():number {
        return Math.min( ...this.units.map(x => x.name.length) );
    }

}
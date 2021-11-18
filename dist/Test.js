var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Interface } from "./interface.js";
import { Unit } from "./Unit.js";
export class Test {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        this.units_failed = 0;
        this.units_succeeded = 0;
        this.units = this.config.units.map(x => { return new Unit(x.name, x.validation); });
        this.interface = new Interface(this);
        if (process.stdout.rows < this.interface.lineCount)
            console.log("\x1b[1m\x1b[33mIf you cant see all of your tests, try increasing the height of your terminal window!\x1b[0m");
        this.interface.update();
    }
    unit(name, verification_callback) {
        return new Unit(name, verification_callback);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var unit of this.units) {
                unit.status = "executing";
                this._updateInterface();
                let success = yield unit.execute();
                if (success)
                    this.units_succeeded += 1;
                else
                    this.units_failed += 1;
                this._updateInterface();
            }
            // Log Test Result
            let total_execution_time = this.units.map(x => x.execution_time).reduce((acc, curr) => acc + curr);
            console.log("\x1b[1mResult:\x1b[0m");
            console.log(`   \x1b[32mSucceeded\x1b[0m: ${this.units_succeeded} | \x1b[31mFailed\x1b[0m: ${this.units_failed}`);
            console.log(`   \x1b[34mTotal Test Time\x1b[0m: ${total_execution_time}ms`);
            console.log();
        });
    }
    _updateInterface() {
        this.interface.update();
    }
    get max_unit_name_length() {
        return Math.max(...this.units.map(x => x.name.length));
    }
}

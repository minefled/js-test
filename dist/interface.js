import logUpdate from "log-update";
export class Interface {
    constructor(test) {
        this.test = test;
        this.lineCount = 0;
        this.lineCount = 1 + test.units.length + 3; // Title + 1 Line per unit + 3 Lines of whitespace
    }
    generate() {
        let completion_percent = ((this.test.units_failed + this.test.units_succeeded) / this.test.units.length) * 100;
        return [
            ``,
            `\x1b[1m${this.test.name}\x1b[0m (${completion_percent.toFixed(2)}%)`,
            ``,
            ...this.generate_unit_lines(),
            ``
        ].join("\n");
    }
    update() {
        logUpdate(this.generate());
    }
    generate_unit_lines() {
        return this.test.units.map(x => { return this.generate_unit_line(x); });
    }
    generate_unit_line(unit) {
        let status_character = this.get_status_character(unit.status);
        let namePaddingLength = this.test.max_unit_name_length + 5;
        return `    ${status_character} ${unit.name.padEnd(namePaddingLength)}\x1b[30m${(unit.execution_time > 0) ? `( ${unit.execution_time.toString().padEnd(5)}ms )` : ""}\x1b[0m`;
    }
    get_status_character(status) {
        switch (status) {
            case "pending":
                return "\x1b[1m[ - ]\x1b[0m";
            case "executing":
                return "\x1b[1m\x1b[35m[ # ]\x1b[0m";
            case "successful":
                return "\x1b[1m\x1b[32m[ ✔ ]\x1b[0m";
            case "failed":
                return "\x1b[1m\x1b[31m[ x ]\x1b[0m";
        }
    }
}

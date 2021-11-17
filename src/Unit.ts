import { UnitStatus } from "./UnitStatus";

export class Unit {

    public status:UnitStatus = "pending";

    public execution_time = 0;

    constructor(
        public name:string,
        public verification_callback:Function
    ) { }

    async execute():Promise<boolean> {
        let start = new Date();
        this.status = "executing";

        this.status = ((await this.verification_callback()) === true ? "successful" : "failed");

        this.execution_time = (new Date().getTime() - start.getTime());
        return this.status === "successful";
    }

}
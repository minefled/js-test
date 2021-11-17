var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Unit {
    constructor(name, verification_callback) {
        this.name = name;
        this.verification_callback = verification_callback;
        this.status = "pending";
        this.execution_time = 0;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let start = new Date();
            this.status = "executing";
            this.status = ((yield this.verification_callback()) === true ? "successful" : "failed");
            this.execution_time = (new Date().getTime() - start.getTime());
            return this.status === "successful";
        });
    }
}

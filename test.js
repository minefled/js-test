//module.exports = require("./dist/Test.js");

//const { Test } = require("./dist/Test.js");
import { Test } from "./dist/index.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await new Test("Testing", {
    units: "-".repeat(13).split("").map(x => {
        return {
            "name": "Test",
            "validation":  async () => { 
                await sleep(Math.random()*1200);
                return Math.random() > 0.2;
            }
        }
    })
}).execute();
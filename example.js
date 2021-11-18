import Test from "./index.js";

// This will only be used to simulate a test taking a bit of time, instead of completing instantly
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

new Test("Example", {
    units: [
        {
            "name": "Logging Hello World",
            "validation": async () => { 
                await sleep(512);
                return true;
            }
        },
        {
            "name": "Creating a variable 'a' with initial value 0",
            "validation": async () => { 
                await sleep(839);
                return true;
            }
        },
        {
            "name": "Creating a variable '!' with initial value 'Test'",
            "validation": async () => { 
                await sleep(420);
                return false;
            }
        },
        {
            "name": "Baking a cake",
            "validation": async () => { 
                await sleep(1316);
                return false;
            }
        }
    ]
}).execute();
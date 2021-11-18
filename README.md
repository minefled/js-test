# JS-Test

A Simple Node Testing Framework

## Example

![Example Screenshot](https://github.com/minefled/js-test/_assets/example_screenshot.png)

```javascript
import Test from "js-test";

new Test("Name of your test", {
    units: [
        {
            "name": "Name of the unit test",
            "validation": async () => { 
                return true;
            }
        }
    ]
}).execute();
```
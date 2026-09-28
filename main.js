const sketch = require("./sketch");
const d = require("./detector.js");

const WIDTH = 700;
const HEIGTH = 500;
const TITLE = "Particle Detector";

function loop() {
    while (sketch.running()) {
        sketch.update();
        sketch.draw();
    }
}

function main() {
    sketch.setup(WIDTH, HEIGTH, TITLE);
    loop();
    sketch.teardown();
}

main();

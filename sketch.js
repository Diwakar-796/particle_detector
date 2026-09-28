const r = require("raylib");
const d = require("./detector.js");
const f = require("./fields.js");
const d1 = require("./d1.js");
const d2 = require("./d2.js");
const d3 = require("./d3.js");

function setup(width, height, title) {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(60);

    d1.lower = 0;
    d1.upper = width / 2;

    d2.lower = width / 2;
    d2.upper = width;

    d3.lower = 0;
    d3.upper = height;
}

function getColorOnDetect(hasDetected) {
    return hasDetected ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
}

function drawVerticalRange(start, width, color) {
    r.DrawRectangle(start, 0, width, r.GetScreenHeight(), color);
}

function drawHorizontalRange(start, height, color) {
    r.DrawRectangle(0, start, r.GetScreenWidth(), height, color);
}

function update() {
    d1.start = d.calcNextPosition(d1.start, d1.velocity);
    d1.velocity = d.calcVelocity(
        d1.start,
        d1.lower,
        d1.upper,
        d1.width,
        d1.velocity,
    );

    d2.start = d.calcNextPosition(d2.start, d2.velocity);
    d2.velocity = d.calcVelocity(
        d2.start,
        d2.lower,
        d2.upper,
        d2.width,
        d2.velocity,
    );

    d3.start = d.calcNextPosition(d3.start, d3.velocity);
    d3.velocity = d.calcVelocity(
        d3.start,
        d3.lower,
        d3.upper,
        d3.height,
        d3.velocity,
    );
}

function drawFields() {
    drawVerticalRange(f.field1Start, f.field1Width, r.SKYBLUE);
    drawVerticalRange(f.field2Start, f.field2Width, r.SKYBLUE);

    drawHorizontalRange(f.field3Start, f.field3Height, r.SKYBLUE);
}

function draw() {
    const color1 = getColorOnDetect(
        d.isDetected(d1.start, d1.width, f.field1Start, f.field1Width) ||
            d.isDetected(d1.start, d1.width, f.field2Start, f.field2Width),
    );

    const color2 = getColorOnDetect(
        d.isDetected(d2.start, d2.width, f.field1Start, f.field1Width) ||
            d.isDetected(d2.start, d2.width, f.field2Start, f.field2Width),
    );

    const color3 = getColorOnDetect(
        d.isDetected(d3.start, d3.height, f.field3Start, f.field3Height),
    );

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawFields();

    drawVerticalRange(d1.start, d1.width, color1);
    drawVerticalRange(d2.start, d2.width, color2);

    drawHorizontalRange(d3.start, d3.height, color3);

    r.EndDrawing();
}

function running() {
    return !r.WindowShouldClose();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};

const r = require("raylib");

const windowWidth = 700;
const windowHeight = 400;
const FPS = 60;

const speed = 3;

let scannerX = 0;
let scannerY = 0;
const scannerRange = 20;
const scannerWidth = scannerRange;
const scannerHeight = windowHeight;

let isReached = false;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function getStatus() {
    if ((scannerX + scannerWidth) >= windowWidth) {
        return true;
    }

    if (scannerX <= 1) {
        return false;
    }

    return isReached;
}

function isOverlap(partStart, partRange) {
    const scannerStart = scannerX;
    const scannerEnd = scannerStart + scannerRange;
    const partEnd = partStart + partRange;

    return (partEnd >= scannerStart) && (partStart <= scannerEnd);
}

function getColorOnOverlap(part1Detect, part2Detect) {
    return (part1Detect || part2Detect) ? r.RED : r.WHITE;
}

function update() {
    isReached = getStatus();
    scannerX += isReached ? -speed : speed;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const particle1Range = 50;
    const particle1Start = 100;

    const particle1X = particle1Start;
    const particle1Y = 0;
    const particle1Width = particle1Range;
    const particle1Height = windowHeight;

    const particle2Range = 10;
    const particle2Start = 200;

    const particle2X = particle2Start;
    const particle2Y = 0;
    const particle2Width = particle2Range;
    const particle2Height = windowHeight;

    const particle1Detect = isOverlap(particle1Start, particle1Range);
    const particle2Detect = isOverlap(particle2Start, particle2Range);

    const color = getColorOnOverlap(particle1Detect, particle2Detect);

    r.DrawRectangle(particle1X, particle1Y, particle1Width, particle1Height, r.BLUE);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.BLUE);

    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, color);

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
const r = require("raylib");

const WIDTH = 700;
const HEIGTH = 500;
const FPS = 60;

const Y = 0;

const speed = 3;

let scanner1X = 0;
const scanner1Range = 20;
const scanner1Width = scanner1Range;

let isReached = false;

function setup() {
    r.InitWindow(WIDTH, HEIGTH, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function getStatus() {
    if ((scanner1X + scanner1Width) >= WIDTH) {
        return true;
    }

    if (scanner1X <= 1) {
        return false;
    }

    return isReached;
}

function isOverlap(scnX, scnRange, partStart, partRange) {
    const scannerStart = scnX;
    const scannerEnd = scannerStart + scnRange;
    const partEnd = partStart + partRange;

    return (partEnd >= scannerStart) && (partStart <= scannerEnd);
}

function getColorOnOverlap(part1Detect, part2Detect) {
    return (part1Detect || part2Detect) ? r.RED : r.WHITE;
}

function update() {
    isReached = getStatus();
    scanner1X += isReached ? -speed : speed;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const particle1Range = 50;
    const particle1Start = 100;

    const particle1X = particle1Start;
    const particle1Width = particle1Range;

    const particle2Range = 10;
    const particle2Start = 200;

    const particle2X = particle2Start;
    const particle2Width = particle2Range;

    const particle1Detect = isOverlap(scanner1X, scanner1Range, particle1Start, particle1Range);
    const particle2Detect = isOverlap(scanner1X, scanner1Range, particle2Start, particle2Range);

    const color = getColorOnOverlap(particle1Detect, particle2Detect);

    r.DrawRectangle(particle1X, Y, particle1Width, HEIGTH, r.BLUE);
    r.DrawRectangle(particle2X, Y, particle2Width, HEIGTH, r.BLUE);

    r.DrawRectangle(scanner1X, Y, scanner1Width, HEIGTH, color);

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
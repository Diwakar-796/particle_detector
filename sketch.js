const r = require("raylib");

const WIDTH = 700;
const HEIGTH = 500;
const FPS = 60;

const X = 0;
const Y = 0;

let speed1 = 3;
let scanner1X = 0;
const scanner1Width = 50;

let speed2 = 1;
let scanner2X = WIDTH / 2;
const scanner2Width = 20;

let speed3 = 1;
let scanner3Y = 0;
const scanner3Height = 30;

function setup() {
    r.InitWindow(WIDTH, HEIGTH, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function getSpeed(x, start, end, width, speed) {
    return (((x + width) >= end) || (x <= start)) ? -speed : speed;
}

function isOverlap(scannerStart, scannerWidth, particleStart, particleWidth) {
    const scannerEnd = scannerStart + scannerWidth;
    const particleEnd = particleStart + particleWidth;

    return (particleEnd >= scannerStart) && (particleStart <= scannerEnd);
}

function getColorOnOverlap(isOvrlp1, isOvrlp2) {
    return (isOvrlp1 || isOvrlp2) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
}

function update() {
    scanner1X += speed1;
    speed1 = getSpeed(scanner1X, 0, WIDTH / 2, scanner1Width, speed1);

    scanner2X += speed2;
    speed2 = getSpeed(scanner2X, WIDTH / 2, WIDTH, scanner2Width, speed2);

    scanner3Y += speed3;
    speed3 = getSpeed(scanner3Y, 0, HEIGTH, scanner3Height, speed3);
}

function draw() {
    const particle1Range = 50;
    const particle1Start = 100;

    const particle1X = particle1Start;
    const particle1Width = particle1Range;

    const particle2Range = 10;
    const particle2Start = 400;

    const particle2X = particle2Start;
    const particle2Width = particle2Range;

    const particle3Range = 25;
    const particle3Start = 300;

    const particle3X = particle3Start;
    const particle3Height = particle3Range;

    const color1 = getColorOnOverlap(isOverlap(scanner1X, scanner1Width, particle1Start, particle1Range), isOverlap(scanner1X, scanner1Width, particle2Start, particle2Range));

    const color2 = getColorOnOverlap(isOverlap(scanner2X, scanner2Width, particle1Start, particle1Range), isOverlap(scanner2X, scanner2Width, particle2Start, particle2Range));

    const color3 = getColorOnOverlap(isOverlap(scanner3Y, scanner3Height, particle3Start, particle3Range));

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle1X, Y, particle1Width, HEIGTH, r.SKYBLUE);
    r.DrawRectangle(particle2X, Y, particle2Width, HEIGTH, r.SKYBLUE);
    r.DrawRectangle(X, particle3X, WIDTH, particle3Height, r.SKYBLUE);

    r.DrawRectangle(scanner1X, Y, scanner1Width, HEIGTH, color1);
    r.DrawRectangle(scanner2X, Y, scanner2Width, HEIGTH, color2);
    r.DrawRectangle(X, scanner3Y, WIDTH, scanner3Height, color3);

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
const r = require("raylib");

const windowWidth = 500;
const windowHeight = 400;
const FPS = 60;

let x = 0;
let y = 0;
const speed = 1;

let isReached = false;

const scnWidth = 20;
const scnHeight = windowHeight;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function getStatus() {
    if ((x + scnWidth) >= windowWidth) {
        return true;
    }

    if (x <= 1) {
        return false;
    }

    return isReached;
}

function update() {
    isReached = getStatus();
    x = isReached ? x - speed : x + speed;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    particleX = 100;
    particleY = 0;
    particleWidth = 50;
    particleHeight = windowHeight;

    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.BLUE);

    r.DrawRectangle(x, y, scnWidth, scnHeight, r.WHITE);

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
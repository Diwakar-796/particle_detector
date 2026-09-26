const r = require("raylib");

const windowWidth = 700;
const windowHeight = 400;
const FPS = 60;

const speed = 3;

let scnX = 0;
let scnY = 0;
const scnRange = 20;
const scnWidth = scnRange;
const scnHeight = windowHeight;

let isReached = false;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function getStatus() {
    if ((scnX + scnWidth) >= windowWidth) {
        return true;
    }

    if (scnX <= 1) {
        return false;
    }

    return isReached;
}

function overlapDetector(scnStart, scnRange, partStart, partRange) {
    const scnEnd = scnStart + scnRange;
    const partEnd = partStart + partRange;

    if ((partEnd >= scnStart) && (partStart <= scnEnd)) {
        return r.RED;
    }
    return r.WHITE;
}

function update() {
    isReached = getStatus();
    scnX = isReached ? scnX - speed : scnX + speed;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const particleRange = 50;
    const particleStart = 100;

    const particleX = particleStart;
    const particleY = 0;
    const particleWidth = particleRange;
    const particleHeight = windowHeight;

    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.BLUE);

    const color = overlapDetector(scnX, scnRange, particleStart, particleRange);

    r.DrawRectangle(scnX, scnY, scnWidth, scnHeight, color);

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
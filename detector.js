function calcNextPosition(start, velocity) {
    return start + velocity;
}

function calcVelocity(x, start, end, width, velocity) {
    return isDetectorOutOfBounds(x, width, end, start) ? -velocity : velocity;
}

function isDetectorOutOfBounds(x, width, end, start) {
    return x + width >= end || x <= start;
}

function isInBetween(start1, end1, start2, end2) {
    return end2 > start1 && start2 < end1;
}

function isDetected(start1, width1, start2, width2) {
    const end1 = start1 + width1;
    const end2 = start2 + width2;

    return isInBetween(start1, end1, start2, end2);
}

function greet(location) {
    console.log("detector", location);
}

module.exports = {
    calcNextPosition,
    calcNextPosition,
    isDetected,
    isInBetween,
    isDetectorOutOfBounds,
    calcVelocity,
    greet,
};

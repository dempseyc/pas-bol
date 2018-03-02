// board consumed by game
// animations in board, players, and ball, all called by update with timesteps in game
// draw to control dom..  animation handled in game with update dom manipulation in board and players

var box = document.getElementById('box'),
    boxPos = 10,
    baseSpeed = 0.1,
    limit = 300,
    lastFrameTimeMs = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000 / 60;

function update(delta) {
    boxPos += baseSpeed * delta;
    // Switch directions if we go too far
    if (boxPos >= limit || boxPos <= 0) baseSpeed = -baseSpeed;
}

function draw() {
    box.style.left = boxPos + 'px';
}

function panic() {
    delta = 0;
}

function mainLoop(timestamp) {
    // Throttle the frame rate.    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    // create virtual time
    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            panic();
            break;
        }
    }
    draw();
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

////////////// end of game..

// requestAnimationFrame(mainLoop);

// var box = document.getElementById('box'),
//     boxPos = 10,
//     baseSpeed = 0.1,
//     limit = 300,
//     lastFrameTimeMs = 0,
//     maxFPS = 60,
//     delta = 0,
//     timestep = 1000 / 60;

// function update(delta) {
//     boxPos += baseSpeed * delta;
//     // Switch directions if we go too far
//     if (boxPos >= limit || boxPos <= 0) baseSpeed = -baseSpeed;
// }

// function draw() {
//     box.style.left = boxPos + 'px';
// }

// function panic() {
//     delta = 0;
// }

// function mainLoop(timestamp) {
//     // Throttle the frame rate.    
//     if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
//         requestAnimationFrame(mainLoop);
//         return;
//     }
//     delta += timestamp - lastFrameTimeMs;
//     lastFrameTimeMs = timestamp;

//     // create virtual time
//     var numUpdateSteps = 0;
//     while (delta >= timestep) {
//         update(timestep);
//         delta -= timestep;
//         if (++numUpdateSteps >= 240) {
//             panic();
//             break;
//         }
//     }
//     draw();
//     requestAnimationFrame(mainLoop);
// }

// requestAnimationFrame(mainLoop);
// board consumed by game
// animations in board, players, and ball, all called by update with timesteps in game
// draw to control dom..  animation handled in game with update dom manipulation in board and players

document.addEventListener('keydown', function(event) {

    switch(event.which) {
        case 37: // left arrow
        board.qbMove("left");
        break;

        case 38: // up arrow
        board.qbMove("up");
        break;

        case 39: // right arrow
        board.qbMove("right");
        break;

        case 40: // down arrow
        board.qbMove("down");
        break;

        case 88:
        case 191:
        NotDefinedYet("pass");
        break;

        default: return;
    }

    event.preventDefault(); // prevent the default action (scroll / move caret)

}); //document keydown listener

var lastFrameTimeMs = 0,
    maxFPS = 100,
    delta = 0,
    lastFrameTimeMs = 0,
    timestep = 1000 / 100;

function draw() {
    board.offsetCells();
}

function panic() {
    delta = 0;
    console.log("panic");
}

function mainLoop(timestamp) {
    // throttle the frame rate  
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }

    
    // create virtual time
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    var numUpdateSteps = 0;
    while (delta >= timestep) {
        board.update(timestep);
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
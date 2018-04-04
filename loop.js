// animations in board, players, and ball, all called by update with timesteps in game
// draw to control dom..  animation handled in game with update dom manipulation in board and players  
document.addEventListener('keydown', function(event) {

    switch(event.which) {
        case 37: // left arrow
        board.avtrMove("left");
        break;

        case 38: // up arrow
        board.avtrMove("up");
        break;

        case 39: // right arrow
        board.avtrMove("right");
        break;

        case 40: // down arrow
        board.avtrMove("down");
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

var running = false,
    started = false;
    
function stop() {
    running = false;
    started = false;
    cancelAnimationFrame(frameID);
}

function start() {
    if (!started) { // don't request multiple frames
        started = true;
        // Dummy frame to get our timestamps and initial drawing right.
        // Track the frame ID so we can cancel it if we stop quickly.
        frameID = requestAnimationFrame(function(timestamp) {
            board.draw(1); // initial board.draw
            running = true;
            // reset some time tracking variables
            lastFrameTimeMs = timestamp;
            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
            // actually start the main loop
            frameID = requestAnimationFrame(mainLoop);
        });
    }
}

function panic() {
    delta = 0;
    console.log("panic");
}

function mainLoop(timestamp) {
    // throttle the frame rate  
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        frameID = requestAnimationFrame(mainLoop);
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

    board.draw();

    frameID = requestAnimationFrame(mainLoop);
}

// this is probably where game phases live
// 

start();
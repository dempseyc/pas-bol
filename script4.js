// in this new model, targetchanges will be pushed to a list of motions
// the list of motions will call animation-based target changes

let cols = 9;
let rows = 22;
let motion = "still";
let motionStack = [motion]; // 0 being still initially
let rate = 0.1;
let pos = {x:4,y:10};
let targetPos = {x:4,y:10};
let animPos = {x:4,y:10};
// let cellOffset = {x:0,y:0};
let anim = false;

// make board tiles
let board = document.getElementById('board');


for (let j = 0; j<rows; j++) {
    for (let i = 0; i<cols+2; i++) {
        let classes = ["board-tile", `c-${i}`, `r-${j}`];
        let tile = document.createElement('div');
        tile.classList.add(...classes);
        board.appendChild(tile);
    }
}

let Offense1 = document.createElement('div');
Offense1.classList = "piece offense1";
board.appendChild(Offense1);

let tiles = board.querySelectorAll('.board-tile');


// END OF SETUP
///////////////////////////////////////////////////////////////////////////

function changeTarget(direction) {

    switch (direction) {
        case "up":
        targetPos.y = targetPos.y-1;
        break;
        case "down":
        targetPos.y = targetPos.y+1;
        break
        case "left":
        targetPos.x = targetPos.x-1;
        break;
        case "right":
        targetPos.x = targetPos.x+1;
        default:
        break;
    }

    if (anim === false) { startAnimate(); }
}

function startAnimate() {
    anim = true;
    goTowardTarget();
}

function checkProgress(x,y) {
    // x and y will start at 1 and decrease to 0
    return Math.abs(x+y);
}

function goTowardTarget () {
    // all anim should do is slowly change pos to target pos,
    //  then refer to motionStack
    let offsetX = (targetPos.x-pos.x)*rate;
    let offsetY = (targetPos.y-pos.y)*rate;
    
    let progress = checkProgress(targetPos.x-pos.x,targetPos.y-pos.y);

    if(progress>0.000001) {
        let delay = setTimeout(()=>{
            pos.x += offsetX;
            pos.y += offsetY;
            goTowardTarget();
            clearTimeout(delay);
        },0);
    } else {
        anim = false;
        pos.x = targetPos.x;
        pos.y = targetPos.y;
        console.log("in else", pos);
    }
}

// function changeCellOffset() {
//     let x = cellOffset.x;
//     let y = cellOffset.y;
//     if (x !== 0 && y !== 0){
//         if (x>9||x<-9) { x = 0; }
//         if (y>9||y<-9) { y = 0; }
//     }
//     console.log("in cco", x, y);
//     tiles.forEach((tile)=>{
//         tile.style.transform = `translateX(${(0.41*x)}rem) translateY(${(0.41*y)}rem)`;
//     })
// }

function addMotion (direction) {
    motionStack.push(direction);
    while (motionStack[motionStack.length-1] !== "still") {
        changeTarget(motionStack.pop());
    }
}

document.addEventListener('keydown', function(event) {

      switch(event.which) {
          case 37: // left arrow
            addMotion("left");
            break;

          case 38: // up arrow
            addMotion("up");
            break;

          case 39: // right arrow
            addMotion("right");
            break;

          case 40: // down arrow
            addMotion("down");
            break;

          case 88:
          case 191:
            addMotion("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown listener
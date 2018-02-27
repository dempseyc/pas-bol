let cols = 9;
let rows = 22;
let motion = "still";
let prevMotion = "still";
let rate = 0.1;
let xIarr = [0,1,2,3,4,5,6,7,8];
let yIarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
let pos = {x:xIarr[4],y:yIarr[10]};
let targetPos = {x:xIarr[4],y:yIarr[10]};
let prevTarget = {x:4,y:10};
let animPos = {x:4,y:10};
let cellOffset = {x:0,y:0};
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

function changeMotion(direction) {
    motion = direction;
}

function changeTarget() {
    
    if (prevMotion !== motion) {
        prevTarget.y = targetPos.y;
        prevTarget.x = targetPos.x;

        switch (motion) {
            case "up":
            targetPos.y = prevTarget.y-1;
            break;
            case "down":
            targetPos.y = prevTarget.y+1;
            break
            case "left":
            targetPos.x = prevTarget.x-1;
            break;
            case "right":
            targetPos.x = prevTarget.x+1;
            default:
            break;
        }
        prevMotion = motion;
    }
    if (anim === false) { startAnimate(); }
}

function startAnimate() {
    anim = true;
    animate();
}

function checkProgress(x,y) {
    // x and y will start at 1 and decrease to 0
    return Math.abs(x+y);
}

function animate () {
    // offset describes something strictly for animation
    let offsetX = (targetPos.x-prevTarget.x)*rate; // just a unit
    let offsetY = (targetPos.y-prevTarget.y)*rate; // just a unit

    let progress = checkProgress(targetPos.x-animPos.x,targetPos.y-animPos.y);
    // console.log("progress", progress);
    cellOffset.x += Math.round(offsetX*10);
    cellOffset.y += Math.round(offsetY*10);

    if(progress>0.000001) {
        let delay = setTimeout(()=>{
            animPos.x += offsetX;
            animPos.y += offsetY;
            changeCellOffset();
            animate();
            clearTimeout(delay);
        },50);
    } else {
        console.log("else in a");
        anim = false;
        cellOffset.x = 0;
        cellOffset.y = 0;
        pos.x = targetPos.x;
        pos.y = targetPos.y;
        prevTarget.x = targetPos.x;
        prevTarget.y = targetPos.y;
        prevMotion = "still";
        changeTarget();
    }
}

function changeCellOffset() {
    let x = cellOffset.x;
    let y = cellOffset.y;
    if (x !== 0 && y !== 0){
        if (x>9||x<-9) { x = 0; }
        if (y>9||y<-9) { y = 0; }
    }
    console.log("in cco", x, y);
    tiles.forEach((tile)=>{
        tile.style.transform = `translateX(${(0.41*x)}rem) translateY(${(0.41*y)}rem)`;
    })
}

document.addEventListener('keydown', function(event) {

      switch(event.which) {
          case 37: // left arrow
            changeMotion("right");
            changeTarget();
            break;

          case 38: // up arrow
            changeMotion("down");
            changeTarget();
            break;

          case 39: // right arrow
            changeMotion("left");
            changeTarget();
            break;

          case 40: // down arrow
            changeMotion("up");
            changeTarget();
            break;

          case 88:
          case 191:
            slideBoardCells("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown listener
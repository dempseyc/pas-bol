let cols = 9;
let rows = 22;
let motion = "left";
let prevMotion = "left";
let rate = 0.1;
let xIarr = [0,1,2,3,4,5,6,7,8];
let yIarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
let position = {x:xIarr[4],y:yIarr[10]};
let targetPosition = {x:xIarr[4],y:yIarr[10]};
let prevPosition = {x:4,y:10};
let animPosition = {x:4,y:10};
let cellOffset = {x:0,y:0};

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

// call changeTarget everytime changemotion is called and when animation finishes
function changeMotion(direction) {
    if (motion !== direction) {
        console.log(direction);
        prevMotion = motion;
        motion = direction;
        changeTarget();
    }
}

function changeTarget() {
    // this was to fix changing direction in the middle of an animation
    prevPosition.x = targetPosition.x;
    prevPosition.y = targetPosition.y;
    
    // need to fix incrementing when direction is not changed
    if (prevMotion !== motion) {
        switch (motion) {
            case "up":
                targetPosition.y = prevPosition.y-1;
                break;
            case "down":
                targetPosition.y = prevPosition.y+1;
                break
            case "left":
                targetPosition.x = prevPosition.x+1;
                break;
            case "right":
                targetPosition.x = prevPosition.x-1;
            default:
                break;
        }
        prevMotion = motion;
        animate ();
    } else {
        // might need else switch case
        console.log(targetPosition, "in ct");
        // animate();
    }
}

function animate () {
    let incomplete = Math.abs(targetPosition.x-animPosition.x + targetPosition.y-animPosition.y);
    let offsetX = (targetPosition.x-position.x)*rate; // is a percentage useably
    let offsetY = (targetPosition.y-position.y)*rate; // is a percentage uesably
    if(incomplete>0.00001) {
        cellOffset.x += Math.round(offsetX*10);
        cellOffset.y += Math.round(offsetY*10);
        animPosition.x = animPosition.x+offsetX;
        animPosition.y = animPosition.y+offsetY;
        // console.log(animPosition);
        let delay = setTimeout(()=>{
            changeCellOffset();
            animate();
            clearTimeout(delay);
        },10);
    } else {
        console.log("in else of a"); // allowing you to change direction mid move?
        cellOffset.x = 0;
        cellOffset.y = 0;
        // allow to continue motion // why does it speed up so much?
        prevPosition.x = targetPosition.x;
        prevPosition.y = targetPosition.y;
    }

}

function changeCellOffset() {
    let x = cellOffset.x;
    let y = cellOffset.y;
    if (x===10||x/10===-10) { x = 0; }
    if (y===10||y/10===-10) { y = 0; }
    console.log("in cco", x, y);
    tiles.forEach((tile)=>{
        tile.style.transform = `translateX(${(0.41*x)}rem) translateY(${(0.41*y)}rem)`;
    })
}

document.addEventListener('keydown', function(event) {

      switch(event.which) {
          case 37: // left arrow
            changeMotion("left");
            break;

          case 38: // up arrow
            changeMotion("down");
            break;

          case 39: // right arrow
            changeMotion("right");
            break;

          case 40: // down arrow
            changeMotion("up");
            break;

          case 88:
          case 191:
            slideBoardCells("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown listener
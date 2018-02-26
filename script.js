let cols = 9;
let rows = 22;
let motion = "left";
let rate = 0.1;
let xIarr = [0,1,2,3,4,5,6,7,8];
let yIarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
let position = {x:xIarr[4],y:yIarr[10]};
let targetPosition = {x:xIarr[4],y:yIarr[10]};
let animPosition = {x:4,y:10};
let cellOffset = {x:0,y:0};

function fixFloat(num) {
    return num.toFixed(1);
}

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

let tiles = board.querySelectorAll('.board-tile');

function changeDirection(direction) {
    motion = direction;
    changeTarget();
}

function changeTarget() {
    // this was to fix changing direction in the middle of an animation
    position.x = targetPosition.x;
    position.y = targetPosition.y;
    switch (motion) {
        case "up":
            targetPosition.y = position.y-1;
            break;
        case "down":
            targetPosition.y = position.y+1;
            break
        case "left":
            targetPosition.x = position.x+1;
            break;
        case "right":
            targetPosition.x = position.x-1;
        default:
            break;
    }
    animate();
}

function animate () {
    // window.requestAnimationFrame(()=>{
        let progress = Math.abs(targetPosition.x-animPosition.x + targetPosition.y-animPosition.y);
        let offsetX = (targetPosition.x-position.x)*rate;
        let offsetY = (targetPosition.y-position.y)*rate;
        if(progress>0.00001) {
            cellOffset.x += Math.round(offsetX*10);
            cellOffset.y += Math.round(offsetY*10);
            animPosition.x = animPosition.x+offsetX;
            animPosition.y = animPosition.y+offsetY;
            console.log(animPosition);
            let delay = setTimeout(()=>{
                moveCells();
                animate();
                clearTimeout(delay);
            },10);
        } else {
            cellOffset.x = 0;
            cellOffset.y = 0;
            position.x = targetPosition.x;
            position.y = targetPosition.y;
        }
    // });

}

function moveCells() {
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
            changeDirection("left");
            break;

          case 38: // up arrow
            changeDirection("down");
            break;

          case 39: // right arrow
            changeDirection("right");
            break;

          case 40: // down arrow
            changeDirection("up");
            break;

          case 88:
          case 191:
            slideBoardCells("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown listener
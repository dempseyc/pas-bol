let cols = 9;
let rows = 22;

// build a bunch of players from team0.roster and team1.roster

// for addMotion:   
let Offense0 = team0.roster[0];
let qbPos = team0.roster[0].pos;

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

//// might want to give pieces a zindex based on -yposition;
Offense0.DOMhandle = document.createElement('div');
Offense0.DOMhandle.classList = "piece offense1";
board.appendChild(Offense0.DOMhandle);

// all the cell animation stuff should be based on player team0,role0
// updates to centerplayer should pass into script2
// let other player pieces hang in the distance

// END OF SETUP
///////////////////////////////////////////////////////////////////////////
function doCellAnimation() {
    qbPos = team0.roster[0].pos;
    let delay = setTimeout(()=>{
        let cellOffset = {
            // should be left or right, pos or neg 10, but the 
            // qbPos fine pos is always positive
            x: Math.round((qbPos.x-Math.floor(qbPos.x))*10),
            y: Math.round((qbPos.y-Math.floor(qbPos.y))*10)
        }
        // console.log(cellOffset);
        changeCellOffset(cellOffset.x,cellOffset.y);
        clearTimeout(delay);
    },10);
}

function changeCellOffset(x,y) {
    // if (x !== 0 && y !== 0){
    //     if (x>9||x<-9) { x = 0; }
    //     if (y>9||y<-9) { y = 0; }
    // } else {
        tiles.forEach((tile)=>{
            tile.style.transform = `translateX(${(-0.41*x)}rem) translateY(${(-0.41*y)}rem)`;
        })
        doCellAnimation()
    // }
}

function off0Move(direction) {
    Offense0.addMotion(direction);
    doCellAnimation();
}

document.addEventListener('keydown', function(event) {

      switch(event.which) {
          case 37: // left arrow
            off0Move("left");
            break;

          case 38: // up arrow
            off0Move("up");
            break;

          case 39: // right arrow
            off0Move("right");
            break;

          case 40: // down arrow
            off0Move("down");
            break;

          case 88:
          case 191:
            slideBoardCells("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown listener
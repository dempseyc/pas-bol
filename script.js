let cols = 9;
let rows = 22;

// make board tiles
let board = document.getElementById('board');

for (let j = 0; j<rows; j++) {
    for (let i = 0; i<cols; i++) {
        let classes = ["board-tile", `c-${i}`, `r-${j}`];
        let tile = document.createElement('div');
        tile.classList.add(...classes);
        board.appendChild(tile);
    }
}

function slideBoardCells(direction) {
    switch(direction) {
        case "up":
            console.log("up");
            break;
        case "down":
            console.log("down");
            break;
        case "left":
            console.log("left");
            break;
        case "right":
            console.log("right");
            break;
        case "pass":
            console.log("pass");
            break;
    }
}

document.addEventListener('keydown', function(event) {
    
      switch(event.which) {
          case 37: // left arrow
            slideBoardCells("right");
            break;

          case 38: // up arrow
            slideBoardCells("up");
            break;

          case 39: // right arrow
            slideBoardCells("left");
            break;

          case 40: // down arrow
            slideBoardCells("down");
            break;

          case 88:
          case 191:
            slideBoardCells("pass");
            break;

          default: return;
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown function
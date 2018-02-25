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

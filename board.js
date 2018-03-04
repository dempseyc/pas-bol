var board = {

    ready: false,

    DOMhandle: document.getElementById('board'),
    ReadOut: document.getElementById('readout'),

    // maybe not necessary, but healthy
    // contains DOMhandlers for tiles
    // DOMtiles: [],

    // this just creates a reference
    qb: team0.roster[0],

    config: {
        cols: 9,
        rows: 22,
    },

    init: function(config) {
        for (let j = 0; j<config.rows; j++) {
            for (let i = 0; i<config.cols+2; i++) {
                let classes = ["board-tile", `c-${i}`, `r-${j}`];
                let tile = document.createElement('div');
                tile.classList.add(...classes);
                this.DOMhandle.appendChild(tile);
            }
        }

        this.DOMtiles = this.DOMhandle.querySelectorAll('.board-tile');

        // extracting dom handling from player class, maybe unwisely, but probably just for qb Player
        this.qb.DOMhandle = document.createElement('div');
        this.qb.DOMhandle.classList = "player offense0";
        this.DOMhandle.appendChild(this.qb.DOMhandle);

        this.ReadOut.innerHTML = "ready";

    },

    // game calls board update and qb move and offsetcells

    update: function(delta) {
        this.qb.nudge(delta);
    },

    qbMove: function (direction) {
        this.qb.addMotion(direction);
    },
    
    offsetCells: function() {

        // will be a positve or negative integer?
        let X = Math.round((this.qb.pos.x-Math.floor(this.qb.pos.x))*10);
        let Y = Math.round((this.qb.pos.y-Math.floor(this.qb.pos.y))*10);

        if (X<1) { X = 0; }
        if (Y<1) { Y = 0; }

        console.log(X,Y);

        this.DOMtiles.forEach((tile)=>{
            tile.style.transform = `translateX(${(-0.4*X)}rem) translateY(${(-0.4*Y)}rem)`;
            console.log("transform");
        });
    
    }
}

board.init(board.config);
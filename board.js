var board = {

    ready: false,

    DOMhandle: document.getElementById('board'),
    ReadOut: document.getElementById('readout'),

    // teamA if you are player1
    Avtr: teamA.roster[0],

    NPCs: [teamA.roster[1],teamA.roster[2],teamA.roster[3],teamA.roster[4]],

    OtherTeam: teamB.roster,

    config: {
        cols: 9,
        rows: 22,
    },

    init: function(config) {
        // build the tiles and tile container
        let tileContainer = document.createElement('div');
        tileContainer.classList.add('tile-container');
        for (let j = 0; j<config.rows; j++) {
            for (let i = 0; i<config.cols+2; i++) {
                let classes = ["board-tile", `c-${i}`, `r-${j}`];
                let tile = document.createElement('div');
                tile.classList.add(...classes);
                tileContainer.appendChild(tile);
            }
        }
        this.DOMhandle.appendChild(tileContainer);
        this.DOMtileContainer = this.DOMhandle.querySelectorAll('.tile-container')[0];

        // build the avatar DOMelement registered in board as this.Avtr
        this.Avtr.DOMhandle = document.createElement('div');
        this.Avtr.DOMhandle.classList = "player-container";
        this.Avtr.DOMhandle.style.left = `${(this.Avtr.pos.x*4)}rem`;
        this.Avtr.DOMhandle.style.top = `${(this.Avtr.pos.y*4)}rem`;
        this.Avtr.Dot = document.createElement('div');
        this.Avtr.Dot.classList = "player teamA0";
        this.Avtr.DOMhandle.appendChild(this.Avtr.Dot);
        this.DOMhandle.appendChild(this.Avtr.DOMhandle);

        // build the npc DOMelements for teamA
        // from 1 to 4
        for (i=1; i<5; i++) {
            console.log("building npcA");
            let npc = this.NPCs[i-1];
            npc.DOMhandle = document.createElement('div');
            npc.DOMhandle.classList = "player-container";
            npc.DOMhandle.style.left = `${(npc.pos.x*4)}rem`;
            npc.DOMhandle.style.top = `${(npc.pos.y*4)}rem`;
            npc.Dot = document.createElement('div');
            npc.Dot.classList = `player teamA${i}`;
            npc.DOMhandle.appendChild(npc.Dot);
            this.DOMhandle.appendChild(npc.DOMhandle);
        }

        // build the npc DOMelements for teamB
        for (i=0; i<5; i++) {
            console.log("building npcB");
            let npc = this.OtherTeam[i];
            npc.DOMhandle = document.createElement('div');
            npc.DOMhandle.classList = "player-container";
            npc.DOMhandle.style.left = `${(npc.pos.x*4)}rem`;
            npc.DOMhandle.style.top = `${(npc.pos.y*4)}rem`;
            npc.Dot = document.createElement('div');
            npc.Dot.classList = `player teamB${i}`;
            npc.DOMhandle.appendChild(npc.Dot);
            this.DOMhandle.appendChild(npc.DOMhandle);
        }

        this.ReadOut.innerHTML = "ready";

    },

    // game calls board update and Avtr move and offsetcells

    update: function(delta) {
        this.Avtr.nudge(delta);
    },

    avtrMove: function (direction) {
        this.Avtr.addMotion(direction);
    },
    
    offsetCells: function() {

        // will be a positve or negative integer?
        let X = Math.round((this.Avtr.pos.x-Math.floor(this.Avtr.pos.x))*10);
        let Y = Math.round((this.Avtr.pos.y-Math.floor(this.Avtr.pos.y))*10);

        if (X<1) { X = 0; }
        if (Y<1) { Y = 0; }

        // console.log(X,Y);

        this.DOMtileContainer.style.transform = `translateX(${(-0.4*X)}rem) translateY(${(-0.4*Y)}rem)`;
        // console.log("transform");
    
    }
}

board.init(board.config);
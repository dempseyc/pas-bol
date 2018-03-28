var board = {

    ready: false,

    DOMhandle: document.getElementById('board'),
    ReadOut: document.getElementById('readout'),

    // teamA if you are player1
    Avtr: teamA.roster[0],

    teamANPCs: [teamA.roster[1],teamA.roster[2],teamA.roster[3],teamA.roster[4]],

    teamBNPCs: teamB.roster,

    neededData: {},

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

        // build the DOMelement for avatar registered in board as this.Avtr
        this.Avtr.DOMhandle = document.createElement('div');
        this.Avtr.DOMhandle.classList = "player-containerAv";
        this.Avtr.DOMhandle.style.left = `${(this.Avtr.pos.x*4)}rem`;
        this.Avtr.DOMhandle.style.top = `${(this.Avtr.pos.y*4)}rem`;
        this.Avtr.Dot = document.createElement('div');
        this.Avtr.Dot.classList = "player A00";
        this.Avtr.DOMhandle.appendChild(this.Avtr.Dot);
        this.DOMhandle.appendChild(this.Avtr.DOMhandle);

        // build the npc DOMelements for teamA
        // from 1 to 4
        for (i=1; i<5; i++) {
            console.log("building npcA");
            let npc = this.teamANPCs[i-1];
            npc.DOMhandle = document.createElement('div');
            npc.DOMhandle.classList = "player-container";
            npc.DOMhandle.style.left = `${(npc.pos.x*4)}rem`;
            npc.DOMhandle.style.top = `${(npc.pos.y*4)}rem`;
            npc.Dot = document.createElement('div');
            npc.Dot.classList = `player A0${i}`;
            npc.DOMhandle.appendChild(npc.Dot);
            // dopplegangers
            npc.DopL = document.createElement('div');
            npc.DopR = document.createElement('div');
            npc.DopL.classList = `dop-left A0${i}`;
            npc.DopR.classList = `dop-right A0${i}`;
            npc.DOMhandle.appendChild(npc.DopL);
            npc.DOMhandle.appendChild(npc.DopR);
            this.DOMhandle.appendChild(npc.DOMhandle);            
        }

        // build the npc DOMelements for teamB
        for (i=0; i<5; i++) {
            console.log("building npcB");
            let npc = this.teamBNPCs[i];
            npc.DOMhandle = document.createElement('div');
            npc.DOMhandle.classList = "player-container";
            npc.DOMhandle.style.left = `${(npc.pos.x*4)}rem`;
            npc.DOMhandle.style.top = `${(npc.pos.y*4)}rem`;
            npc.Dot = document.createElement('div');
            npc.Dot.classList = `player B0${i}`;
            npc.DOMhandle.appendChild(npc.Dot);
            // dopplegangers
            npc.DopL = document.createElement('div');
            npc.DopR = document.createElement('div');
            npc.DopL.classList = `dop-left B0${i}`;
            npc.DopR.classList = `dop-right B0${i}`;
            npc.DOMhandle.appendChild(npc.DopL);
            npc.DOMhandle.appendChild(npc.DopR);
            this.DOMhandle.appendChild(npc.DOMhandle);
        }

        this.updateNeededData();

        this.ReadOut.innerHTML = "ready";

    },

    updateNeededData: function () {
        this.neededData.AvtrTrgt = this.Avtr.targetPos;
        this.neededData.BteamData = this.teamBNPCs.map((role) => {
            return {x: role.targetPos.x, y: role.targetPos.y};
        });
        this.neededData.AteamData = this.teamANPCs.map((role) => {
            return {x: role.targetPos.x, y: role.targetPos.y};
        });
    },

    update: function(delta) {
        this.doHitDetection();
        this.Avtr.nudge(delta);
        this.teamANPCs.forEach((Anpc) => {
            Anpc.nudge(delta);
        });
        this.teamBNPCs.forEach((Bnpc) => {
            Bnpc.nudge(delta);
        });
        // this.doHitDetection();
    },

    draw: function() {
        this.offsetCells();
        this.offsetPlayers();
    },
    
    avtrMove: function (direction) {
        this.Avtr.addMotion(direction);
        this.updateNeededData();
        this.NPCsMove();
        },
    
    NPCsMove: function () {
        this.teamANPCs.forEach((Anpc) => {
            Anpc.setVector(this.neededData);
            Anpc.applyVector();
        });
        this.teamBNPCs.forEach((Bnpc) => {
            Bnpc.setVector(this.neededData);
            Bnpc.applyVector();
        });
    },
    
    offsetCells: function() {
        
        let X = Math.round((this.Avtr.pos.x-Math.floor(this.Avtr.pos.x))*10);
        let Y = Math.round((this.Avtr.pos.y-Math.floor(this.Avtr.pos.y))*10);
        
        if (X<1) { X = 0; }
        if (Y<1) { Y = 0; }
        
        this.DOMtileContainer.style.transform = `translateX(${(-0.4*X)}rem) translateY(${(-0.4*Y)}rem)`;
    },
    
    offsetPlayers: function () {
        this.teamANPCs.forEach((npc) => {
            let relX = npc.pos.x - this.Avtr.pos.x + 4;
            let relY = npc.pos.y - this.Avtr.pos.y + 12;
            npc.DOMhandle.style.left = `${(relX*4)}rem`;
            npc.DOMhandle.style.top = `${(relY*4)}rem`;
        });
        this.teamBNPCs.forEach((npc) => {
            let relX = npc.pos.x - this.Avtr.pos.x + 4;
            let relY = npc.pos.y - this.Avtr.pos.y + 12;
            npc.DOMhandle.style.left = `${(relX*4)}rem`;
            npc.DOMhandle.style.top = `${(relY*4)}rem`;
        });
    },

    doHitDetection: function () {
        
        this.teamBNPCs.forEach((Bnpc) => {
            this.teamANPCs.forEach((Anpc) => {
                if (Math.abs(Anpc.pos.x - Bnpc.pos.x) < 0.66 && Math.abs(Anpc.pos.y - Bnpc.pos.y) < 0.66) {
                    Anpc.hitDetected();
                    Bnpc.hitDetected();
                }
            });
            // // for teamB teammates
            this.teamBNPCs.forEach((teammate) => {
                if (Math.abs(teammate.pos.x - Bnpc.pos.x) < 0.66 && Math.abs(teammate.pos.y - Bnpc.pos.y) < 0.66) {
                    teammate.hitDetected();
                    Bnpc.hitDetected();
                }
            });
            // //

            if (Math.abs(this.Avtr.pos.x - Bnpc.pos.x) < 0.66 && Math.abs(this.Avtr.pos.y - Bnpc.pos.y) < 0.66) {
                this.Avtr.hitDetected();
                Bnpc.hitDetected();
            }
        });

        // // for teamA teammates
        this.teamANPCs.forEach((Anpc) => {
            this.teamANPCs.forEach((teammate) => {
                if (Math.abs(teammate.pos.x - Anpc.pos.x) < 0.66 && Math.abs(teammate.pos.y - Anpc.pos.y) < 0.66) {
                    teammate.hitDetected();
                    Anpc.hitDetected();
                }
            });

            if (Math.abs(this.Avtr.pos.x - Anpc.pos.x) < 0.66 && Math.abs(this.Avtr.pos.y - Anpc.pos.y) < 0.66) {
                this.Avtr.hitDetected();
                Anpc.hitDetected();
            }
        });
        // //
        
    } // end do hit detection

}

board.init(board.config);
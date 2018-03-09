class NPC extends Player {

    constructor (team,role) {
        // team is 0 or 1, role is 0-4
        super(team,role);
        this.vector = {x: 0, y: 0};
    }

    // how solidified is this?
    compareX (Ax,Bx) {
        let rX = Bx - Ax ;

        if (Math.abs(rX) > 4) {
            let sign = rX / Math.abs(rX);
            let b = Bx + 9*sign;
            rX = b - Ax;
        }
        return rX;
    }

    applyVector () {
        // console.log("av called");

        let motions = [];

        if ( Math.abs(this.vector.x) > 0 || Math.abs(this.vector.y) > 0 ) {
            if (this.vector.y > 0) {
                motions.push("down");
            } else if (this.vector.y < 0) {
                motions.push("up");
            }
            if (this.vector.x > 0) {
                motions.push("right");
            } else if (this.vector.x <0){
                motions.push("left");
            }
        }

        if (motions.length > 1) {
            this.addMotion(motions.shift());
        }

    }

    setVector (teamANeededData) {
        // console.log("sv called");
        // teamANeededData.AvtrTrgt // obj
        // teamANeededData.BteamData // array of objs

        switch (this.team) {
            case 0:
                switch (this.role) {
                    case 0:
                        break;
                    case 1:
                        this.off1Priorities(teamANeededData);
                        break;
                    case 2:
                        this.off2Priorities(teamANeededData);
                        break;
                    case 3:
                        this.off3Priorities(teamANeededData);
                        break;
                    case 4:
                        this.off4Priorities(teamANeededData);
                        break;
                    default:
                        break;
                }
            case 1:
                switch (this.role) {
                    case 0:
                        this.def0Priorities(teamANeededData);
                        break;
                    case 1:
                        this.def1Priorities(teamANeededData);
                        break;
                    case 2:
                        this.def2Priorities(teamANeededData);
                        break;
                    case 3:
                        this.def3Priorities(teamANeededData);
                        break;
                    case 4:
                        this.def4Priorities(teamANeededData);
                        break;
                    default:
                        break;
            }
            default:
            break;
        }
    } // end setVector

    // each of these should only do setVector
    //////////////////////////////////////////////////
    off1Priorities (data) {
        // get relpos of avtr
        let rax = this.compareX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y ;

        let rdx = 4;
        let rdy = 9;
        // get relpos of each defender
        // if defender is closer, update rdx and rdy
        data.BteamData.forEach((Npos) => {
            let rx = this.compareX(Npos.x,this.targetPos.x);
            if (Math.abs(rx) < Math.abs(rdx)) {
                rdx = rx;
            }
            // but not sure
            if (Math.abs(Npos.y - this.targetPos.y) < Math.abs(rdy)) {
                rdy = Npos.y - this.targetPos.y ;
            }
        });

        // average them, round them, get vector

        this.vector.x = Math.round((rax+rdx) / 2) ;
        this.vector.y = Math.round((ray+rdy) / 2) ;

        console.log("off1P", this.vector.x, this.vector.y);

    } // set vector

    off2Priorities () {
        // console.log("off2P");
    }

    off3Priorities () {
        // console.log("off3P");
    }

    off4Priorities () {
        // console.log("off4P");
    }

    ///////////////////////////////////////////////////////////////////////////////////


    def0Priorities () {
        // console.log("def0P");
    }

    def1Priorities () {
        // console.log("def0P");
    }

    def2Priorities () {
        // console.log("def0P");
    }

    def3Priorities () {
        // console.log("def0P");
    }

    def4Priorities () {
        // console.log("def0P");
    }

}  // end NPC
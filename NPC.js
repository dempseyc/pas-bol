class NPC extends PlayerA {

    constructor (team,role) {
        // team is 0 or 1, role is 0-4
        super(team,role);
        this.vector = {x: 0, y: 0};
        this.motions = [];
    }

    //
    //
    // fixed something in this.motions
    applyVector () {
        // console.log("av called");
        let v = Math.abs(this.vector.x) + Math.abs(this.vector.y);
        while (v>0) {
            if ( Math.abs(this.vector.x) > 0 || Math.abs(this.vector.y) > 0 ) {
                if (this.vector.y > 0) {
                    this.motions.push("down");
                    this.vector.y--;
                    v--;
                } else if (this.vector.y < 0) {
                    this.motions.push("up");
                    this.vector.y++;
                    v--;
                }
                if (this.vector.x > 0) {
                    this.motions.push("right");
                    this.vector.x--;
                    v--;
                } else if (this.vector.x < 0){
                    this.motions.push("left");
                    this.vector.x++;
                    v--;
                }
                
            }
        }

        let m = this.motions.length;

        for (i=m; i>0; i--) {
            this.addMotion(this.motions.shift());
            console.log("did v", m, i);
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

    // how solidified is this? pretty solidified
    //// case 1
    //       8    7
    //       0    8
    //// case 2
    //       0    1
    //       8    0
    //// case 1
    // 1
    // -8  -- want 1
    //// case 2
    // -1
    //  8  -- want -1

    // should this be reversing the sign to return a vector?
    vectorX (Ax,Bx) {
        let rX = Bx - Ax;

        if (Math.abs(rX) > 4) {
            let sign = rX / Math.abs(rX);
            let a = Ax + 9*sign;
            // rX = Bx - a;
            rX = a - Bx;
        }
        return rX;
    }

    // each of these should only do setVector
    //////////////////////////////////////////////////
    off1Priorities (data) {
        // get between avtr and his nearest defender

        // get vector to avtr
        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        //// get pos of avtrs closest defender

        // set maximums for position and distance
        let Dx = 100;
        let Dy = 100;
        let distance = Math.abs(this.vectorX(Dx, data.AvtrTrgt.x)) + Math.abs(Dy - data.AvtrTrgt.y);
        
        // iterate through Defenders , getting closest to avtr
        data.BteamData.forEach((Npos) => {
            let ADx = this.vectorX(Npos.x, data.AvtrTrgt.x);
            let ADy = Npos.y - data.AvtrTrgt.y;
            let ADdistance = Math.abs(ADx) + Math.abs(ADy);
            if (ADdistance < distance) {
                Dx = Npos.x;
                Dy = Npos.y;
                distance = ADdistance;
                // console.log("found closer", Dx, Dy);
            }
        });
        //// end get pos of avtrs closest def

        // get vector from this to avtrs closest defender

        let rdx = this.vectorX(this.targetPos.x,Dx);
        // let rdx = Dx - this.targetPos.x;
        let rdy = Dy - this.targetPos.y;

        console.log(rax, ray, "vs");
        
        // this.vector.x = Math.round( (rax+rdx) / 2);
        this.vector.x = rax; // stay with off0
        this.vector.y = Math.round( (ray+rdy) / 2);
        
        // console.log("off1P", this.vector.x, this.vector.y);

    } // set vector

    off2Priorities (data) {
        //// get between avtr and def2

        // get vector to avtr
        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        //// get pos of avtrs closest defender

        // set maximums for position and distance
        let Dx = 100;
        let Dy = 100;
        let distance = Math.abs(this.vectorX(Dx, data.AvtrTrgt.x)) + Math.abs(Dy - data.AvtrTrgt.y);
        
        // iterate through Defenders , getting closest to avtr
        data.BteamData.forEach((Npos) => {
            let ADx = this.vectorX(Npos.x, data.AvtrTrgt.x);
            let ADy = Npos.y - data.AvtrTrgt.y;
            let ADdistance = Math.abs(ADx) + Math.abs(ADy);
            if (ADdistance < distance) {
                Dx = Npos.x;
                Dy = Npos.y;
                distance = ADdistance;
                // console.log("found closer", Dx, Dy);
            }
        });
        //// end get pos of avtrs closest def

        // get vector from this to avtrs closest defender

        let rdx = this.vectorX(this.targetPos.x,Dx);
        // let rdx = Dx - this.targetPos.x;
        let rdy = Dy - this.targetPos.y;

        console.log(rax, ray, "vs");
        
        // this.vector.x = Math.round( (rax+rdx) / 2);
        this.vector.x = rax; // stay with off0
        this.vector.y = Math.round( (ray+rdy) / 2);

        // console.log("off2P", this.vector.x, this.vector.y);

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
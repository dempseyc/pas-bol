class NPC extends Player {

    constructor (team,role) {
        // team is 0 or 1, role is 0-4
        super(team,role);
        this.vector = {x: 0, y: 0};
        this.motions = [];
    }

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
            // console.log("did v", m, i);
        }

    }

    setVector (neededData) {
        // neededData.AvtrTrgt // obj
        // neededData.BteamData // array of objs

        switch (this.team) {
            case 0:
                switch (this.role) {
                    case 0:
                        break;
                    case 1:
                        this.off1Priorities(neededData);
                        break;
                    case 2:
                        this.off2Priorities(neededData);
                        break;
                    case 3:
                        this.off3Priorities(neededData);
                        break;
                    case 4:
                        this.off4Priorities(neededData);
                        break;
                    default:
                        break;
                }
            case 1:
                switch (this.role) {
                    case 0:
                        this.def0Priorities(neededData);
                        break;
                    case 1:
                        this.def1Priorities(neededData);
                        break;
                    case 2:
                        this.def2Priorities(neededData);
                        break;
                    case 3:
                        this.def3Priorities(neededData);
                        break;
                    case 4:
                        this.def4Priorities(neededData);
                        break;
                    default:
                        break;
            }
            default:
            break;
        }
    } // end setVector

    // handle x limit crossings
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

    // each of these only does setVector call
    //////////////////////////////////////////////////
    off1Priorities (data) {
        // go between avtr and his nearest defender

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
        
        // this.vector.x = Math.round( (rax+rdx) / 2);
        this.vector.x = rax; // stay with off0
        this.vector.y = Math.round( (ray+rdy) / 2);
        
        // console.log("off1P", this.vector.x, this.vector.y);

    } // set vector

    off2Priorities (data) {
        //// go between avtr and def2

        // get vector to avtr
        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        //// get pos of def2
        let Dx = data.BteamData[2].x;
        let Dy = data.BteamData[2].y;

        // get vector from this to def2
        let rdx = this.vectorX(this.targetPos.x,Dx);
        let rdy = Dy - this.targetPos.y;
        
        this.vector.x = Math.round( (rax+rdx) / 2);
        this.vector.y = Math.round( (ray+rdy) / 2);

        // console.log("off2P", this.vector.x, this.vector.y);

    }

    off3Priorities (data) {
        // go upfield go to x target
        
        // go to x target
        let xt = 8;
        this.vector.x = this.vectorX(this.targetPos.x,xt);

        //// go upfield
        // get y vector to avtr
        let vAy = (data.AvtrTrgt.y - this.pos.y);
        if (vAy > 10) {
            this.vector.y += 1;
        } else {
            this.vector.y -= 1;
        }
        //// end go upfield

        // console.log("off3P", this.vector.x, this.vector.y);
    }

    off4Priorities (data) {
        // go upfield keep x with Off0

        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        // keep with off0
        this.vector.x = rax;

        //// go upfield
        // get y vector to avtr
        let vAy = (data.AvtrTrgt.y - this.pos.y);
        if (vAy > 10) {
            this.vector.y += 1;
        } else {
            this.vector.y -= 1;
        }
        //// end go upfield

        //// pass defenders


        // console.log("off4P", this.vector.x, this.vector.y);
    }

    ///////////////////////////////////////////////////////////////////////////////////


    def0Priorities (data) {
        // go toward avtr
        this.speed = 0.2;

        // get vector to avtr
        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        this.vector.x = rax;
        this.vector.y = ray;

    }

    def1Priorities () {

        // console.log("def0P");
    }

    def2Priorities () {
        // console.log("def0P");
    }

    def3Priorities (data) {
        // go between Off3 and avatar

        // get vector to avtr
        let rax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let ray = data.AvtrTrgt.y - this.targetPos.y;

        let rox = this.vectorX(this.targetPos.x, data.AteamData[2].x);
        let roy = data.AteamData[2].y = this.targetPos.y;

        this.vector.x = Math.round( (rax+rox) / 2);
        this.vector.y = Math.round( (ray+roy) / 2);

        console.log("def0P", this.vector.x, this.vector.y);
    }

    def4Priorities (data) {
        // go between Off4 and avatar
        // console.log("def0P");
    }

}  // end NPC
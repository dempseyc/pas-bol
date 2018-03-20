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
                if (this.vector.y < 0) {
                    this.motions.push("down");
                    v--;
                } else if (this.vector.y > 0) {
                    this.motions.push("up");
                    v--;
                }
                if (this.vector.x < 0) {
                    this.motions.push("right");
                    v--;
                } else if (this.vector.x > 0){
                    this.motions.push("left");
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
        // neededData.BteamData // arvay of objs

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
        let vX = Ax - Bx;

        if (Math.abs(vX) > 4) {
            let sign = vX / Math.abs(vX);
            let b = Bx - 9*sign;
            vX = Ax - b;
        }
        return vX;
    }

    // each of these only does setVector call
    //////////////////////////////////////////////////
    off1Priorities (data) {
        // go between avtr and his nearest defender

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y;

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
        let rdy = this.targetPos.y - Dy;
        
        this.vector.x = vax; // stay with off0
        this.vector.y = Math.round( (vay+rdy) / 2);
        
        // console.log("off1P", this.vector.x, this.vector.y);

    } // set vector

    off2Priorities (data) {
        //// go between avtr and def0

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y ;

        //// get pos of def0
        let Dx = data.BteamData[0].x;
        let Dy = data.BteamData[0].y;

        // get vector from this to def0
        let rdx = this.vectorX(this.targetPos.x,Dx);
        let rdy = this.targetPos.y - Dy;
        
        this.vector.x = Math.round( (vax+rdx) / 2);
        this.vector.y = Math.round( (vay+rdy) / 2);

        console.log("off2P", this.vector.x, this.vector.y);

    }

    off3Priorities (data) {
        // go upfield go to x target
        
        // go to x target
        let xt = 8;
        this.vector.x = this.vectorX(this.targetPos.x,xt);

        //// go upfield
        // get y vector to avtr
        let vAy = (this.targetPos.y - data.AvtrTrgt.y);
        if (vAy > -10) {
            console.log("success");
            this.vector.y = -1;
        } else {
            this.vector.y = 1;
        }
        //// end go upfield

        // console.log("off3P", this.vector.x, this.vector.y);
    }

    off4Priorities (data) {
        // go upfield keep x with Off0

        // keep with off0
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        this.vector.x = vax;

        //// go upfield
        // get y vector to avtr
        let vAy = this.targetPos.y - data.AvtrTrgt.y;
        if (vAy > -10) {
            console.log("success");
            this.vector.y = -1;
        } else {
            this.vector.y = 1;
        }
        //// end go upfield

        //// pass defenders

        // console.log("off4P", this.vector.x, this.vector.y);
    }

    ///////////////////////////////////////////////////////////////////////////////////


    def0Priorities (data) {
        // go toward avtr // prolly unwise

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y;

        this.vector.x = vax;
        this.vector.y = vay;

    }

    def1Priorities (data) {
        // go between avtr and his nearest offenseman

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y;

        //// get pos of avtrs closest offender

        // set maximums for position and distance
        let Ox = 100;
        let Oy = 100;
        let distance = Math.abs(this.vectorX(Ox, data.AvtrTrgt.x)) + Math.abs(Oy - data.AvtrTrgt.y);
        
        // iterate through Offensemen , getting closest to avtr
        data.BteamData.forEach((Npos) => {
            let AOx = this.vectorX(Npos.x, data.AvtrTrgt.x);
            let AOy = Npos.y - data.AvtrTrgt.y;
            let ADdistance = Math.abs(AOx) + Math.abs(AOy);
            if (ADdistance < distance) {
                Ox = Npos.x;
                Oy = Npos.y;
                distance = ADdistance;
                // console.log("found closer", Dx, Oy);
            }
        });
        //// end get pos of avtrs closest def
        // get vector from this to avtrs closest Offenseman
        let vox = this.vectorX(this.targetPos.x,Ox);
        let voy = this.targetPos.y - Oy;
        
        this.vector.x = vox;
        this.vector.y = Math.round( (vay+voy) / 2);

        // console.log("def1P");
    }

    def2Priorities (data) {
        // go between avtr and his nearest offenseman

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y;

        //// get pos of avtrs closest offender

        // set maximums for position and distance
        let Ox = 100;
        let Oy = 100;
        let distance = Math.abs(this.vectorX(Ox, data.AvtrTrgt.x)) + Math.abs(Oy - data.AvtrTrgt.y);

        // iterate through Offensemen , getting closest to avtr
        data.BteamData.forEach((Npos) => {
            let AOx = this.vectorX(Npos.x, data.AvtrTrgt.x);
            let AOy = Npos.y - data.AvtrTrgt.y;
            let ADdistance = Math.abs(AOx) + Math.abs(AOy);
            if (ADdistance < distance) {
                Ox = Npos.x;
                Oy = Npos.y;
                distance = ADdistance;
                // console.log("found closer", Dx, Oy);
            }
        });
        //// end get pos of avtrs closest def
        // get vector from this to avtrs closest Offenseman
        let vox = this.vectorX(this.targetPos.x,Ox);
        let voy = this.targetPos.y - Oy;

        this.vector.x = vox;
        this.vector.y = Math.round( (vay+voy) / 2);

        // console.log("def2P");
    }

    def3Priorities (data) {
        // go between Off3 and avatar

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay = this.targetPos.y - data.AvtrTrgt.y;

        // get vector to off3
        let vox = this.vectorX(this.targetPos.x, data.AteamData[2].x);
        let voy = this.targetPos.y - data.AteamData[2].y;

        this.vector.x = Math.round( (vax+vox) / 2);
        this.vector.y = Math.round( (vay+voy) / 2);

        // console.log("def3P", this.vector.x, this.vector.y);
    }

    def4Priorities (data) {
        // go between Off4 and avatar

        // get vector to avtr
        let vax = this.vectorX(this.targetPos.x,data.AvtrTrgt.x);
        let vay =  this.targetPos.y - data.AvtrTrgt.y;

        // get vector to off4
        let vox = this.vectorX(this.targetPos.x, data.AteamData[3].x);
        let voy = this.targetPos.y - data.AteamData[3].y;

        this.vector.x = Math.round( (vax+vox) / 2);
        this.vector.y = Math.round( (vay+voy) / 2);

        // console.log("def4P", this.vector.x, this.vector.y);
    }

}  // end NPC
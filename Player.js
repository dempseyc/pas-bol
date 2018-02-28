class Player {

    constructor (team,role) {
        this.team = team;
        this.role = role;
        this.motion = "still";
        this.pos = this.initPos(team);
        this.targetPos = this.pos;
        this.prevTarget = this.pos;
        this.anim = false;
    }

    initPos(ZEROorONE) {
        if (ZEROorONE===0) {
            switch(this.role) {
                case 0:
                    return {x:4,y:12};
                    break;
                case 1:
                    return {x:3,y:11};
                    break;
                case 2:
                    return {x:5,y:11};
                    break;
                case 3:
                    return {x:2,y:11};
                    break;
                case 4:
                    return {x:6,y:11};
                    break;
                default:
                    return "no role set";
                    break;
            }
        } else {
            switch(this.role) {
                case 0:
                    return {x:4,y:9};
                    break;
                case 1:
                    return {x:3,y:10};
                    break;
                case 2:
                    return {x:5,y:10};
                    break;
                case 3:
                    return {x:2,y:10};
                    break;
                case 4:
                    return {x:6,y:10};
                    break;
                default:
                    return "no role set";
                    break;
            }
        }
    }

    changeMotion(direction) {
        this.motion = direction;
    }
    
    changeTarget() {
        
        if (this.prevMotion !== this.motion) {
            this.prevTarget.y = this.targetPos.y;
            this.prevTarget.x = this.targetPos.x;
    
            switch (motion) {
                case "up":
                this.targetPos.y = this.prevTarget.y-1;
                break;
                case "down":
                this.targetPos.y = this.prevTarget.y+1;
                break
                case "left":
                this.targetPos.x = this.prevTarget.x-1;
                break;
                case "right":
                this.targetPos.x = this.prevTarget.x+1;
                default:
                break;
            }
            this.prevMotion = this.motion;
        }
        if (this.anim === false) { this.startAnim(); }
    }
    
    startAnim() {
        this.anim = true;
        this.animate();
    }
    
    checkProgress(x,y) {
        // x and y will start at 1 and decrease to 0
        return Math.abs(x+y);
    }
    
    animate () {
        // offset describes something strictly for animation
        let offsetX = (this.targetPos.x-this.prevTarget.x)*this.rate; // just a +/- unit
        let offsetY = (this.targetPos.y-this.prevTarget.y)*this.rate; // just a +/- unit
    
        let progress = this.checkProgress(this.targetPos.x-this.pos.x,this.targetPos.y-this.pos.y);
        // console.log("progress", progress);
        cellOffset.x += Math.round(offsetX*10);
        cellOffset.y += Math.round(offsetY*10);
    
        if(progress>0.000001) {
            let delay = setTimeout(()=>{
                this.pos.x += offsetX;
                this.pos.y += offsetY;
                this.animate();
                clearTimeout(delay);
            },50);
        } else {
            console.log("else in a");
            this.anim = false;
            this.pos.x = this.targetPos.x;
            this.pos.y = this.targetPos.y;
            this.prevTarget.x = this.targetPos.x;
            this.prevTarget.y = this.targetPos.y;
            this.prevMotion = "still";
            this.changeTarget();
        }
    }

}
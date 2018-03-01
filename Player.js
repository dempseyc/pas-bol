class Player {

    constructor (team,role) {
        this.team = team;
        this.role = role;
        this.prevMotion = "still";
        this.motionStack = []; // 0 being still initially
        this.pos = this.initPos(this.team);
        this.prevPos = {x:this.pos.x,y:this.pos.y};
        this.targetPos = {x:this.pos.x,y:this.pos.y};
        this.animPos = {x:this.pos.x,y:this.pos.y};
        this.anim = false;
        this.rate = 0.1;
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
    
    changeTarget(direction) {

        switch (direction) {
            case "up":
            this.targetPos.y = this.targetPos.y-1;
            break;
            case "down":
            this.targetPos.y = this.targetPos.y+1;
            break
            case "left":
            this.targetPos.x = this.targetPos.x-1;
            break;
            case "right":
            this.targetPos.x = this.targetPos.x+1;
            default:
            break;
        }
    
        if (this.anim === false) { this.startAnim(); }
    }
    
    startAnim() {
        this.anim = true;
        this.goTowardTarget();
    }
    
    checkProgress(x,y) {
        // x and y will start at 1 and decrease to 0
        return Math.abs(x)+Math.abs(y);
    }
    
    goTowardTarget () {
        // all anim should do is slowly change pos to target pos,
        //  then refer to motionStack
        let offsetX = (this.targetPos.x-this.prevPos.x)*this.rate;
        let offsetY = (this.targetPos.y-this.prevPos.y)*this.rate;
        
        let progress = this.checkProgress(this.targetPos.x-this.pos.x,this.targetPos.y-this.pos.y);
    
        if(progress>0.000001) {
            let delay = setTimeout(()=>{
                this.pos.x += offsetX;
                this.pos.y += offsetY;
                this.goTowardTarget();
                clearTimeout(delay);
            },50);
        } else {
            console.log("else", this.pos);
            this.anim = false;
            this.pos.x = this.targetPos.x;
            this.pos.y = this.targetPos.y;
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
            if (this.motionStack.length>1) {
                this.changeTarget(this.motionStack.shift());
            }
            //////////////////unitary motion
            else if (this.motionStack.length>0) {
                this.motionStack = [];
            }
            //////////////////continuous motion
            // else {
            //     changeTarget(this.motionStack[0]);
            // }
        }
    }

    // the point here is to call addMotion on players and let them sort their own shit out
    // haven't even gotten into hit detection, but anyway..  i think Player.js is looking nice
    addMotion (direction) {
        let isOrthogonal = function(prevMotion,currMotion) {
            let orth = false;
            switch (prevMotion) {
                case "left":
                    if(currMotion === "up" || currMotion === "down") { orth = true; }
                    break;
                case "right":
                    if(currMotion === "up" || currMotion === "down") { orth = true; }
                    break;
                case "up":
                    if(currMotion === "left" || currMotion === "right") { orth = true; }
                    break;
                case "down":
                    if(currMotion === "left" || currMotion === "right") { orth = true; }
                    break;
                default:
                    break;
            }
            return orth;
        }

        // three cases array empty 'init'
        if (this.motionStack.length === 0) {
            this.motionStack.push(direction);
            this.changeTarget(this.motionStack[0]);
            console.log(1,this.motionStack[0]);
        }
        // if its orthogonal
        else if (this.motionStack.length>0 && isOrthogonal(this.motionStack[this.motionStack.length-1],direction)) {
            this.motionStack.push(direction);
            console.log(2,this.motionStack[0]);
        } 
        else {
            this.motionStack.push(direction);
            this.changeTarget(this.motionStack.shift());
            console.log(3,this.motionStack[0]);
        }
    }

}
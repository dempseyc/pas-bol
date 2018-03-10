class PlayerA {

    constructor (team,role) {
        this.team = team;
        this.role = role;
        this.motionStack = [];
        this.pos = this.initPos(this.team);
        this.prevTarget = {x:this.pos.x,y:this.pos.y};
        this.targetPos = {x:this.pos.x,y:this.pos.y};
        this.limits = {l: -0.5, r: 8.5},
        this.speed = .2;
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

    // this is a nice function
    changeTarget(direction) {
        // console.log("ct");
        this.prevTarget.x = this.targetPos.x;
        this.prevTarget.y = this.targetPos.y;

        switch (direction) {
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
    
    } // end changeTarget

    reTranslate (limit) {
        switch (limit) {
            case "left":
                this.pos.x += 9;
                this.targetPos.x += 9;
                this.prevTarget.x += 9;
                break;
            case "right":
                this.pos.x -= 9;
                this.targetPos.x -= 9;
                this.prevTarget.x -= 9;
                break;
            default:
                break;
        }
    }

    hitDetected () {
        let continueX = this.targetPos.x;
        let continueY = this.targetPos.y;

        this.targetPos.x = this.prevTarget.x;
        this.targetPos.y = this.prevTarget.y;

        this.prevTarget.x = continueX;
        this.prevTarget.y = continueY;
    }

    // this is the dream version of addmotion
    // it only changes the fine pos of the player
    nudge (delta) {

        if (this.pos.x < this.limits.l) {
            this.reTranslate("left");
        }
        if (this.pos.x > this.limits.r) {
            this.reTranslate("right");
        }

        if (this.targetPos.x !== this.pos.x || this.targetPos.y !== this.pos.y) {

            let X = this.targetPos.x-this.prevTarget.x;
            let Y = this.targetPos.y-this.prevTarget.y;
    
            this.pos.x += X * this.speed * delta / 100;
            this.pos.y += Y * this.speed * delta / 100;
        }
        // another function should evaluate when the distance
        // between it and its target reaches 0ish
        // and what to do about it
    }

    // this is the dream version of addmotion
    // it only changes the motionstack
    // interactivity with the avatar will depend on it, but might need some pops and shifts
    // lets see
    addMotion (direction) {

        // length is 0
        if (this.motionStack.length === 0) {
            this.motionStack.push(direction);
            console.log("init",this.motionStack);
        }
        
        else {

            if (isOrthogonal(this.motionStack[this.motionStack.length-1],direction)) {
                this.motionStack.push(direction);

                console.log("orth",this.motionStack);
                return;
            }
            
            else if (isBack(this.motionStack[this.motionStack.length-1],direction)) {

                this.motionStack.shift();
                this.motionStack.push(direction);
                
                this.targetPos.x = this.prevTarget.x;
                this.targetPos.y = this.prevTarget.y;
                
                console.log("back",this.motionStack);
                return;
            }
            
            else if (this.motionStack[this.motionStack.length-1] === direction) {

                this.motionStack.push(direction);
                console.log("same",this.motionStack);
                return;
            }

        }

        function isBack(prevMotion,currMotion) {
            let b = false;
            switch (prevMotion) {
                case "left":
                    if(currMotion === "right") { b = true; }
                    break;
                case "right":
                    if(currMotion === "left") { b = true; }
                    break;
                case "up":
                    if(currMotion === "down") { b = true; }
                    break;
                case "down":
                    if(currMotion === "up") { b = true; }
                    break;
                default:
                    break;
            }
            return b;
        }

        function isOrthogonal(prevMotion,currMotion) {
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

        return;

    } // end addMotion
    
}  // end class PlayerA
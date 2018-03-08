class Player {

    constructor (team,role) {
        this.team = team;
        this.role = role;
        this.motionStack = [];
        this.pos = this.initPos(this.team);
        this.prevTarget = {x:this.pos.x,y:this.pos.y};
        this.targetPos = {x:this.pos.x,y:this.pos.y};
        this.limits = {l: -0.5, r: 8.5},
        this.speed = .4;
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
    changeTarget () {
        // console.log("ct");
        this.prevTarget.x = this.targetPos.x;
        this.prevTarget.y = this.targetPos.y;

        let currDirection = this.motionStack[0];

        switch (currDirection) {
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

    nudge (delta) {

        if (this.pos.x < this.limits.l) {
            this.reTranslate("left");
        }
        if (this.pos.x > this.limits.r) {
            this.reTranslate("right");
        }

        if (this.targetPos.x===this.pos.x&&this.targetPos.y===this.pos.y) {
            this.moving = false;
        } else {
            this.moving = true;

            let X = this.targetPos.x-this.prevTarget.x;
            let Y = this.targetPos.y-this.prevTarget.y;
    
            this.pos.x += (X * this.speed * delta / 100);
            this.pos.y += (Y * this.speed * delta / 100); 
    
            let distanceFromTargetX = Math.abs(this.targetPos.x - this.pos.x);
            let distanceFromTargetY = Math.abs(this.targetPos.y - this.pos.y);
            
            let distance = distanceFromTargetX + distanceFromTargetY;

            if (distance < 0.0001) {
                this.motionStack.shift();
                this.prevTarget.x = this.targetPos.x;
                this.prevTarget.y = this.targetPos.y;
                this.pos.x = this.targetPos.x;
                this.pos.y = this.targetPos.y;
                this.changeTarget();
            }
        }
    }

    // good behavior for avatar
    addMotion (direction) {
        // should differentiate between behavior of npcs and avatar
        console.log("am");

        // length is 0
        if (this.motionStack.length === 0) {
            this.motionStack.push(direction);
            this.changeTarget();
            this.moving = true;
            console.log("init",this.motionStack);
        }
        
        else {

            if (isOrthogonal(this.motionStack[this.motionStack.length-1],direction)) {
                this.motionStack.push(direction);
                // it doesnt make sense to do anything else unless the length is large
                console.log("orth",this.motionStack);
            }
            
            else if (isBack(this.motionStack[this.motionStack.length-1],direction)) {
                
                this.prevTarget.x = this.targetPos.x;
                this.prevTarget.y = this.targetPos.y;

                this.motionStack.pop();
                this.motionStack.push(direction);
                this.changeTarget();
                
                console.log("back",this.motionStack);
            }
            
            else if (this.motionStack[this.motionStack.length-1] === direction) {
                this.motionStack.push(direction);
                console.log("same",this.motionStack);
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

    } // end addMotion
    
}  // end class Player
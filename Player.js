class Player {

    constructor (team,role) {
        this.team = team;
        this.role = role;
        this.motionStack = [];
        this.pos = this.initPos(this.team);
        this.prevTarget = {x:this.pos.x,y:this.pos.y};
        this.targetPos = {x:this.pos.x,y:this.pos.y};
        this.speed = .25;
        this.moving = false;
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

    changeTarget() {

        let currDirection = this.motionStack[0];

        // if (this.motionStack.length>1) {
        //     currDirection = this.motionStack.shift();
        // }

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
    
    }

    nudge (delta) {

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

    addMotion (direction) {

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

        if (this.motionStack.length>0) {
            if (isOrthogonal(this.motionStack[this.motionStack.length-1],direction)) {
                this.motionStack.push(direction);
                console.log("orth",this.motionStack);
            }
            else if (isBack(this.motionStack[this.motionStack.length-1],direction)) {
                this.motionStack.pop();
                this.motionStack.push(direction);

                // problematic
                this.prevTarget.x = this.targetPos.x;
                this.prevTarget.y = this.targetPos.y;
                this.changeTarget();

                console.log("back",this.motionStack);
            }
            else if (this.motionStack[this.motionStack.length-1] === direction) {
                // should differentiate between behavior of npcs and avatar
                if (this.team !== 0 && this.role !==0) {
                    this.motionStack.push(direction);
                    console.log(this.team, this.role, this.motionStack);
                } else {
                    console.log("same",this.motionStack);
                }
            }
        } else {
            // length is 0
            this.motionStack.push(direction);
            this.changeTarget();
            this.moving = true;
            console.log("init",this.motionStack);
        }

    }  // addMotion method

}
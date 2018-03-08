class NPC extends Player {

    constructor (team,role) {
        // team is 0 or 1, role is 0-4
        super(team,role);
    }

    adapt (teamANeededData) {
        // teamANeededData.AvtrPos // obj
        // teamANeededData.BteamData // array of objs

        switch (this.team) {
            case 0:
                switch (this.role) {
                    case 0:
                        break;
                    case 1:
                        this.off1Priorities(teamANeededData);
                        break;
                    case 1:
                        this.off2Priorities(teamANeededData);
                        break;
                    case 1:
                        this.off3Priorities(teamANeededData);
                        break;
                    case 1:
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
                    case 1:
                        this.def2Priorities(teamANeededData);
                        break;
                    case 1:
                        this.def3Priorities(teamANeededData);
                        break;
                    case 1:
                        this.def4Priorities(teamANeededData);
                        break;
                    default:
                        break;
            }
            default:
            break;
        }
        console.log("adapt called");
    } // end adapt
    

    // just that it's called twice
    off1Priorities () {
        this.addMotion("down");
        console.log("off1Priorities");
    }

    off2Priorities () {
        console.log("off2Priorities");
    }

    off3Priorities () {
        console.log("off3Priorities");
    }

    off4Priorities () {
        console.log("off4Priorities");
    }

    ///////////////////////////////////////////////////////////////////////////////////


    def0Priorities () {
        console.log("def0Priorities");
    }

    def1Priorities () {
        console.log("def0Priorities");
    }

    def2Priorities () {
        console.log("def0Priorities");
    }

    def3Priorities () {
        console.log("def0Priorities");
    }

    def4Priorities () {
        console.log("def0Priorities");
    }

}  // end NPC
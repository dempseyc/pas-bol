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
                this.addMotion("down");
                break;
            case 1:
                break;
            default:
                break;
        }
        console.log("adapt called");
    }

}  // end NPC subclass




        // NPCMethod () {
        //     let delay = setTimeout(() => {
        //         console.log("NPC method exists");
        //     }, 2000);
        // }
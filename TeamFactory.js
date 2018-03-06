class TeamFactory {

    constructor (team0or1) {
        this.roles = [0,1,2,3,4];
        this.roster = [];
        switch (team0or1) {
            case 0: this.buildTeam(0); break;
            case 1: this.buildTeam(1); break;
            default: break;
        }
    }
    buildTeam (team) {
        return this.roles.map((role,i)=>{
            let player = {};
            if (i === 0) {
                // player = new PlayerA(team,role);
                player = new PlayerA(team,role);
            } else {
                player = new Player(team,role);
            }
            this.roster.push(player);
        })
    }
}
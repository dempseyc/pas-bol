class NPC extends Player {

    NPCMethod () {
        let delay = setTimeout(() => {
            console.log("NPC method exists");
        }, 2000);
    }

}
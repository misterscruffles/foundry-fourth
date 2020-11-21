import { AbilityScores, Level } from "./data";

export class PlayerActor extends Actor {

    prepareDerivedData() {
        const actorData = this.data;
        // The character data
        const data = actorData.data;

        data.initiative = {}
        data.initiative.modifier = Math.floor(data.dexterity.value - 10) / 2;
        // TODO: iterate through equipped items/feats/etc to determine the current init bonus
        data.initiative.bonus = 0;
    }

}

export class PlayerSheet extends ActorSheet<PlayerData, PlayerActor> {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["foured", "sheet", "player-character"],
            template: "systems/foured/templates/actors/playerSheet.html",
            width: 600,
            height: 600,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "main",
                },
            ],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
        });
    }


    _updateObject(event: Event, formData: any): Promise<PlayerActor> {

        console.log(JSON.stringify(formData));


        return this.object.update(formData) as any;
    }
}

export type PlayerData = AbilityScores & {
    name: string;
    hp: {
        value: number;
        max: number;
    }
    level: Level
}
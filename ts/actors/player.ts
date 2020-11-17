import { AbilityScores } from "./data";

export class PlayerActor extends Actor<PlayerData> {

    public derp: string = "derp";

}

export class PlayerSheet extends ActorSheet<PlayerActor, PlayerData> {
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
}
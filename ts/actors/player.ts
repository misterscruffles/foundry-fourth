import { AbilityScores, CharacterLevel, Senses } from "./data.js";
import {Hp, Defenses} from "../common/data.js";

export class PlayerActor extends Actor {

    prepareDerivedData() {
        const actorData = this.data;
        // The character data
        const data = actorData.data;

        /* Initiative */
        data.initiative = {}
        data.initiative.modifier = Math.floor((data.dexterity.value - 10) / 2);
        // TODO: Calculate additional initiative bonuses
        data.initiative.bonus = 0;
        data.initiative.value = data.initiative.modifier + data.initiative.bonus;
        
        /* Health */
        data.hp.bloodied = Math.floor(data.hp.max/2);

        data.movement = {
            value: 6
        }
    }

}

export class PlayerSheet extends ActorSheet<PlayerData, PlayerActor> {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["foured", "sheet", "player-character"],
            template: "systems/foured/templates/actors/playerSheet.html",
            width: 800,
            height: 800,
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
        return this.object.update(formData) as any;
    }
}

export type PlayerData = AbilityScores & Defenses & {
    name: string;
    hp: Hp;
    level: CharacterLevel    
    senses: Senses;

}
import { AbilityScores, CharacterLevel, Senses } from "./data.js";
import { Hp, Defenses } from "../common/data.js";
import { ItemType } from "../config.js";
import { data } from "jquery";

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
        data.hp.bloodied = Math.floor(data.hp.max / 2);

        data.movement = {
            value: 6
        }

    }

}

export class PlayerSheet extends ActorSheet<PlayerData, PlayerActor> {

    /** @override */
    getData() {
        const data = super.getData();
        console.log("Preparing actor sheet data...");
        this._prepareItems(data);
        return data;
    }

    activateListeners(html) {
        html.find('.item-delete').click(this._onItemDelete.bind(this));
        super.activateListeners(html);
    }

    _onItemDelete(event) {
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        this.actor.deleteOwnedItem(li.dataset.itemId);
    }


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

    _prepareItems(data) {
        const inventory = {};
        console.log("Preparing item data...");

        data.items.map((item) => {
            if (inventory[item.type] === undefined) {
                inventory[item.type] = {};
                inventory[item.type].items = [];
            }
            const items = inventory[item.type].items;
            items.push(item);
        })

        console.log(JSON.stringify(inventory));

        data.inventory = inventory;
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
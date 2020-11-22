import { Stat } from "../config"
import { FouredItemSheet } from "./data.js";
import {Defenses, Hp} from "../common/data";

export class PlayerClassItem extends Item<PlayerClassData> {

}

export class PlayerClassSheet extends FouredItemSheet<PlayerClassData, PlayerClassItem> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.submitOnChange = true;
        return options;
    }
    get template() {
        return 'systems/foured/templates/items/class.html';
    }

}

export type PlayerClassData = {
    description: {
        value: string;
    };
    hp: {
        value: number;
        stat: Stat;
        level: number;
    };
    surges: {
        value: number;
        stat: Stat;
    };
    proficiencies: {
        armor: {
            value: {}
        },
        weapon: {
            value: {}
        }
    };
    defenses: Defenses,
    stats: {
        value: {}
    },
    skills: {
        value: {};
        given: {};
        additional: number;
    }
};
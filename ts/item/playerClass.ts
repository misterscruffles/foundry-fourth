import { Stat } from "../config"
import { FouredItemSheet } from "./data.js";

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
    defenses: {
        ac: {
            value: number;
        },
        fortitude: {
            value: number;
        },
        reflex: {
            value: number;
        },
        will: {
            value: number;
        }
    },
    stats: {
        value: {}
    },
    skills: {
        value: {};
        given: {};
        additional: number;
    }
};
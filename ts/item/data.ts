import { Stat, PaperDollSlot } from "../config.js"

export type PhysicalItemData = {
    cost: number;
    weight: number;
}

export type DamageData = {
    count: number;
    faces: number;
    weaponDice: number;
    bonus: {
        raw: number;
        stat: Stat;
    }
}
export type PaperDollData = {
    slot: PaperDollSlot;
    equippable: boolean;
}

export enum ItemType {
    Weapon = "weapon",
    Armor = "armor",
    PlayerClass = "playerClass"
}

export interface FouredItemSheetData<T> extends ItemSheetData<T> {
    /**
     * Additional sheet values to be used.
     */
    values?: any;
}
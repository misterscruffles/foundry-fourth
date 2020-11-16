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
    Armor = "armor"
}

export interface FouredItemSheetData<T> extends ItemSheetData<T> {
    values?: any;
}
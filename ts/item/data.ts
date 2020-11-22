import { PowerSource, Stat, PaperDollSlot, ArmorType, ClassRole, WeaponType, WeaponGroup, WeaponCategory } from "../config.js"

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
    PlayerClass = "playerClass",
    Power = "power"
}

export class FouredItemSheet<D, I> extends ItemSheet<D, Item<D>> {
    getData(): FouredItemSheetData<D> {
        const data: FouredItemSheetData<D> = super.getData();
        data.values = {};
        data.selectOptions = {
            itemType: ItemType,
            powerSource: PowerSource,
            stat: Stat,
            classRole: ClassRole,
            paperDollSlot: PaperDollSlot,
            armorType: ArmorType,
            weaponType: WeaponType,
            weaponGroup: WeaponGroup,
            weaponCategory: WeaponCategory
        }
        return data;
    }

    _updateObject(_: Event, formData: any) {
        return this.object.update(formData);
    }

    protected stringToList(value: string): Array<string> {
        return value.split(",").map((s: string) => s.trim());
    }
};

export interface FouredItemSheetData<T> extends ItemSheetData<T> {
    /**
     * Additional sheet values to be used.
     */
    values?: any;
    selectOptions?: any;
}
import { PhysicalItemData, DamageData, PaperDollData, ItemType, FouredItemSheetData } from "./data.js";

export class WeaponItem extends Item<WeaponData> {

}

export class WeaponSheet extends ItemSheet<WeaponData, WeaponItem> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.submitOnChange = true;
        return options;
    }
    get template() {
        return 'systems/foured/templates/items/weapon.html';
    }

    getData(): ItemSheetData<WeaponData> {
        const data: FouredItemSheetData<WeaponData> = super.getData();
        data.values = {
            weaponGroup: WeaponGroup,
            weaponType: WeaponType,
            weaponCategory: WeaponCategory
        }
        return data;
    }
}

export type WeaponData = DamageData & PaperDollData & PhysicalItemData & {
    type: ItemType.Weapon;
    proficiencyBonus: number;
    weaponType: WeaponType;
    weaponCategory: WeaponCategory;
    weaponGroup: WeaponGroup;
    properties: Array<string>;
    range: {
        value: number;
        long: number;
    }

}

enum WeaponGroup {
    None = "none",
    Unarmed = "unarmed",
    LightBlade = "lightblade",
    HeavyBlade = "heavyblade",
    Mace = "mace",
    Spear = "spear",
    Staff = "staff",
    Axe = "axe",
    Hammer = "hammer",
    Pick = "pick",
    Polearm = "polearm",
    Flail = "flail",
    Crossbow = "crossbow",
    Sling = "sling",
    Bow = "bow"
}

enum WeaponType {
    None = "none",
    Melee = "melee",
    Thrown = "thrown",
    Ranged = "ranged"
}

enum WeaponCategory {
    None = "none",
    Simple = "simple",
    Military = "military",
    Superior = "superior",
    Improvised = "improvised"
}
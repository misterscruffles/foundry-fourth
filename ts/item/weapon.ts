import { PhysicalItemData, DamageData, PaperDollData, ItemType, FouredItemSheetData } from "./data.js";
import { Stat } from "../config.js"

/**
 * Strongly typed version of WeaponData as an item.
 */
export class WeaponItem extends Item<WeaponData> {
}

/**
 * Editing sheet for a weapon.  Uses weapon data and WeaponItem.
 */
export class WeaponSheet extends ItemSheet<WeaponData, WeaponItem> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.submitOnChange = true;
        return options;
    }
    get template() {
        return 'systems/foured/templates/items/weapon.html';
    }

    /**
     * getData returns the data object to edit, along with values
     * for things like select box values.
     * 
     * @returns FouredItemSheetData
     */
    getData(): ItemSheetData<WeaponData> {
        const data: FouredItemSheetData<WeaponData> = super.getData();
        data.values = {
            weaponGroup: WeaponGroup,
            weaponType: WeaponType,
            weaponCategory: WeaponCategory,
            stats: Stat,
            properties: data.data.properties.join?.(", "),
            damageDice: data.data.damage?.count?.value + "d" + data.data.damage?.faces?.value
        }
        if (data.data.damage?.bonus?.raw?.value > 0) {
            data.values.damageDice += " + " + data.data.damage.bonus.raw.value;
        }
        return data;
    }

    /**
     *  _updateObject will perform the update.  For weapons, we want properties to be an array
     * in the database, but be edited like a text field.
     * @param _ 
     * @param formData 
     */
    _updateObject(_: Event, formData: any) {
        formData['data.properties'] = formData['data.properties'].split(",").map((s: string) => s.trim());
        const damageDice = formData['data.damage.dice'].toLowerCase().split("d");
        formData['data.damage.count.value'] = damageDice[0];
        if (damageDice[1].indexOf("+") > -1) {
            const damageExtra = damageDice[1].split("+").map((s: string) => s.trim());
            formData['data.damage.faces.value'] = damageExtra[0];
            formData['data.damage.bonus.raw.value'] = damageExtra[1];
        } else {
            formData['data.damage.faces.value'] = damageDice[1];
        }
        return this.object.update(formData);
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

export enum WeaponGroup {
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

export enum WeaponType {
    None = "none",
    Melee = "melee",
    Ranged = "ranged"
}

export enum WeaponCategory {
    None = "none",
    Simple = "simple",
    Military = "military",
    Superior = "superior",
    Improvised = "improvised"
}
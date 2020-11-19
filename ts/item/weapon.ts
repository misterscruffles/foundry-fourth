import { PhysicalItemData, DamageData, PaperDollData, ItemType, FouredItemSheetData, FouredItemSheet } from "./data.js";
import { PaperDollSlot, Stat, WeaponCategory, WeaponGroup, WeaponType } from "../config.js"

/**
 * Strongly typed version of WeaponData as an item.
 */
export class WeaponItem extends Item<WeaponData> {
}

/**
 * Editing sheet for a weapon.  Uses weapon data and WeaponItem.
 */
export class WeaponSheet extends FouredItemSheet<WeaponData, WeaponItem> {
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
        let damageDice = "";
        if (data.data.damage?.count?.value != undefined && data.data.damage.faces.value != undefined) {
            damageDice = data.data.damage?.count?.value + "d" + data.data.damage?.faces?.value;
        } else {
            damageDice = "1d6";
        }
        data.values = {
            weaponGroup: WeaponGroup,
            weaponType: WeaponType,
            weaponCategory: WeaponCategory,
            stats: Stat,
            properties: data.data.properties?.value?.join?.(", "),
            damageDice: damageDice,
            paperDoll: [PaperDollSlot.None, PaperDollSlot.OneHand, PaperDollSlot.TwoHand]
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
        formData['data.properties.value'] = this.stringToList(formData['data.properties.value']);
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

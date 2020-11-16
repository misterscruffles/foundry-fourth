import { ItemType } from "./item/data.js";
import { WeaponSheet } from "./item/weapon.js";

console.log("foured | Loaded foured.js file");

Hooks.once('init', async function () {
    console.log("foured | Starting foured initialization");

    Items.registerSheet("foured", WeaponSheet, { types: [ItemType.Weapon], makeDefault: true });

    Handlebars.registerHelper('debug', function (...a) {
        console.log(a);
    });

    Handlebars.registerPartial('selectbox', '<select name="{{name}}">{{#each options}}<option value="{{this}}"{{#if (eq ../value this)}} selected{{/if}}>{{this}}</option>{{/each}}</select>')
});
import { PlayerSheet, PlayerActor } from "./actors/player.js";
import { ItemType } from "./item/data.js";
import { PlayerClassSheet } from "./item/playerClass.js";
import { WeaponSheet } from "./item/weapon.js";

console.log("foured | Loaded foured.js file");

Hooks.once('init', async function () {
    console.log("foured | Starting foured initialization");

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("foured", PlayerSheet, {makeDefault: true})

    Items.registerSheet("foured", WeaponSheet, { types: [ItemType.Weapon], makeDefault: true });
    Items.registerSheet("foured", PlayerClassSheet, { type: [ItemType.PlayerClass], makeDefault: true });

    Handlebars.registerHelper('debug', function (...a) {
        console.log(a);
    });

    Handlebars.registerHelper('titleCase', function (word: string) {
        return word.titleCase();
    });

    Handlebars.registerPartial('selectbox', '<select name="{{name}}">{{#each options}}<option value="{{this}}"{{#if (eq ../value this)}} selected{{/if}}>{{this}}</option>{{/each}}</select>');
    Handlebars.registerPartial('standardText', '<label class="{{sheet}}-sheet__details {{sheet}}-sheet__details__{{name}}">{{titleCase title}}:<input type="text" name="{{name}}" value="{{value}}" /></label>');
});
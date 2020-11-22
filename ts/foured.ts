import { PlayerSheet, PlayerActor } from "./actors/player.js";
import { ItemType } from "./item/data.js";
import { PlayerClassSheet, PlayerClassItem } from "./item/playerClass.js";
import { WeaponSheet, WeaponItem } from "./item/weapon.js";
import { PowerSheet, PowerItem } from "./item/power.js";
import { CombatManager } from "./logic/combat/manager.js";
import { PowerEffects } from "./logic/combat/powereffects.js";
import { DiceDamage } from "./logic/combat/effects/dicedamage.js";
import { AttackRoll } from "./logic/combat/effects/attackroll.js";
import { SafeString } from "handlebars";

console.log("foured | Loaded foured.js file");

CONFIG.Combat.initiative.formula = "1d20 + @initiative.modifier + @initiative.bonus";

Hooks.once('init', async function () {
    console.log("foured | Starting foured initialization");

    CONFIG.Actor.entityClass = PlayerActor;
    CombatManager.Register();
    PowerEffects.RegisterOnUsed(new DiceDamage());
    PowerEffects.RegisterOnUse(new AttackRoll());

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("foured", PlayerSheet, { makeDefault: true });

    Items.registerSheet("foured", WeaponSheet, { types: [ItemType.Weapon], makeDefault: true });
    Items.registerSheet("foured", PowerSheet, { types: [ItemType.Power], makeDefault: true });
    Items.registerSheet("foured", PlayerClassSheet, { types: [ItemType.PlayerClass], makeDefault: true });

    Handlebars.registerHelper('debug', function (...a) {
        console.log(a);
    });

    Handlebars.registerHelper('titleCase', function (word: string) {
        return word.titleCase();
    });

    Handlebars.registerHelper('concat', function (...values: any[]) {
        return values.slice(0, -1).join('');
    });

    Handlebars.registerHelper('selectMap', function (name: string, options: Map<any, any>, selected: any) {
        let output = "<select name='" + Handlebars.escapeExpression(name) + "'>"
        options.forEach((key: any, val: any) => {
            output += '<option value="' + Handlebars.escapeExpression(val) + '"';
            if (val === selected) {
                output += ' selected';
            }
            output += '>' + Handlebars.escapeExpression(key) + '</option>';
        });
        output += "</select>";
        return new Handlebars.SafeString(output);
    });

    Handlebars.registerHelper('provideEffectConfig', function (effect: string, root: string, existing: any): string | SafeString {
        let cur = PowerEffects.Get(effect);
        if (!cur) {
            return "";
        }
        let output = cur.provideConfig(root, existing);
        return new Handlebars.SafeString(output);
    });

    Handlebars.registerPartial('selectbox', '<select name="{{name}}">{{#each options}}<option value="{{this}}"{{#if (eq ../value this)}} selected{{/if}}>{{this}}</option>{{/each}}</select>');
    Handlebars.registerPartial('selectBox', '<select name="{{name}}">{{debug options}}{{#each options}}<option value="{{@key}}"{{#if (eq ../value @key)}} selected{{/if}}>{{this}}</option>{{/each}}</select>');
    Handlebars.registerPartial('standardText', '<label class="{{sheet}}-sheet__details {{sheet}}-sheet__details__{{name}}">{{titleCase title}}:<input type="text" name="{{name}}" value="{{value}}" /></label>');
});
import { Stat } from "../../../config.js";
import { FormUtil } from "../../../util/form-util.js";
import { OnUsedEffect, OnUseEffect, PowerEffects } from "../powereffects.js";

export class DiceDamage implements OnUseEffect, OnUsedEffect {
    getName(): string {
        return "Damage";
    }
    getKey(): string {
        return "diceDamage";
    }
    onUse(): number {
        throw new Error("Method not implemented.");
    }
    onSuccess(): void {
        throw new Error("Method not implemented.");
    }
    onFail(): void {
        throw new Error("Method not implemented.");
    }
    onComplete(): void {
        throw new Error("Method not implemented.");
    }
    provideConfig(root: string, config: DiceDamageConfig): string {
        if (config === null || typeof config == 'undefined') {
            config = {
                "count": {
                    "value": 1
                },
                "faces": {
                    "value": 6
                },
                "bonus": {
                    "raw": {
                        "value": 0
                    },
                    "stat": {
                        "value": Stat.None
                    }
                },
                "weaponDice": {
                    "value": 0
                },
                "halve": {
                    "value": false
                }
            }
        }
        let output = `<section class="form-section section-dice-damage">`;
        output += `<label>Weapon Dice: ${FormUtil.CreateText(root + "weaponDice.value", "dice-damage__weaponDice", config.weaponDice.value)}</label>`;
        output += `<label>Base Dice: ${FormUtil.CreateText(root + "count.value", "dice-damage__count", config.count.value)}</label>`;
        output += `<label>Base Faces: ${FormUtil.CreateText(root + "faces.value", "dice-damage__faces", config.faces.value)}</label>`;
        output += `<label>Stat Bonus: ${FormUtil.CreateSelectbox(root + "bonus.stat.value", "dice-damage__bonus-stat", config.bonus.stat.value, FormUtil.EnumToMap(Stat))}</label>`;
        output += `<label>Raw Bonus: ${FormUtil.CreateText(root + "bonus.raw.value", "dice-damage__bonus-raw", config.bonus.raw.value)}</label>`;
        output += `<label>Halve Dmg: ${FormUtil.CreateCheck(root + "halve.value", "dice-damage__bonus-raw", config.halve.value)}</label>`;
        output += `</section>`;
        return output;
    }

}

type DiceDamageConfig = {
    "count": {
        "value": number;
    },
    "faces": {
        "value": number,
    },
    "bonus": {
        "raw": {
            "value": number
        },
        "stat": {
            "value": Stat;
        }
    },
    "weaponDice": {
        "value": number
    },
    "halve": {
        "value": boolean
    }
}
import { Defensive, Stat } from "../../../config.js";
import { FormUtil } from "../../../util/form-util.js";
import { OnUseEffect, PowerEffect, PowerEffects } from "../powereffects.js";

export class AttackRoll implements OnUseEffect {
    getKey(): string {
        return "attackRoll";
    }
    getName(): string {
        return "Attack Roll";
    }
    onUse(): number {
        throw new Error("Method not implemented.");
    }
    provideConfig(root: string, config: AttackRollConfig): string {

        if (config === null || typeof config == 'undefined') {
            config = {
                attack: {
                    value: 0,
                    stat: Stat.None
                },
                defense: {
                    value: 0,
                    defensive: Defensive.None
                }
            }
        }

        let output = `<section class="form-section section-attack-roll">`;
        output += `<label>Raw:${FormUtil.CreateText(root + "attack.value", "effect-attack-value", config.attack.value)}</label>`;
        output += `<label>Stat:${FormUtil.CreateSelectbox(root + "attack.stat", "effect-attack-stat", config.attack.stat, FormUtil.EnumToMap(Stat))}</label>`;
        output += `vs`;
        output += `<label>Raw:${FormUtil.CreateText(root + "defense.value", "effect-defense-value", config.defense.value)}</label>`;
        output += `<label>Defense:${FormUtil.CreateSelectbox(root + "defense.defensive", "effect-defense-defensive", config.defense.defensive, FormUtil.EnumToMap(Defensive))}</label>`;
        output += `</section>`;
        return output;
    }

}

type AttackRollConfig = {
    attack: {
        value: number;
        stat: Stat;
    },
    defense: {
        value: number;
        defensive: Defensive;
    }
}
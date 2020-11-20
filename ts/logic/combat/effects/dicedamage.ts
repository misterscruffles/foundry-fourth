import { PowerEffect, PowerEffects } from "../powereffects.js";

export class DiceDamage implements PowerEffect {
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

}

PowerEffects.Register(new DiceDamage());
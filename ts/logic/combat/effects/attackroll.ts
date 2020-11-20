import { PowerEffect, PowerEffects } from "../powereffects.js";

export class AttackRoll implements PowerEffect {
    getKey(): string {
        return "attackRoll";
    }
    getName(): string {
        return "Attack Roll";
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

PowerEffects.Register(new AttackRoll());
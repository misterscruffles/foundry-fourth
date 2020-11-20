export interface PowerEffect {
    getKey(): string;
    getName(): string;
    onUse(): number;
    onSuccess(): void;
    onFail(): void;
    onComplete(): void;
}

export class PowerEffects {
    private static effects = [];

    public static Register(effect: PowerEffect): void {
        this.effects[effect.getKey()] = effect;
    }

    public static All(): PowerEffect[] {
        return this.effects;
    }

    public static Get(key: string): PowerEffect | null {
        return this.effects[key];
    }

    public static GetOptions(): Map<string, string> {
        let opts = new Map<string, string>();
        this.effects.forEach((element: PowerEffect) => opts[element.getKey()] = element.getName())
        return opts;
    }
}
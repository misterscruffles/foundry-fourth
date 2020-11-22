export interface PowerEffect {
    getKey(): string;
    getName(): string;
    provideConfig(root: string, config: any);
}

export interface OnUseEffect extends PowerEffect {
    onUse(): number;
}

export interface OnUsedEffect extends PowerEffect {
    onSuccess(): void;
    onFail(): void;
    onComplete(): void;
}

export class PowerEffects {
    private static onUsers: Map<string, OnUseEffect> = new Map<string, OnUseEffect>();
    private static onUsed: Map<string, OnUsedEffect> = new Map<string, OnUsedEffect>();

    public static RegisterOnUse(effect: OnUseEffect): void {
        this.onUsers.set(effect.getKey(), effect);
    }

    public static RegisterOnUsed(effect: OnUsedEffect): void {
        this.onUsed.set(effect.getKey(), effect);
    }


    public static Get(key: string): PowerEffect | null {
        return this.onUsed.get(key) || this.onUsers.get(key);
    }

    public static GetOnUseOptions(): Map<string, string> {
        let opts = new Map<string, string>();
        opts.set("", "None");
        this.onUsers.forEach((value: OnUseEffect) => opts.set(value.getKey(), value.getName()));
        return opts;
    }

    public static GetOnUsedOptions(): Map<string, string> {
        let opts = new Map<string, string>();
        opts.set("", "None");
        this.onUsed.forEach((value: OnUsedEffect, key: string) => {
            opts.set(key, value.getName());
        });
        return opts;
    }
}
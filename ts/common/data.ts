import { Stat } from "../config.js"

export type Defenses = {
    ac: {
        value: number;
    },
    fortitude: {
        value: number;
    },
    reflex: {
        value: number;
    },
    will: {
        value: number;
    }
}

export type Hp = Resource & {
    // Temp HP
    temporary: number;
    bloodied: number;
};

export type Resource = {
    value: number;
    max: number;
}
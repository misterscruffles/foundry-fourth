import {PlayerClassItem} from "../item/playerClass.js";

export type AbilityScores = {
    strength: AbilityScore,
    constitution: AbilityScore,
    dexterity: AbilityScore,
    intelligence: AbilityScore,
    wisdom: AbilityScore,
    charisma: AbilityScore
}

export type AbilityScore = {
    value: number
}

export type CharacterLevel = {
    classes: ClassLevel[]
}

export type ClassLevel = {
    class: PlayerClassItem,
    value: number;
}

export type Senses = {
    perception: {
        value: number;
    }
    insight: {
        value: number;
    }
}
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

export type Level = {
    experience: number,
    value: number
}
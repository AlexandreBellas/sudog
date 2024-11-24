export const difficultyLevels = ["easy", "medium", "hard", "expert"] as const
export type IDifficultyLevel = typeof difficultyLevels[number]
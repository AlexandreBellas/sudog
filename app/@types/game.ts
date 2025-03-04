export const difficultyLevels = ["easy", "medium", "hard", "expert"] as const
export type IDifficultyLevel = (typeof difficultyLevels)[number]

export const featureFlags = ["notes", "dogs", "errors"] as const
export const featureFlagsLabels: { [key in IFeatureFlag]: string } = {
    notes: "Notes",
    dogs: "Dogs",
    errors: "Errors"
}
export type IFeatureFlag = (typeof featureFlags)[number]

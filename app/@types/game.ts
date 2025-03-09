export const difficultyLevels = ["easy", "medium", "hard", "expert"] as const
export type IDifficultyLevel = (typeof difficultyLevels)[number]

export const featureFlags = ["notes", "dogs", "errors", "onlyDogs"] as const
export const featureFlagsDetails: {
    [key in IFeatureFlag]: {
        label: string
        dependencies: IFeatureFlag[]
        blockers: IFeatureFlag[]
        defaultValue: boolean
    }
} = {
    notes: { label: "Notes", dependencies: [], blockers: [], defaultValue: true },
    dogs: { label: "Dogs", dependencies: ["onlyDogs"], blockers: [], defaultValue: true },
    onlyDogs: { label: "Strictly and only dogs", dependencies: [], blockers: ["notes"], defaultValue: false },
    errors: { label: "Errors", dependencies: [], blockers: [], defaultValue: true }
}
export type IFeatureFlag = (typeof featureFlags)[number]

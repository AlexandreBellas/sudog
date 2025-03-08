import { v4 as uuid } from "uuid"
import { IFeatureFlag } from "./game"

export interface IConfig {
    featureFlags: { [featureFlag in IFeatureFlag]: boolean }
    playerId: string
}

export function createDefaultConfig(override: Partial<IConfig> = {}): IConfig {
    const overrideWithoutUndefined = Object.fromEntries(
        Object.entries(override).filter(([_, value]) => value !== undefined)
    )

    return {
        featureFlags: { notes: true, dogs: true, errors: true },
        playerId: uuid(),
        ...overrideWithoutUndefined
    }
}

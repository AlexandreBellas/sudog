import { v4 as uuid } from "uuid"
import { featureFlags, featureFlagsDetails, IFeatureFlag } from "./game"

export interface IConfig {
    featureFlags: { [featureFlag in IFeatureFlag]: boolean }
    playerId: string
}

export function createDefaultConfig(override: Partial<IConfig> = {}): IConfig {
    const overrideWithoutUndefined = Object.fromEntries(
        Object.entries(override).filter(([_, value]) => value !== undefined)
    ) as Partial<IConfig>

    const { featureFlags: overrideFeatureFlags, ...restOverrideWithoutUndefined } = overrideWithoutUndefined

    return {
        featureFlags: featureFlags.reduce((acc, featureFlag) => {
            acc[featureFlag] = overrideFeatureFlags?.[featureFlag] ?? featureFlagsDetails[featureFlag].defaultValue
            return acc
        }, {} as { [featureFlag in IFeatureFlag]: boolean }),
        playerId: uuid(),
        ...restOverrideWithoutUndefined
    }
}

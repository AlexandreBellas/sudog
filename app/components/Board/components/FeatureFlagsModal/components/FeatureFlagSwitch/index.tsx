import { featureFlagsDetails, IFeatureFlag } from "@/@types/game"
import { Box } from "@/components/ui/box"
import { Switch } from "@/components/ui/switch"
import { Text } from "@/components/ui/text"
import { useMemo } from "react"

interface IFeatureFlagSwitchProps {
    featureFlags: { [featureFlag in IFeatureFlag]: boolean }
    featureFlag: IFeatureFlag
    value: boolean
    onToggle: (featureFlag: IFeatureFlag) => void
}

export default function FeatureFlagSwitch({
    featureFlags,
    featureFlag,
    value,
    onToggle
}: Readonly<IFeatureFlagSwitchProps>) {
    // #region Memos
    const isDisabled = useMemo(() => {
        const hasAsDependency = Object.entries(featureFlagsDetails)
            .filter(([_, value]) => value.dependencies.includes(featureFlag))
            .map(([key]) => key) as IFeatureFlag[]

        if (hasAsDependency.length === 0) return false

        return hasAsDependency.some((dependency) => !featureFlags[dependency])
    }, [featureFlags, featureFlag])
    // #endregion

    return (
        <Box
            key={featureFlag}
            className="flex flex-row items-center gap-2"
        >
            <Switch
                size="sm"
                value={value}
                onToggle={() => onToggle(featureFlag)}
                isDisabled={isDisabled}
            />
            <Text>{featureFlagsDetails[featureFlag as IFeatureFlag].label}</Text>
        </Box>
    )
}

import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge"
import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { useGame } from "@/contexts/GameProvider"
import { CircleX, EditIcon, Wrench } from "lucide-react-native"
import { Fragment, useState } from "react"
import ChooseLevelModal from "../ChooseLevelModal"
import FeatureFlagsModal from "../FeatureFlagsModal"

export default function Header() {
    // #region Contexts
    const { level, errorsCount, featureFlags } = useGame()
    // #endregion

    // #region States
    const [showChooseLevelModal, setShowChooseLevelModal] = useState(false)
    const [showFeatureFlagsModal, setShowFeatureFlagsModal] = useState(false)
    // #endregion

    return (
        <Fragment>
            <Box className="flex flex-row items-end justify-between gap-1 mb-1">
                <Box className="flex flex-row gap-1">
                    <Button
                        onPress={() => setShowChooseLevelModal(true)}
                        size="xs"
                        className="bg-black data-[hover=true]:bg-black/80"
                    >
                        <ButtonIcon
                            as={EditIcon}
                            className="text-blue-100 data-[hover=true]:text-blue-100"
                        />
                        <ButtonText className="text-blue-100 data-[hover=true]:text-blue-100">
                            Level: {level}
                        </ButtonText>
                    </Button>
                    <Button
                        onPress={() => setShowFeatureFlagsModal(true)}
                        variant="outline"
                        size="xs"
                    >
                        <ButtonIcon as={Wrench} />
                        <ButtonText>Controls</ButtonText>
                    </Button>
                </Box>
                {featureFlags.errors && (
                    <Badge
                        size="md"
                        action="error"
                        className="bg-red-200/60 items-center"
                    >
                        <BadgeIcon
                            className="text-red-800"
                            as={CircleX}
                        />
                        <BadgeText className="ml-1 text-red-800 font-medium">{errorsCount}/3</BadgeText>
                    </Badge>
                )}
            </Box>
            <ChooseLevelModal
                showModal={showChooseLevelModal}
                setShowModal={setShowChooseLevelModal}
            />
            <FeatureFlagsModal
                showModal={showFeatureFlagsModal}
                setShowModal={setShowFeatureFlagsModal}
            />
        </Fragment>
    )
}

import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge"
import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useGame } from "@/contexts/GameProvider"
import { capitalize } from "@/utils/string/capitalize"
import { CircleX, EditIcon, UserRoundSearch, Wrench } from "lucide-react-native"
import { Fragment, useState } from "react"
import ChooseLevelModal from "../ChooseLevelModal"
import FeatureFlagsModal from "../FeatureFlagsModal"
import MultiplayerConnectionModal from "../MultiplayerConnectionModal"

export default function Header() {
    // #region Contexts
    const {
        level,
        errorsCount,
        config: { featureFlags }
    } = useGame()
    // #endregion

    // #region States
    const [showChooseLevelModal, setShowChooseLevelModal] = useState(false)
    const [showFeatureFlagsModal, setShowFeatureFlagsModal] = useState(false)
    const [showMultiplayerConnectionModal, setShowMultiplayerConnectionModal] = useState(false)
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
                            className="text-blue-100 data-[hover=true]:text-blue-100 data-[active=true]:text-black"
                        />
                        <ButtonText className="text-blue-100 data-[hover=true]:text-blue-100">
                            {capitalize(level)}
                        </ButtonText>
                    </Button>
                    <Button
                        onPress={() => setShowFeatureFlagsModal(true)}
                        variant="outline"
                        size="xs"
                    >
                        <ButtonIcon as={Wrench} />
                    </Button>
                    <Button
                        onPress={() => setShowMultiplayerConnectionModal(true)}
                        variant="outline"
                        size="xs"
                        action="positive"
                        className="bg-[#267338] data-[hover=true]:bg-[#108345] 
                            border-[#267338] data-[hover=true]:border-[#108345]"
                        isDisabled={true || showMultiplayerConnectionModal}
                    >
                        {!showMultiplayerConnectionModal && (
                            <ButtonIcon
                                className="text-white data-[hover=true]:text-white data-[active=true]:text-black"
                                as={UserRoundSearch}
                            />
                        )}
                        {showMultiplayerConnectionModal && (
                            <Spinner
                                size="small"
                                color="white"
                            />
                        )}
                        <ButtonText className="text-white data-[hover=true]:text-white">Coming soon</ButtonText>
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
            <MultiplayerConnectionModal
                showModal={showMultiplayerConnectionModal}
                setShowModal={setShowMultiplayerConnectionModal}
            />
        </Fragment>
    )
}

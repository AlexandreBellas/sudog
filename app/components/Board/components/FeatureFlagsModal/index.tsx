import { featureFlagsDetails, IFeatureFlag } from "@/@types/game"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { CloseIcon, Icon } from "@/components/ui/icon"
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback } from "react"
import FeatureFlagSwitch from "./components/FeatureFlagSwitch"

interface IFeatureFlagsModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export default function FeatureFlagsModal({ showModal, setShowModal }: Readonly<IFeatureFlagsModalProps>) {
    // #region Contexts
    const {
        config: { featureFlags }
    } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Callbacks
    const handleToggleFeatureFlag = useCallback(
        (featureFlag: IFeatureFlag) => {
            const newValue = !featureFlags[featureFlag]
            gameDispatch({ type: "set-feature-flag", payload: { featureFlag, value: newValue } })

            if (!newValue) {
                featureFlagsDetails[featureFlag].dependencies.forEach((dependency) => {
                    if (featureFlags[dependency]) {
                        gameDispatch({
                            type: "set-feature-flag",
                            payload: {
                                featureFlag: dependency,
                                value: false
                            }
                        })
                    }
                })
            }
        },
        [featureFlags, gameDispatch]
    )
    // #endregion

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false)
            }}
            size="md"
        >
            <ModalBackdrop />
            <ModalContent className="bg-white border-0">
                <ModalHeader>
                    <Text
                        size="lg"
                        bold
                    >
                        Activate or deactivate game controls
                    </Text>
                    <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="text-black"
                        />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Box className="flex flex-col gap-1">
                        {Object.entries(featureFlags).map(([featureFlag, value]) => (
                            <FeatureFlagSwitch
                                key={featureFlag}
                                featureFlags={featureFlags}
                                featureFlag={featureFlag as IFeatureFlag}
                                value={value}
                                onToggle={handleToggleFeatureFlag}
                            />
                        ))}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        onPress={() => setShowModal(false)}
                    >
                        <ButtonText>Close</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
